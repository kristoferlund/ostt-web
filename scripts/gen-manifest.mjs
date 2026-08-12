#!/usr/bin/env node
// Generates public/latest.json from the assets already published on a GitHub
// release. Derives everything from the release, so refreshing the manifest
// never requires cutting a new release -- rerun this and redeploy the site.
//
//   node scripts/gen-manifest.mjs            # latest release
//   node scripts/gen-manifest.mjs v0.0.25    # a specific tag
//
// Set GITHUB_TOKEN to avoid the unauthenticated API rate limit.

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const REPO = "kristoferlund/ostt";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "latest.json");

// Asset filename -> manifest key. Order matters: the first match wins, so the
// cuda/vulkan variants must be tested before the plain ones.
const RULES = [
  [/^ostt-[\d.]+-x86_64-unknown-linux-gnu-cuda\.tar\.gz$/, "linux-x86_64-cuda"],
  [/^ostt-[\d.]+-x86_64-unknown-linux-gnu-vulkan\.tar\.gz$/, "linux-x86_64-vulkan"],
  [/^ostt-x86_64-unknown-linux-gnu\.tar\.gz$/, "linux-x86_64"],
  [/^ostt-aarch64-unknown-linux-gnu\.tar\.gz$/, "linux-aarch64"],
  [/^ostt-x86_64-apple-darwin\.tar\.gz$/, "macos-x86_64"],
  [/^ostt-aarch64-apple-darwin\.tar\.gz$/, "macos-aarch64"],
  [/^ostt-cuda_[\d.]+-\d+_amd64\.deb$/, "linux-x86_64-cuda-deb"],
  [/^ostt-vulkan_[\d.]+-\d+_amd64\.deb$/, "linux-x86_64-vulkan-deb"],
  [/^ostt_[\d.]+-\d+_amd64\.deb$/, "linux-x86_64-deb"],
  [/^ostt_[\d.]+-\d+_arm64\.deb$/, "linux-aarch64-deb"],
  [/^ostt-cuda-[\d.]+-\d+\.x86_64\.rpm$/, "linux-x86_64-cuda-rpm"],
  [/^ostt-vulkan-[\d.]+-\d+\.x86_64\.rpm$/, "linux-x86_64-vulkan-rpm"],
  [/^ostt-[\d.]+-\d+\.x86_64\.rpm$/, "linux-x86_64-rpm"],
  [/^ostt-[\d.]+-\d+\.aarch64\.rpm$/, "linux-aarch64-rpm"],
];

// Targets the installer knows how to ask for. A missing one is a hard error:
// silently shipping a manifest with holes would make the installer fall back
// or fail for those users.
const REQUIRED = [
  "linux-x86_64",
  "linux-aarch64",
  "macos-x86_64",
  "macos-aarch64",
  "linux-x86_64-cuda",
  "linux-x86_64-vulkan",
  "linux-x86_64-deb",
  "linux-aarch64-deb",
  "linux-x86_64-rpm",
  "linux-aarch64-rpm",
];

// Non-binary release artifacts that intentionally have no manifest key.
const IGNORED = /^(dist-manifest\.json|ostt-installer\.sh|ostt\.rb|sha256\.sum|source\.tar\.gz)$/;

const headers = {
  accept: "application/vnd.github+json",
  "user-agent": "ostt-manifest-generator",
  ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function get(url, as = "json") {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return as === "json" ? res.json() : res.text();
}

const tag = process.argv[2];
const release = await get(
  tag
    ? `https://api.github.com/repos/${REPO}/releases/tags/${tag}`
    : `https://api.github.com/repos/${REPO}/releases/latest`,
);

const byName = new Map(release.assets.map((a) => [a.name, a]));
const assets = {};
const sha256 = {};

// Fetch every checksum in parallel; they are ~100 bytes each.
const jobs = [];
for (const asset of release.assets) {
  if (asset.name.endsWith(".sha256") || IGNORED.test(asset.name)) continue;

  const rule = RULES.find(([re]) => re.test(asset.name));
  if (!rule) {
    console.warn(`warning: no manifest key for asset ${asset.name}`);
    continue;
  }
  const key = rule[1];

  const sum = byName.get(`${asset.name}.sha256`);
  if (!sum) throw new Error(`asset ${asset.name} has no .sha256 sibling`);

  assets[key] = asset.browser_download_url;
  jobs.push(
    get(sum.browser_download_url, "text").then((text) => {
      const digest = text.trim().split(/\s+/)[0];
      if (!/^[0-9a-f]{64}$/i.test(digest)) {
        throw new Error(`invalid checksum for ${asset.name}: ${digest}`);
      }
      sha256[key] = digest.toLowerCase();
    }),
  );
}
await Promise.all(jobs);

const missing = REQUIRED.filter((k) => !assets[k]);
if (missing.length) {
  throw new Error(`release ${release.tag_name} is missing required targets: ${missing.join(", ")}`);
}

const sortKeys = (o) =>
  Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));

const manifest = {
  version: release.tag_name.replace(/^v/, ""),
  tag: release.tag_name,
  assets: sortKeys(assets),
  sha256: sortKeys(sha256),
};

await writeFile(OUT, JSON.stringify(manifest, null, 2) + "\n");
console.log(`wrote ${OUT} for ${release.tag_name} (${Object.keys(assets).length} targets)`);

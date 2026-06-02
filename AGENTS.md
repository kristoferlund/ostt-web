# Agent Instructions

## Pre-Publish SEO, GEO, And Crawler Checks

Before pushing website changes, check and fix search engine optimization, generative engine optimization, crawler accessibility, and agent-facing metadata.

Required checks:

- Confirm every new public page has a clear H1 (`# H1` or a visible HTML `<h1>`), descriptive `description:` frontmatter, and a unique search-intent-focused title.
- Confirm new docs pages are linked from `.vitepress/config.mts` navigation or sidebar when they should be discoverable by users.
- Confirm new public pages are represented in `public/llms.txt` with canonical `https://ostt.ai/...` URLs and concise descriptions for LLM and agent crawlers.
- Confirm `sitemap.xml` will include new public pages. This site generates it in `.vitepress/config.mts` during `pnpm docs:build` from `siteConfig.pages`.
- Confirm non-public repo documents are listed in `srcExclude` in `.vitepress/config.mts` so they are not published or added to the generated sitemap.
- Confirm `public/robots.txt` still allows desired crawlers and points to `https://ostt.ai/sitemap.xml`.
- Confirm internal links use clean, canonical site paths and do not point to source-only files, local paths, or broken moved pages.
- Confirm external links are intentional and useful; prefer authoritative provider docs, GitHub releases, package managers, and standards pages.
- Confirm page content answers likely user queries directly, using concrete terms such as provider names, model names, OS names, command names, and install methods.
- Confirm images, logos, videos, and rich media have useful alt text, captions, posters, preload behavior, or transcripts where applicable.
- Confirm Open Graph and Twitter metadata are covered by frontmatter plus `.vitepress/config.mts` `transformHead` behavior.
- Confirm structured data is still emitted: homepage uses `SoftwareApplication`; docs pages use `BreadcrumbList`.
- Confirm `meta name="generator"` remains stripped by `transformHtml`.
- Confirm local search is enabled with `themeConfig.search.provider = 'local'`.
- Run a targeted diff review before pushing: `git diff -- .vitepress/config.mts public/llms.txt public/robots.txt` plus any changed markdown pages.

Build verification:

- Ask before running `pnpm docs:build` because full builds require approval in this workspace.
- After an approved build, inspect `.vitepress/dist/sitemap.xml` and `.vitepress/dist/llms.txt` to confirm new public URLs are present.
- Do not edit `.vitepress/dist` by hand; fix source files and rebuild.

When adding a page:

- Add or verify frontmatter `description:`.
- Add the page to the VitePress sidebar or nav if it is part of the main documentation flow.
- Add the page to `public/llms.txt` if it should be visible to agents, LLM crawlers, and answer engines.
- Verify the generated sitemap after an approved build.

When removing or renaming a page:

- Remove or update sidebar and nav references.
- Remove or update `public/llms.txt` references.
- Check for inbound internal links and update them.
- Verify the old URL is not present in the generated sitemap after an approved build.

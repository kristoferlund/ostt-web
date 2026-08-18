<p align="center">
  <img src="https://raw.githubusercontent.com/kristoferlund/ostt/main/ostt.png" width="160" alt="OSTT logo" />
</p>

<p align="center">
  <strong>Documentation site for OSTT — open source voice-to-text for Linux and macOS</strong>
</p>

<p align="center">
  <a href="https://github.com/kristoferlund/ostt-web/stargazers"><img src="https://img.shields.io/github/stars/kristoferlund/ostt-web?style=flat&color=yellow" alt="Stars"></a>
  <a href="https://github.com/kristoferlund/ostt-web/commits/main"><img src="https://img.shields.io/github/last-commit/kristoferlund/ostt-web?style=flat" alt="Last Commit"></a>
  <a href="https://github.com/kristoferlund/ostt/blob/main/LICENSE"><img src="https://img.shields.io/github/license/kristoferlund/ostt?style=flat" alt="License"></a>
</p>

<p align="center">
  <a href="https://ostt.ai">ostt.ai</a> •
  <a href="https://ostt.ai/guide/getting-started">Getting Started</a> •
  <a href="https://ostt.ai/guide/commands">Commands</a> •
  <a href="https://github.com/kristoferlund/ostt">Main repo</a>
</p>

---

This repository contains the documentation site and install script for [OSTT](https://github.com/kristoferlund/ostt), published at **https://ostt.ai**. Built with [VitePress](https://vitepress.dev).

## Structure

```
guide/          Documentation pages (getting started, commands, configuration, ...)
reference/      Reference pages (providers, ...)
public/         Static assets and the install script served at /install
index.md        Landing page
```

## Development

```bash
pnpm install
pnpm docs:dev
```

The site is served at `http://localhost:5173` by default.

## Install Script

`public/install` is the script served at `https://ostt.ai/install`. It detects the platform, installs dependencies, downloads the appropriate release artifact, verifies the checksum, installs the `ostt` binary, sets up shell completions, configures Omarchy 4 integration when detected, and prints first-run model guidance when needed.

```bash
curl -fsSL https://ostt.ai/install | bash
```

Test the Omarchy configuration helpers with:

```bash
scripts/test-install-omarchy.sh
```

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## License

MIT

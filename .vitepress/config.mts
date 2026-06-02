import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type HeadConfig } from 'vitepress'

const siteUrl = 'https://ostt.ai'
const siteTitle = 'OSTT - Open source voice-to-text for Linux and macOS'
const siteDescription = 'Terminal-native speech-to-text. Record from a hotkey, choose your provider, and route transcripts to your clipboard, files, AI prompts, or shell commands.'
const shareImage = `${siteUrl}/og-image.png`

function pageUrl(relativePath: string): string {
  const clean = relativePath
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')
    .replace(/^index$/, '')
  return clean ? `${siteUrl}/${clean}` : siteUrl
}

function softwareApplicationSchema(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'OSTT',
    description: siteDescription,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Linux, macOS',
    url: siteUrl,
    downloadUrl: `${siteUrl}/install`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    codeRepository: 'https://github.com/kristoferlund/ostt',
    license: 'https://github.com/kristoferlund/ostt/blob/main/LICENSE'
  })
}

function breadcrumbSchema(title: string, url: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'OSTT', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: title, item: url }
    ]
  })
}

export default defineConfig({
  title: 'OSTT',
  description: siteDescription,
  appearance: 'dark',
  srcExclude: ['DESIGN.md', 'README.md', 'SEO_AUDIT.md', 'LANDING_PAGES.md'],
  cleanUrls: true,
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (
            warning.code === 'INVALID_ANNOTATION' &&
            warning.message.includes('@vueuse/core') &&
            warning.message.includes('#__PURE__')
          ) {
            return
          }

          warn(warning)
        }
      }
    }
  },
  transformHead({ pageData }) {
    const head: HeadConfig[] = []
    const url = pageUrl(pageData.relativePath)
    const isHome = pageData.relativePath === 'index.md'

    const ogTitle = isHome ? siteTitle : `${pageData.title} — OSTT`
    const description =
      (pageData.frontmatter?.description as string | undefined) || siteDescription

    head.push(['link', { rel: 'canonical', href: url }])
    head.push(['meta', { property: 'og:url', content: url }])
    head.push(['meta', { property: 'og:title', content: ogTitle }])
    head.push(['meta', { property: 'og:description', content: description }])
    head.push(['meta', { name: 'twitter:title', content: ogTitle }])
    head.push(['meta', { name: 'twitter:description', content: description }])

    if (isHome) {
      head.push(['script', { type: 'application/ld+json' }, softwareApplicationSchema()])
    } else {
      head.push(['script', { type: 'application/ld+json' }, breadcrumbSchema(pageData.title, url)])
    }

    return head
  },
  transformHtml(code) {
    return code.replace(/<meta name="generator"[^>]*>\s*/g, '')
  },
  async buildEnd(siteConfig) {
    const urls = siteConfig.pages
      .map((p: string) => pageUrl(p))
      .sort()
    const sitemap = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls.map((url: string) => `  <url><loc>${url}</loc></url>`),
      '</urlset>'
    ].join('\n')
    writeFileSync(join(siteConfig.outDir, 'sitemap.xml'), sitemap)
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/icon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/icon.png' }],
    ['meta', { name: 'theme-color', content: '#0a0a0a' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'OSTT' }],
    // og:title, og:description, og:url injected per-page via transformHead
    ['meta', { property: 'og:image', content: shareImage }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: siteTitle }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@kristoferlund' }],
    // twitter:title, twitter:description injected per-page via transformHead
    ['meta', { name: 'twitter:image', content: shareImage }],
    ['meta', { name: 'twitter:image:alt', content: siteTitle }],
    [
      'script',
      {
        defer: '',
        'data-domain': 'ostt.ai',
        src: '/js/script.js'
      }
    ]
  ],
  themeConfig: {
    logo: { src: '/logo.svg', alt: 'OSTT' },
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Start', link: '/guide/getting-started' },
      { text: 'Why OSTT?', link: '/guide/why-ostt' },
      { text: 'Processing', link: '/guide/processing' },
      { text: 'Platforms', link: '/guide/platforms' },
      { text: 'Reference', link: '/reference/providers' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Why OSTT?', link: '/guide/why-ostt' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Changelog', link: '/guide/changelog' }
        ]
      },
      {
        text: 'Usage',
        items: [
          { text: 'Commands', link: '/guide/commands' },
          { text: 'Processing Actions', link: '/guide/processing' },
          { text: 'Configuration', link: '/guide/configuration' }
        ]
      },
      {
        text: 'Local Models',
        items: [
          { text: 'Overview', link: '/guide/local-models' },
          { text: 'GPU Acceleration', link: '/guide/gpu-acceleration' },
          { text: 'Daemon Mode', link: '/guide/daemon' }
        ]
      },
      {
        text: 'Platform Setup',
        items: [
          { text: 'Overview', link: '/guide/platforms' },
          { text: 'macOS', link: '/guide/platforms/macos' },
          { text: 'Omarchy / Hyprland', link: '/guide/platforms/hyprland' },
          { text: 'GNOME', link: '/guide/platforms/gnome' },
          { text: 'KDE Plasma', link: '/guide/platforms/kde' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Providers and Models', link: '/reference/providers' },
          { text: 'OpenAI', link: '/reference/providers/openai' },
          { text: 'Deepgram', link: '/reference/providers/deepgram' },
          { text: 'Groq', link: '/reference/providers/groq' },
          { text: 'DeepInfra', link: '/reference/providers/deepinfra' },
          { text: 'AssemblyAI', link: '/reference/providers/assemblyai' },
          { text: 'Berget', link: '/reference/providers/berget' },
          { text: 'ElevenLabs', link: '/reference/providers/elevenlabs' },
          { text: 'Mistral', link: '/reference/providers/mistral' },
          { text: 'Troubleshooting', link: '/guide/troubleshooting' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kristoferlund/ostt' }
    ]
  }
})

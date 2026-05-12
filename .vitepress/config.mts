import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'OSTT',
  description: 'Open source speech-to-text for the terminal: Linux-first, provider-agnostic, and scriptable',
  appearance: 'dark',
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
  head: [
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      }
    ],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: ''
      }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
      }
    ],
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
    logo: '/logo.svg',
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
          { text: 'Installation', link: '/guide/installation' }
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
          { text: 'Troubleshooting', link: '/guide/troubleshooting' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kristoferlund/ostt' }
    ]
  }
})

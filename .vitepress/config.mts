import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'OSTT',
  description: 'Open source voice-to-text for developers who want Linux-first support, provider choice, and a scriptable pipeline',
  head: [
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

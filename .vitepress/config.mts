import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'OSTT',
  description: 'Interactive terminal-based audio recording and speech-to-text transcription tool',
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
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kristoferlund/ostt' }
    ]
  }
})

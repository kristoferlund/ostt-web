<script setup lang="ts">
withDefaults(defineProps<{ tagline?: string }>(), {
  tagline: 'Open source voice-to-text for developers. Linux-first, provider-agnostic, scriptable.'
})

const columns = [
  {
    title: 'Get started',
    links: [
      { text: 'Getting started', href: '/guide/getting-started' },
      { text: 'Installation', href: '/guide/installation' },
      { text: 'Why OSTT?', href: '/guide/why-ostt' },
      { text: 'Commands', href: '/guide/commands' },
      { text: 'Configuration', href: '/guide/configuration' },
      { text: 'Processing actions', href: '/guide/processing' },
      { text: 'Troubleshooting', href: '/guide/troubleshooting' }
    ]
  },
  {
    title: 'Models',
    links: [
      { text: 'Choosing a model', href: '/guide/choosing-a-model' },
      { text: 'Local models', href: '/guide/local-models' },
      { text: 'GPU acceleration', href: '/guide/gpu-acceleration' },
      { text: 'Daemon mode', href: '/guide/daemon' },
      { text: 'External engines', href: '/guide/external-engines' },
      { text: 'Cloud models', href: '/guide/cloud-models' }
    ]
  },
  {
    title: 'Platforms',
    links: [
      { text: 'Linux & macOS', href: '/' },
      { text: 'Omarchy dictation', href: '/omarchy' },
      { text: 'macOS setup', href: '/guide/platforms/macos' },
      { text: 'Omarchy dictation setup', href: '/guide/platforms/omarchy-dictation' },
      { text: 'Hyprland setup', href: '/guide/platforms/hyprland' },
      { text: 'GNOME setup', href: '/guide/platforms/gnome' },
      { text: 'KDE Plasma setup', href: '/guide/platforms/kde' }
    ]
  },
  {
    title: 'Project',
    links: [
      { text: 'OSTT on GitHub', href: 'https://github.com/kristoferlund/ostt' },
      { text: 'Plugin on GitHub', href: 'https://github.com/kristoferlund/ostt-omarchy-dictate' },
      { text: 'Report an issue', href: 'https://github.com/kristoferlund/ostt/issues' },
      { text: 'Changelog', href: '/guide/changelog' },
      { text: 'Install with an AI agent', href: '/guide/ai-skill' }
    ]
  }
]
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner footer-columns">
      <div class="footer-brand">
        <strong>OSTT</strong>
        <span>{{ tagline }}</span>
      </div>
      <nav v-for="column in columns" :key="column.title" class="footer-links" :aria-label="column.title">
        <p class="footer-title">{{ column.title }}</p>
        <a v-for="link in column.links" :key="link.href" :href="link.href">{{ link.text }}</a>
      </nav>
    </div>
  </footer>
</template>

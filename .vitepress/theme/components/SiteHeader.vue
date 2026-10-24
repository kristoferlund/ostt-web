<script setup lang="ts">
import { useRoute } from 'vitepress'

withDefaults(
  defineProps<{ docs?: string; github?: string }>(),
  {
    docs: '/guide/getting-started',
    github: 'https://github.com/kristoferlund/ostt'
  }
)

const route = useRoute()
// The page you are on, as `/` or `/omarchy`, however the URL was written.
const current = (href: string) => (route.path.replace(/(index)?(\.html)?$/, '').replace(/(.)\/$/, '$1')) === href
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="header-logo" aria-label="OSTT home">
        <span class="logo-mark" aria-hidden="true"></span>
      </a>
      <nav class="header-nav">
        <a href="/" :aria-current="current('/') ? 'page' : undefined">Linux &amp; macOS</a>
        <a href="/omarchy" :aria-current="current('/omarchy') ? 'page' : undefined">Omarchy</a>
        <a :href="docs">Docs</a>
        <a :href="github" class="header-github">GitHub</a>
      </nav>
    </div>
  </header>
</template>

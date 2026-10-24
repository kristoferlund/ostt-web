<script setup lang="ts">
import { wave } from '../spine'

// Where the spine meets a section: the line swells into a short sound wave,
// drawn as far as the lit spine has reached it.
const path = wave()
</script>

<template>
  <div class="node" data-draw>
    <svg class="node-wave" viewBox="0 0 28 120" aria-hidden="true"><path :d="path" pathLength="1" /></svg>
  </div>
</template>

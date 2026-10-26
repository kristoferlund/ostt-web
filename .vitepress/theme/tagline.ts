import { onMounted, ref } from 'vue'

declare global {
  interface Window {
    plausible?: (event: string, options?: { props: Record<string, string> }) => void
  }
}

// Picks one hero tagline per visit. Each tagline is its lines. The pick happens
// after hydration, so the server-rendered page and the client agree; until then
// the headline stays hidden instead of swapping in view.
export function useTagline(taglines: string[][]) {
  const tagline = ref(taglines[0])
  const ready = ref(false)

  onMounted(() => {
    tagline.value = taglines[Math.floor(Math.random() * taglines.length)]
    ready.value = true
  })

  // A Plausible event carrying the tagline shown, which is what tells the
  // taglines apart.
  function track(event: string) {
    window.plausible?.(event, { props: { tagline: tagline.value.join(' ') } })
  }

  return { tagline, ready, track }
}

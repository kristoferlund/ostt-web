import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

// The spine of a landing page: a line from the logo down the page, lit as
// far as the reader has scrolled. Elements marked [data-draw] (the waves where
// it meets a section, lines that branch off it) get --draw, how far the lit
// line has reached into them, so they stay joined to it scrolling either way.
// Elements marked [data-reveal] get .in once they come into view, and
// [data-scene] elements are reported as they come and go, to play their
// animation only while on screen.

// The lit line ends at this height on the screen.
const TIP = 0.55
const clamp = (x: number) => Math.min(1, Math.max(0, x))

export function useSpine(onScene?: (name: string, visible: boolean) => void) {
  const root = ref<HTMLElement | null>(null)
  // The spine runs from just under `logo` to just above `end`.
  const logo = ref<HTMLElement | null>(null)
  const end = ref<HTMLElement | null>(null)
  const spine = ref<HTMLElement | null>(null)
  const top = ref(0)
  const bottom = ref(0)
  const progress = ref(0)
  const reduced = ref(false)
  let observer: IntersectionObserver | null = null
  let resizer: ResizeObserver | null = null
  let frame = 0

  function measure() {
    if (!root.value || !logo.value || !end.value) return
    top.value = logo.value.offsetTop + logo.value.offsetHeight + 20
    bottom.value = root.value.offsetHeight - end.value.offsetTop + 48
  }

  function update() {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      if (!root.value || !spine.value) return
      measure()
      // Without motion, the whole line is drawn from the start.
      const tip = reduced.value ? Infinity : window.innerHeight * TIP
      // From the measured ends, not the spine's own box, which still has the
      // ends of the last measure until the style is applied.
      const page = root.value.getBoundingClientRect()
      const lineTop = page.top + top.value
      const lineHeight = page.height - top.value - bottom.value
      progress.value = clamp((tip - lineTop) / lineHeight)
      root.value.querySelectorAll<HTMLElement>('[data-draw]').forEach((el) => {
        const box = el.getBoundingClientRect()
        el.style.setProperty('--draw', String(clamp((tip - box.top) / box.height)))
      })
    })
  }

  onMounted(() => {
    reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, { passive: true })
    // The page's height changes without a scroll or resize event as fonts and
    // images load.
    resizer = new ResizeObserver(update)
    if (root.value) resizer.observe(root.value)
    if (reduced.value) {
      root.value?.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('in'))
      return
    }
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) el.classList.add('in')
          if (el.dataset.scene) onScene?.(el.dataset.scene, entry.isIntersecting)
        }
      },
      { threshold: 0.35 }
    )
    root.value?.querySelectorAll('[data-reveal], [data-scene]').forEach((el) => observer!.observe(el))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    resizer?.disconnect()
    window.removeEventListener('resize', update)
    window.removeEventListener('scroll', update)
    cancelAnimationFrame(frame)
  })

  const style = computed(() => ({
    '--spine-top': `${top.value}px`,
    '--spine-bottom': `${bottom.value}px`,
    '--progress': progress.value
  }))

  return { root, logo, end, spine, style, reduced }
}

// A vertical sound wave: a line that swells into a burst of speech and
// settles back, drawn top to bottom.
export function wave(height = 120, width = 28, cycles = 9): string {
  const mid = width / 2
  const steps = 120
  let d = `M ${mid} 0`
  for (let s = 1; s <= steps; s++) {
    const t = s / steps
    const envelope = Math.sin(Math.PI * t) ** 2
    const x = mid + Math.sin(t * cycles * 2 * Math.PI) * envelope * (mid - 1) * (0.55 + 0.45 * Math.sin(t * 23))
    d += ` L ${x.toFixed(2)} ${(t * height).toFixed(2)}`
  }
  return d
}

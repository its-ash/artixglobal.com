import type { Ref } from 'vue'
import gsap from 'gsap'

export interface MotionCtx { reduce: boolean, desktop: boolean, fine: boolean }

export const useMotion = (root: Ref<HTMLElement | null>, fn: (c: MotionCtx, el: HTMLElement) => void | (() => void)) => {
  let mm: gsap.MatchMedia | null = null
  onMounted(() => {
    const el = root.value
    if (!el) return
    mm = gsap.matchMedia()
    mm.add(
      { all: '(min-width: 0px)', reduce: '(prefers-reduced-motion: reduce)', desktop: '(min-width: 1024px)', fine: '(pointer: fine)' },
      ctx => fn(ctx.conditions as unknown as MotionCtx, el),
      el
    )
  })
  onBeforeUnmount(() => mm?.revert())
}

export const useInView = (el: Ref<HTMLElement | null>, opts: IntersectionObserverInit = { rootMargin: '120px' }) => {
  const visible = ref(false)
  let io: IntersectionObserver | null = null
  onMounted(() => {
    if (!el.value) return
    io = new IntersectionObserver(([e]) => { visible.value = !!e?.isIntersecting }, opts)
    io.observe(el.value)
  })
  onBeforeUnmount(() => io?.disconnect())
  return visible
}

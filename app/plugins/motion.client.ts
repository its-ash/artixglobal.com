import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

export default defineNuxtPlugin((nuxt) => {
  gsap.registerPlugin(ScrollTrigger, SplitText)
  gsap.defaults({ ease: 'expo.out', duration: 0.9 })
  ScrollTrigger.config({ ignoreMobileResize: true })

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const fine = matchMedia('(pointer: fine)').matches
  let lenis: Lenis | null = null

  if (!reduce) {
    lenis = new Lenis({ lerp: fine ? 0.09 : 0.14, smoothWheel: true, syncTouch: false, anchors: { offset: -72 } })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(t => lenis?.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)
  }

  nuxt.hook('page:finish', () => {
    lenis?.scrollTo(0, { immediate: true })
    requestAnimationFrame(() => ScrollTrigger.refresh())
  })
  addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
  document.fonts?.ready.then(() => ScrollTrigger.refresh())

  return { provide: { lenis } }
})

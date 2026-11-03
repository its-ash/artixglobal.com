import gsap from 'gsap'

const ssr = { getSSRProps: () => ({}) }
const ok = () => matchMedia('(pointer: fine)').matches
const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.directive<HTMLElement, number | undefined>('magnetic', {
    ...ssr,
    mounted(el, { value = 0.3 }) {
      if (!ok() || still()) return
      const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.45)' })
      const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.45)' })
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect()
        x((e.clientX - r.left - r.width / 2) * value)
        y((e.clientY - r.top - r.height / 2) * value)
      })
      el.addEventListener('pointerleave', () => { x(0); y(0) })
    }
  })

  nuxt.vueApp.directive<HTMLElement>('spot', {
    ...ssr,
    mounted(el) {
      if (!ok()) return
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
      })
    }
  })

  nuxt.vueApp.directive<HTMLElement, number | undefined>('tilt', {
    ...ssr,
    mounted(el, { value = 6 }) {
      if (!ok() || still()) return
      gsap.set(el, { transformPerspective: 900 })
      const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' })
      const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' })
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect()
        ry(((e.clientX - r.left) / r.width - 0.5) * value * 2)
        rx(-((e.clientY - r.top) / r.height - 0.5) * value * 2)
      })
      el.addEventListener('pointerleave', () => { rx(0); ry(0) })
    }
  })
})

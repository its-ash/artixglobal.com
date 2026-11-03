<script setup lang="ts">
import gsap from 'gsap'

const KEY = 'ag-intro'
const intro = useState('intro', () => false)
const root = ref<HTMLElement | null>(null)
const gone = ref(false)

onMounted(() => {
  const el = root.value!
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const seen = sessionStorage.getItem(KEY) === '1'
  document.documentElement.classList.add('is-loading')
  const done = () => {
    gone.value = true
    intro.value = true
    sessionStorage.setItem(KEY, '1')
    document.documentElement.classList.remove('is-loading')
  }
  if (reduce || seen) {
    gsap.to(el, { autoAlpha: 0, duration: seen ? 0.35 : 0.2, ease: 'power2.out', onStart: () => { intro.value = true }, onComplete: done })
    return
  }
  const q = gsap.utils.selector(el)
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
  tl.from(q('[data-up]'), { x: -60, y: 60, autoAlpha: 0, duration: 1 }, 0.1)
    .from(q('[data-down]'), { x: 60, y: -60, autoAlpha: 0, duration: 1 }, 0.1)
    .from(q('[data-bar]'), { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power3.inOut' }, 0)
    .from(q('[data-word]'), { yPercent: 110, duration: 0.8 }, 0.45)
    .to(q('[data-inner]'), { yPercent: -12, autoAlpha: 0, duration: 0.5, ease: 'power3.in' }, 1.35)
    .to(el, { yPercent: -100, duration: 0.9, ease: 'expo.inOut', onStart: () => { intro.value = true } }, 1.55)
    .add(done)
})
</script>

<template>
  <div v-if="!gone" ref="root" class="preloader fixed inset-0 z-[90] grid place-items-center bg-ink" aria-hidden="true">
    <div data-inner class="flex flex-col items-center gap-6">
      <BrandLogo mark class="h-20 w-auto text-fg md:h-24" />
      <div class="split-line font-mono text-xs tracking-[0.3em] text-mute uppercase">
        <span data-word class="inline-block">Artix Global</span>
      </div>
      <div class="h-px w-40 bg-line">
        <div data-bar class="h-full w-full bg-gold" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.preloader { animation: failsafe 0.4s 4s forwards; }
@keyframes failsafe { to { opacity: 0; visibility: hidden; } }
</style>

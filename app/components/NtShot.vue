<script setup lang="ts">
import gsap from 'gsap'

const props = withDefaults(defineProps<{ src: string, w: number, h: number, alt: string, scene?: number }>(), { scene: 0 })
const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  gsap.from(q('[data-frame]'), { y: 80, autoAlpha: 0, duration: 1.4, ease: 'expo.out', delay: 0.5 })
  gsap.fromTo(q('[data-tilt]'), { rotateX: 18, scale: 0.9 }, { rotateX: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'center 55%', scrub: true } })
  gsap.fromTo(q('[data-img]'), { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
})
</script>

<template>
  <div ref="root" :data-scene="props.scene" class="wrap relative max-w-6xl pb-16 [perspective:1400px] md:pb-24">
    <figure data-tilt class="origin-bottom">
      <div data-frame class="relative isolate overflow-hidden rounded-[1.25rem] border border-line-strong bg-ink-2 p-2 shadow-[0_40px_120px_-40px_rgb(0_0_0/.9)] md:p-3">
        <span class="edge pointer-events-none absolute inset-x-0 top-0 h-px" aria-hidden="true" />
        <div class="overflow-hidden rounded-[0.9rem]">
          <img data-img :src="src" :width="w" :height="h" :alt="alt" fetchpriority="high" decoding="async" class="h-auto w-full scale-[1.08]">
        </div>
      </div>
    </figure>
  </div>
</template>

<style scoped>
.edge { background: linear-gradient(90deg, transparent, var(--color-gold) 30%, var(--color-red) 70%, transparent); opacity: 0.7; }
</style>

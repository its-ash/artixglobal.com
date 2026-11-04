<script setup lang="ts">
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { PhArrowRight } from '@phosphor-icons/vue'
import { SIGNUP } from '~/utils/site'
import type { MktFeature } from '~/utils/pages/markets'

defineProps<{ feature: MktFeature, n: string }>()
const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  const split = SplitText.create(q('[data-h]'), { type: 'lines,words', mask: 'lines', linesClass: 'pb-[0.06em]' })
  gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 65%', once: true } })
    .from(q('[data-rule]'), { scaleY: 0, transformOrigin: 'top', duration: 1, ease: 'expo.inOut' })
    .from(split.words, { yPercent: 115, duration: 1.2, stagger: 0.04, ease: 'expo.out' }, 0.2)
    .from(q('[data-r]'), { y: 24, autoAlpha: 0, stagger: 0.08, duration: 1 }, 0.6)
  gsap.fromTo(q('[data-ring]'), { scale: 0.7, rotate: -30 }, { scale: 1.15, rotate: 30, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
  return () => split.revert()
})
</script>

<template>
  <section ref="root" data-scene="2" data-spin="1" class="relative overflow-clip py-28 text-center md:py-44" aria-labelledby="mf-h">
    <SideLabel :n="n" :text="feature.kicker" />
    <div data-ring class="ring pointer-events-none absolute left-1/2 top-1/2 -ml-[min(42rem,60vw)] -mt-[min(42rem,60vw)] size-[min(84rem,120vw)] rounded-full" aria-hidden="true" />
    <div class="wrap relative flex flex-col items-center">
      <div data-rule class="mb-10 h-16 w-px bg-gradient-to-b from-transparent to-gold" />
      <p data-r class="eyebrow">{{ feature.kicker }}</p>
      <h2 id="mf-h" data-h class="display mt-5 max-w-[18ch] text-[length:var(--text-h2)]">{{ feature.title }} <em class="text-red-2">{{ feature.em }}</em></h2>
      <p data-r class="mt-7 max-w-2xl text-mute md:text-lg">{{ feature.body }}</p>
      <div data-r class="mt-9">
        <a v-magnetic :href="SIGNUP" class="btn btn-gold btn-lg">Start Trading <PhArrowRight :size="18" /></a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ring {
  background:
    radial-gradient(closest-side, transparent 64%, color-mix(in oklab, var(--color-gold) 10%, transparent) 65%, transparent 66%),
    radial-gradient(closest-side, transparent 80%, color-mix(in oklab, var(--color-red) 8%, transparent) 81%, transparent 82%);
}
</style>

<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowRight } from '@phosphor-icons/vue'
import { SIGNUP } from '~/utils/site'
import { MKT_WHY } from '~/utils/pages/markets'

defineProps<{ n: string }>()
const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce, desktop }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  gsap.from(q('[data-head] > *'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  q('[data-pt]').forEach((p, i) => {
    gsap.from(p, { x: desktop ? (i % 2 ? 50 : -50) : 0, y: desktop ? 0 : 30, autoAlpha: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 85%', once: true } })
  })
})
</script>

<template>
  <section ref="root" data-scene="2" class="relative py-24 md:py-36" aria-labelledby="mw-h">
    <SideLabel :n="n" text="Why Artix" />
    <div data-head class="wrap flex flex-col items-center text-center">
      <p class="eyebrow">Why Artix Global</p>
      <h2 id="mw-h" class="display mt-4 max-w-[16ch] text-[length:var(--text-h2)]">Why trade with <em class="text-red-2">Artix Global?</em></h2>
      <div class="mt-10 h-14 w-px bg-gradient-to-b from-gold to-transparent" />
    </div>

    <ol class="wrap mt-6 grid max-w-6xl gap-4 md:mt-10 md:grid-cols-2 md:gap-6">
      <li v-for="(t, i) in MKT_WHY" :key="i" data-pt v-spot class="card spot flex gap-5 p-6 md:p-8">
        <span class="num display shrink-0 text-4xl leading-none text-gold-2">0{{ i + 1 }}</span>
        <p class="text-fg/85">{{ t }}</p>
      </li>
    </ol>

    <div class="mt-14 flex justify-center md:mt-20">
      <a v-magnetic :href="SIGNUP" class="btn btn-gold btn-lg">Start Trading <PhArrowRight :size="18" /></a>
    </div>
  </section>
</template>

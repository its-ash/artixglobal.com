<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowRight } from '@phosphor-icons/vue'
import { SIGNUP } from '~/utils/site'
import { MKT_STEPS } from '~/utils/pages/markets'

defineProps<{ gateway: string, n: string }>()
const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  gsap.from(q('[data-head] > *'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  gsap.fromTo(q('[data-fill]'), { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: q('[data-list]')[0], start: 'top 75%', end: 'bottom 55%', scrub: 0.4 } })
  gsap.from(q('[data-step]'), { y: 50, autoAlpha: 0, stagger: 0.12, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: q('[data-list]')[0], start: 'top 78%', once: true } })
  gsap.from(q('[data-dot]'), { scale: 0, rotate: -180, stagger: 0.12, duration: 0.8, ease: 'back.out(2)', scrollTrigger: { trigger: q('[data-list]')[0], start: 'top 78%', once: true } })
})
</script>

<template>
  <section ref="root" data-scene="3" class="relative border-y border-line bg-ink/40 py-24 md:py-36" aria-labelledby="ms-h">
    <SideLabel :n="n" text="Get started" />
    <div data-head class="wrap flex flex-col items-center text-center">
      <p class="eyebrow">How to open an account</p>
      <h2 id="ms-h" class="display mt-4 max-w-[18ch] text-[length:var(--text-h2)]">Your gateway to {{ gateway }} <em class="text-red-2">in 3 simple steps</em></h2>
      <div class="mt-10 h-14 w-px bg-gradient-to-b from-gold to-transparent" />
    </div>

    <div data-list class="wrap relative mt-8 max-w-6xl md:mt-12">
      <div aria-hidden="true" class="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-line md:block">
        <div data-fill class="h-full w-full origin-left bg-gold" />
      </div>
      <ol class="relative grid gap-6 md:grid-cols-3 md:gap-8">
        <li v-for="s in MKT_STEPS" :key="s.n" data-step class="flex flex-col items-center text-center">
          <span data-dot class="relative grid size-14 rotate-45 place-items-center border border-gold bg-ink">
            <span class="num -rotate-45 font-mono text-sm text-gold">{{ s.n }}</span>
          </span>
          <div class="card mt-8 flex w-full flex-1 flex-col items-center p-6 md:p-8">
            <span class="display pointer-events-none absolute -bottom-6 -right-2 select-none text-[8rem] leading-none text-fg/[0.04]" aria-hidden="true">{{ s.n }}</span>
            <h3 class="display relative text-3xl md:text-4xl">{{ s.title }}</h3>
            <p class="relative mt-3 text-mute">{{ s.body }}</p>
          </div>
        </li>
      </ol>
    </div>

    <div class="mt-14 flex justify-center md:mt-20">
      <a v-magnetic :href="SIGNUP" class="btn btn-gold btn-lg">Open Account <PhArrowRight :size="18" /></a>
    </div>
  </section>
</template>

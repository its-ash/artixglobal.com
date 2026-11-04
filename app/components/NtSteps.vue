<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowRight } from '@phosphor-icons/vue'
import { SIGNUP } from '~/utils/site'
import type { Step } from '~/utils/pages/ntrader'

const props = withDefaults(defineProps<{ id: string, n: string, label: string, eyebrow: string, title: string, em?: string, lead?: string, steps: Step[], scene?: number }>(), { scene: 1 })
const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  gsap.from(q('[data-head] > *'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  q('[data-seg]').forEach((s) => {
    gsap.fromTo(s, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: s.parentElement, start: 'top 80%', end: 'bottom 45%', scrub: 0.4 } })
  })
  q('[data-step]').forEach((s) => {
    gsap.timeline({ scrollTrigger: { trigger: s, start: 'top 78%', once: true } })
      .from(s.querySelector('[data-dot]'), { scale: 0, rotate: -180, duration: 0.8, ease: 'back.out(2)' })
      .from(s.querySelectorAll('[data-in]'), { y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.9 }, 0.15)
      .from(s.querySelector('[data-big]'), { scale: 0.6, autoAlpha: 0, duration: 1.4 }, 0)
  })
})
</script>

<template>
  <section ref="root" :data-scene="props.scene" class="relative border-y border-line bg-ink/40 py-24 md:py-36" :aria-labelledby="id">
    <SideLabel :n="n" :text="label" />
    <NtHead :id="id" :eyebrow="eyebrow" :title="title" :em="em" :lead="lead" />

    <ol class="wrap mt-10 flex max-w-5xl flex-col items-center text-center md:mt-14">
      <li v-for="(s, i) in steps" :key="s.n" data-step class="relative flex w-full flex-col items-center md:grid md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-x-12">
        <span data-dot class="relative grid size-14 rotate-45 place-items-center border border-gold bg-ink md:col-start-2 md:row-start-1">
          <span class="-rotate-45 font-mono text-sm text-gold">{{ s.n }}</span>
        </span>
        <div
          class="relative mt-6 flex flex-col items-center md:row-start-1 md:mt-0"
          :class="i % 2 ? 'md:col-start-3 md:items-start md:text-left' : 'md:col-start-1 md:items-end md:text-right'"
        >
          <span data-big class="display pointer-events-none absolute inset-x-0 -top-14 select-none text-center text-[9rem] leading-none text-fg/[0.04] md:text-[12rem]" :class="i % 2 ? 'md:text-left' : 'md:text-right'" aria-hidden="true">{{ s.n }}</span>
          <h3 data-in class="display relative text-4xl md:text-5xl">{{ s.title }}</h3>
          <p data-in class="relative mt-3 max-w-sm text-mute">{{ s.body }}</p>
        </div>
        <div v-if="i < steps.length - 1" class="my-8 h-24 w-px bg-line md:col-start-2 md:row-start-2 md:my-4 md:h-36 md:justify-self-center">
          <div data-seg class="h-full w-full origin-top bg-gold" />
        </div>
      </li>
    </ol>

    <div class="mt-14 flex justify-center md:mt-20">
      <a v-magnetic :href="SIGNUP" class="btn btn-gold btn-lg">Open Account <PhArrowRight :size="18" /></a>
    </div>
  </section>
</template>

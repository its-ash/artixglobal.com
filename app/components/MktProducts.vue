<script setup lang="ts">
import type { Component } from 'vue'
import gsap from 'gsap'
import { PhCoins, PhVault, PhCurrencyDollar, PhArrowsLeftRight, PhGlobeHemisphereWest, PhDrop, PhPlant, PhFlag, PhBank, PhSunHorizon, PhChartLineUp, PhCurrencyBtc, PhSparkle, PhLockKey } from '@phosphor-icons/vue'
import type { MktIcon, MktProduct } from '~/utils/pages/markets'

defineProps<{ name: string, products: MktProduct[], n: string }>()

const ICONS: Record<MktIcon, Component> = {
  coins: PhCoins, vault: PhVault, currency: PhCurrencyDollar, swap: PhArrowsLeftRight, globe: PhGlobeHemisphereWest, drop: PhDrop,
  plant: PhPlant, flag: PhFlag, bank: PhBank, sun: PhSunHorizon, chart: PhChartLineUp, btc: PhCurrencyBtc, sparkle: PhSparkle, lock: PhLockKey
}

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce, desktop }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  gsap.from(q('[data-head] > *'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  gsap.fromTo(q('[data-fill]'), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: q('[data-rail]')[0], start: 'top 70%', end: 'bottom 60%', scrub: 0.4 } })
  q('[data-item]').forEach((it, i) => {
    gsap.timeline({ scrollTrigger: { trigger: it, start: 'top 80%', once: true } })
      .from(it.querySelector('[data-node]'), { scale: 0, rotate: -135, duration: 0.8, ease: 'back.out(2)' })
      .from(it.querySelector('[data-card]'), desktop ? { x: i % 2 ? 70 : -70, autoAlpha: 0, duration: 1.1, ease: 'expo.out' } : { y: 40, autoAlpha: 0, duration: 1, ease: 'expo.out' }, 0.1)
      .from(it.querySelectorAll('[data-tag]'), { y: 10, autoAlpha: 0, stagger: 0.05, duration: 0.6 }, 0.5)
  })
})
</script>

<template>
  <section id="products" ref="root" data-scene="1" class="relative scroll-mt-20 border-y border-line bg-ink/40 py-24 md:py-36" aria-labelledby="mp-h">
    <SideLabel :n="n" text="Products" />
    <div data-head class="wrap flex flex-col items-center text-center">
      <p class="eyebrow">Products offer</p>
      <h2 id="mp-h" class="display mt-4 max-w-[16ch] text-[length:var(--text-h2)]">{{ name }} <em class="text-red-2">products</em></h2>
      <div class="mt-10 h-14 w-px bg-gradient-to-b from-gold to-transparent" />
    </div>

    <div data-rail class="wrap relative mt-6 max-w-6xl md:mt-10">
      <div aria-hidden="true" class="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-line md:block">
        <div data-fill class="h-full w-full origin-top bg-gold" />
      </div>
      <ol class="relative flex flex-col gap-10 md:gap-16">
      <li v-for="(p, i) in products" :key="p.title" data-item class="relative md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-x-12">
        <span data-node class="relative z-10 mx-auto mb-6 hidden size-12 rotate-45 place-items-center border border-gold bg-ink md:col-start-2 md:row-start-1 md:mb-0 md:grid" aria-hidden="true">
          <span class="num -rotate-45 font-mono text-xs text-gold">0{{ i + 1 }}</span>
        </span>
        <article
          v-spot data-card
          class="card spot p-6 transition-colors duration-300 hover:border-line-strong md:row-start-1 md:p-8"
          :class="i % 2 ? 'md:col-start-3' : 'md:col-start-1'"
        >
          <div class="halo pointer-events-none absolute -right-24 -top-24 size-64 rounded-full" />
          <div class="relative flex items-start justify-between gap-4">
            <span class="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong text-gold">
              <component :is="ICONS[p.icon]" :size="22" aria-hidden="true" />
            </span>
            <span v-if="p.badge" class="rounded-full border border-gold/40 px-3 py-1 font-mono text-[0.68rem] tracking-[0.12em] text-gold-2 uppercase">{{ p.badge }}</span>
            <span v-else class="num font-mono text-xs text-dim md:hidden">0{{ i + 1 }} / 0{{ products.length }}</span>
          </div>
          <h3 class="display relative mt-7 text-[length:var(--text-h3)]">{{ p.title }}</h3>
          <p class="relative mt-3 text-mute">{{ p.body }}</p>
          <ul class="relative mt-6 flex flex-wrap gap-2" :aria-label="`${p.title} instruments`">
            <li v-for="t in p.tags" :key="t" data-tag class="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-fg/85">{{ t }}</li>
          </ul>
        </article>
      </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.halo { background: radial-gradient(closest-side, color-mix(in oklab, var(--color-gold) 12%, transparent), transparent); }
</style>

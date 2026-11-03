<script setup lang="ts">
import gsap from 'gsap'

const A = ['Forex', 'Precious Metals', 'Commodities', 'Stocks', 'Indices', 'Crypto']
const B = ['Raw spreads from 0.0 pips', 'Leverage up to 1:200', 'Start with $50', 'nTrader for Windows and Mobile']
const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
  tl.fromTo(q('[data-a]'), { xPercent: 0 }, { xPercent: -35, ease: 'none' }, 0)
    .fromTo(q('[data-b]'), { xPercent: -35 }, { xPercent: 0, ease: 'none' }, 0)
    .fromTo(q('[data-ta]'), { rotate: -1 }, { rotate: -7, ease: 'none' }, 0)
    .fromTo(q('[data-tb]'), { rotate: 1 }, { rotate: 7, ease: 'none' }, 0)
})
</script>

<template>
  <section ref="root" data-scene="2" class="relative grid h-[52vw] max-h-[34rem] min-h-[18rem] place-items-center overflow-hidden" aria-label="Markets and conditions">
    <div data-tb class="tape absolute w-[130%] border-y border-line-strong bg-ink/80 py-3 backdrop-blur-sm md:py-5">
      <div data-b class="flex w-max gap-10 whitespace-nowrap">
        <span v-for="k in 3" :key="k" class="flex gap-10" :aria-hidden="k > 1">
          <span v-for="t in B" :key="t" class="outline-text display flex items-center gap-10 text-[clamp(2rem,5vw,4.5rem)]">{{ t }}<span class="text-red">✕</span></span>
        </span>
      </div>
    </div>
    <div data-ta class="tape absolute w-[130%] bg-gold py-3 text-on-gold md:py-5">
      <div data-a class="flex w-max gap-10 whitespace-nowrap">
        <span v-for="k in 3" :key="k" class="flex gap-10" :aria-hidden="k > 1">
          <span v-for="t in A" :key="t" class="display flex items-center gap-10 text-[clamp(2rem,5vw,4.5rem)]">{{ t }}<span class="opacity-40">✕</span></span>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tape { will-change: transform; }
.outline-text { color: transparent; -webkit-text-stroke: 1px var(--color-fg); }
@media (prefers-reduced-motion: reduce) { [data-ta] { rotate: -5deg; } [data-tb] { rotate: 5deg; } }
@media (prefers-reduced-transparency: reduce) { [data-tb] { background: var(--color-ink); backdrop-filter: none; } }
</style>

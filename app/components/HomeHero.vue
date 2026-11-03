<script setup lang="ts">
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { PhArrowRight } from '@phosphor-icons/vue'

const root = ref<HTMLElement | null>(null)
const intro = useState('intro', () => false)

const FACTS = [
  { v: '0.0', u: 'pips', l: 'Raw spreads from' },
  { v: '1:200', u: '', l: 'Leverage up to' },
  { v: '$50', u: '', l: 'Start trading with' }
]

let enter: gsap.core.Timeline | null = null

useMotion(root, ({ reduce }, el) => {
  const q = gsap.utils.selector(el)
  if (reduce) return
  const split = SplitText.create(q('[data-h]'), { type: 'lines,chars', mask: 'lines', linesClass: 'pb-[0.06em]' })
  enter = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
    .from(q('[data-g]'), { yPercent: 30, autoAlpha: 0, duration: 2.4, ease: 'power3.out' }, 0)
    .from(q('[data-k]'), { y: 16, autoAlpha: 0, duration: 0.8 }, 0.1)
    .from(split.chars, { yPercent: 120, duration: 1.2, stagger: { each: 0.025, from: 'center' } }, 0.15)
    .from(q('[data-line]'), { scaleX: 0, duration: 1.4, ease: 'expo.inOut' }, 0.3)
    .from(q('[data-r]'), { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.6)
    .from(q('[data-v]'), { autoAlpha: 0, yPercent: 40, duration: 1.2, stagger: 0.1 }, 0.8)
  if (intro.value) enter.play()

  gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } })
    .to(q('[data-copy]'), { yPercent: -30, autoAlpha: 0, ease: 'none' }, 0)
    .to(q('[data-g]'), { yPercent: -38, scale: 1.45, ease: 'none' }, 0)
    .to(q('[data-v]'), { yPercent: -60, autoAlpha: 0, ease: 'none' }, 0)
  return () => split.revert()
})

watch(intro, v => v && enter?.play())
</script>

<template>
  <section ref="root" data-scene="0" class="hero relative isolate flex min-h-[100svh] flex-col items-center overflow-hidden pt-16 text-center md:pt-[4.5rem]" aria-labelledby="hero-h">
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="glow absolute left-1/2 top-[30%] size-[90vmax] -translate-x-1/2 rounded-full" />
      <div class="grid-bg absolute inset-0" />
    </div>

    <div data-g class="absolute inset-x-0 top-[50%] -z-[5] mx-auto h-[70svh] md:top-[28%] md:h-[100svh]">
      <HeroSaturn />
    </div>

    <p data-v class="vtext pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 lg:block xl:left-8" aria-hidden="true">Forex · Metals · Commodities · Stocks · Indices · Crypto</p>
    <p data-v class="vtext right pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 lg:block xl:right-8" aria-hidden="true">Scroll to explore</p>

    <div data-copy class="wrap pointer-events-none relative flex flex-1 flex-col items-center pt-[9svh] md:pt-[12svh] [&_a]:pointer-events-auto">
      <p data-k class="eyebrow flex items-center gap-3">
        <span class="relative flex size-2"><span class="absolute inset-0 animate-ping rounded-full bg-up/70 motion-reduce:hidden" /><span class="relative size-2 rounded-full bg-up" /></span>
        Forex and CFD broker on nTrader
      </p>
      <h1 id="hero-h" data-h class="display mt-6 max-w-[14ch] text-[length:var(--text-hero)]">
        Built for the <em class="text-red-2">best execution</em>
      </h1>
      <div data-line class="mt-7 h-px w-40 bg-gradient-to-r from-transparent via-red to-transparent" />
      <p data-r class="mt-7 max-w-[36rem] text-base text-mute md:text-lg">
        Access top trading liquidity and advanced tools across forex, metals, commodities, stocks, indices and crypto, all from one account.
      </p>
      <div data-r class="mt-8 grid w-full max-w-sm grid-cols-2 gap-2.5 sm:flex sm:w-auto sm:max-w-none sm:justify-center sm:gap-3">
        <a v-magnetic :href="SIGNUP" class="btn btn-gold !px-4 sm:min-h-14 sm:!px-8 sm:text-base">Start Trading <PhArrowRight :size="18" class="hidden sm:block" /></a>
        <a :href="SIGNUP" class="btn btn-ghost !px-4 backdrop-blur-sm sm:min-h-14 sm:!px-8 sm:text-base">Try Demo Account</a>
      </div>
    </div>

    <dl data-r class="relative mb-8 mt-10 grid w-[min(100%-2.25rem,36rem)] grid-cols-3 divide-x divide-line rounded-full border border-line bg-ink/70 py-3 backdrop-blur-md md:mb-12">
      <div v-for="f in FACTS" :key="f.l" class="px-2">
        <dt class="text-[0.68rem] leading-tight text-dim md:text-xs">{{ f.l }}</dt>
        <dd class="num mt-1 text-lg text-fg md:text-xl">{{ f.v }} <span v-if="f.u" class="text-xs text-mute">{{ f.u }}</span></dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.glow { background: radial-gradient(closest-side, rgb(232 238 233 / 0.05), rgb(232 238 233 / 0.015) 55%, transparent); }
.grid-bg {
  background-image: linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 60% 55% at 50% 35%, #000 15%, transparent 75%);
  opacity: 0.45;
}
.vtext { writing-mode: vertical-rl; rotate: 180deg; font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.34em; text-transform: uppercase; color: var(--color-dim); white-space: nowrap; }
.vtext.right { rotate: none; }
@media (prefers-reduced-transparency: reduce) { dl { background: var(--color-ink-2); backdrop-filter: none; } }
</style>

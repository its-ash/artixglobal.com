<script setup lang="ts">
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { PhLightning, PhShieldCheck, PhCrosshair, PhArrowUpRight } from '@phosphor-icons/vue'

const root = ref<HTMLElement | null>(null)

const PILLARS = [
  { icon: PhLightning, t: 'Speed', d: 'Ultra-fast order execution on nTrader, with deep liquidity through a FIX API bridge.' },
  { icon: PhShieldCheck, t: 'Reliability', d: 'A secure, scalable platform with safeguarded client funds and clear risk policies.' },
  { icon: PhCrosshair, t: 'Precision', d: 'Raw spreads from 0.0 pips and advanced charting, exactly where it matters.' }
]

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  const split = SplitText.create(q('[data-say]'), { type: 'words' })
  gsap.fromTo(q('[data-vline]'), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 25%', scrub: true } })
  gsap.fromTo(split.words, { opacity: 0.16 }, {
    opacity: 1, stagger: 0.08, ease: 'none',
    scrollTrigger: { trigger: q('[data-say]')[0], start: 'top 80%', end: 'bottom 50%', scrub: 0.6 }
  })
  q('[data-p]').forEach((p) => {
    gsap.timeline({ scrollTrigger: { trigger: p, start: 'top 88%', once: true } })
      .from(p.querySelector('[data-rule]'), { scaleX: 0, transformOrigin: 'center', duration: 1.2, ease: 'expo.inOut' })
      .from(p.querySelectorAll('[data-in]'), { y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.9 }, 0.25)
  })
  return () => split.revert()
})
</script>

<template>
  <section ref="root" data-scene="1" class="relative py-24 text-center md:py-40" aria-labelledby="why-h">
    <SideLabel n="01" text="Why Artix" />
    <div class="wrap flex flex-col items-center">
      <h2 id="why-h" class="eyebrow">Why trade with Artix</h2>
      <div class="my-8 h-20 w-px bg-line md:h-28"><div data-vline class="h-full w-full origin-top bg-gold" /></div>
      <p data-say class="display max-w-5xl text-[length:var(--text-h3)] leading-[1.12] md:text-[clamp(2rem,1rem+2.6vw,3.6rem)]">
        Join professional traders and access forex, shares and indices with a broker built on
        <em class="text-red-2">proven industry experience</em> and a passion for innovation.
      </p>
      <p class="mt-10 max-w-2xl text-mute">
        At Artix, we created a trading environment for real-world performance. Whether you are new to the markets or you scale advanced strategies, the nTrader platform gives you speed, reliability and precision.
      </p>
      <a :href="`${ORIGIN}/about-us/`" class="group mt-6 inline-flex min-h-11 items-center gap-2 text-gold-2">
        About Artix Global
        <PhArrowUpRight :size="16" class="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>

    <ul class="wrap mt-20 grid max-w-6xl gap-14 md:mt-28 md:grid-cols-3 md:gap-8">
      <li v-for="(p, i) in PILLARS" :key="p.t" data-p class="flex flex-col items-center">
        <span data-in class="num font-mono text-xs text-dim">0{{ i + 1 }}</span>
        <div data-rule class="mt-4 h-px w-full max-w-[14rem] bg-line-strong" />
        <span data-in class="mt-8 grid size-14 place-items-center rounded-full border border-line-strong text-gold"><component :is="p.icon" :size="24" /></span>
        <h3 data-in class="display mt-6 text-4xl">{{ p.t }}</h3>
        <p data-in class="mt-3 max-w-xs text-mute">{{ p.d }}</p>
      </li>
    </ul>
  </section>
</template>

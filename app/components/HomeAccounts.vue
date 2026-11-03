<script setup lang="ts">
import gsap from 'gsap'
import { PhCheck, PhArrowRight } from '@phosphor-icons/vue'
import { fmtUsd } from '~/utils/site'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  q('[data-amt]').forEach((n) => {
    const to = Number(n.dataset.amt)
    const o = { v: 0 }
    gsap.to(o, { v: to, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: n, start: 'top 90%', once: true }, onUpdate: () => { n.textContent = fmtUsd(Math.round(o.v)) } })
  })
  gsap.from(q('[data-head] > *'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  const cards = q('[data-acc]')
  cards.forEach((c, i) => {
    const next = cards[i + 1]
    if (!next) return
    gsap.to(c.firstElementChild, {
      scale: 0.9, yPercent: -4, opacity: 0.35, ease: 'none',
      scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true }
    })
  })
})
</script>

<template>
  <section ref="root" data-scene="3" class="relative py-24 md:py-36" aria-labelledby="ac-h">
    <SideLabel n="04" text="Account types" />
    <div data-head class="wrap flex flex-col items-center text-center">
      <p class="eyebrow">Account types</p>
      <h2 id="ac-h" class="display mt-4 max-w-[14ch] text-[length:var(--text-h2)]">An account for <em class="text-red-2">every trader</em></h2>
      <p class="mt-5 max-w-xl text-mute">Trading accounts for every type of trader, from beginners to professionals, with sharp pricing across forex, CFDs, crypto and more.</p>
      <div class="mt-10 h-16 w-px bg-gradient-to-b from-gold to-transparent" />
    </div>

    <ol class="wrap mt-6 max-w-4xl">
      <li v-for="(a, i) in ACCOUNTS" :key="a.name" data-acc class="sticky pb-6" :style="{ top: `calc(5.5rem + ${i} * 1.1rem)` }">
        <article v-spot class="card spot origin-top bg-ink-2 p-6 text-center shadow-[0_-24px_60px_-20px_rgb(0_0_0/.8)] md:p-10">
          <div class="flex items-center justify-center gap-3">
            <span class="num font-mono text-xs text-dim">0{{ i + 1 }}</span>
            <span class="h-px w-8 bg-line-strong" />
            <span class="rounded-full border border-gold/30 px-2.5 py-1 font-mono text-[0.65rem] tracking-wider text-gold uppercase">{{ a.tag }}</span>
          </div>
          <h3 class="display mt-5 text-4xl md:text-5xl">{{ a.name }}</h3>
          <p class="mt-6 text-xs text-dim">Minimum deposit</p>
          <p class="num display mt-1 text-[clamp(3rem,2rem+4vw,5rem)] leading-none text-gold-2" :data-amt="a.deposit">{{ fmtUsd(a.deposit) }}</p>
          <div class="hairline mx-auto my-7 max-w-md" />
          <ul class="mx-auto grid max-w-2xl gap-x-6 gap-y-2.5 text-[0.92rem] text-mute sm:grid-cols-2">
            <li v-for="f in a.features" :key="f" class="flex items-center justify-center gap-2 sm:justify-start sm:text-left">
              <PhCheck :size="15" weight="bold" class="shrink-0 text-gold" />{{ f }}
            </li>
          </ul>
          <a :href="SIGNUP" class="btn btn-gold mt-8">Open {{ a.name }} <PhArrowRight :size="16" /></a>
        </article>
      </li>
    </ol>
  </section>
</template>

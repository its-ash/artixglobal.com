<script setup lang="ts">
import gsap from 'gsap'
import { PhCheck, PhArrowRight } from '@phosphor-icons/vue'
import { SIGNUP, fmtUsd } from '~/utils/site'
import { TIERS } from '~/utils/pages/accounts'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  gsap.from(q('[data-head] > *'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  gsap.from(q('[data-tier]'), { y: 90, rotateX: -14, autoAlpha: 0, stagger: 0.1, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: q('[data-grid]')[0], start: 'top 85%', once: true } })
  gsap.from(q('[data-li]'), { x: -12, autoAlpha: 0, stagger: 0.025, duration: 0.6, delay: 0.4, scrollTrigger: { trigger: q('[data-grid]')[0], start: 'top 85%', once: true } })
  q('[data-amt]').forEach((n) => {
    const o = { v: 0 }
    gsap.to(o, { v: Number(n.dataset.amt), duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: n, start: 'top 90%', once: true }, onUpdate: () => { n.textContent = fmtUsd(Math.round(o.v)) } })
  })
})
</script>

<template>
  <section ref="root" data-scene="3" class="relative py-24 md:py-32" aria-labelledby="tiers-h">
    <SideLabel n="01" text="Account types" />
    <NtHead id="tiers-h" eyebrow="Four accounts" title="Pick the account that fits" em="your trading" />
    <ol data-grid class="wrap mt-6 grid gap-4 [perspective:1600px] md:grid-cols-2 xl:grid-cols-4">
      <li v-for="(t, i) in TIERS" :key="t.id" data-tier class="origin-bottom">
        <article v-spot class="card spot flex h-full flex-col p-6 md:p-7" :aria-labelledby="`tier-${t.id}`">
          <span class="edge pointer-events-none absolute inset-x-0 top-0 h-px" aria-hidden="true" />
          <div class="flex items-center justify-between">
            <span class="num font-mono text-xs text-red-2">0{{ i + 1 }}</span>
            <span class="flex gap-1" role="img" :aria-label="`Tier ${i + 1} of ${TIERS.length}`">
              <span v-for="k in TIERS.length" :key="k" class="h-1.5 w-4 rounded-full" :class="k <= i + 1 ? 'bg-gold' : 'bg-line-strong'" />
            </span>
          </div>
          <h3 :id="`tier-${t.id}`" class="display mt-6 text-4xl">{{ t.name }}</h3>
          <p class="mt-6 font-mono text-[0.68rem] tracking-[0.16em] text-dim uppercase">Minimum deposit</p>
          <p class="num display mt-2 text-5xl leading-none text-gold-2" :data-amt="t.deposit">{{ fmtUsd(t.deposit) }}</p>
          <a :href="SIGNUP" class="btn btn-gold mt-6 w-full" :aria-label="`Open ${t.name} account`">Open Account <PhArrowRight :size="16" /></a>
          <ul class="mt-6 border-t border-line pt-2">
            <li v-for="s in t.specs" :key="s" data-li class="flex min-h-11 items-start gap-3 border-b border-line py-2.5 text-[0.92rem] text-fg/90 last:border-b-0">
              <PhCheck :size="14" weight="bold" class="mt-1 shrink-0 text-gold" aria-hidden="true" />{{ s }}
            </li>
          </ul>
        </article>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.edge { background: linear-gradient(90deg, transparent, var(--color-gold) 30%, var(--color-red) 70%, transparent); opacity: 0.7; }
</style>

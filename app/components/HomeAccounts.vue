<script setup lang="ts">
import gsap from 'gsap'
import { PhCheck, PhArrowRight } from '@phosphor-icons/vue'
import { fmtUsd } from '~/utils/site'

const root = ref<HTMLElement | null>(null)
const spec = (f: string) => {
  const [k, ...v] = f.split(': ')
  return v.length ? { k: k!, v: v.join(': ') } : { k: '', v: f }
}

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

    <ol class="wrap mt-6 max-w-5xl">
      <li v-for="(a, i) in ACCOUNTS" :key="a.name" data-acc class="sticky pb-6" :style="{ top: `calc(5.5rem + ${i} * 1.1rem)` }">
        <article v-spot class="card spot grid origin-top overflow-hidden bg-ink-2 shadow-[0_-24px_60px_-20px_rgb(0_0_0/.8)] md:grid-cols-[1.05fr_1fr]">
          <span class="edge pointer-events-none absolute inset-x-0 top-0 h-px" aria-hidden="true" />

          <div class="relative flex flex-col items-center p-6 text-center md:items-start md:p-10 md:text-left">
            <span class="ghost num display pointer-events-none absolute -right-2 -top-6 select-none text-[10rem] leading-none md:right-6 md:text-[13rem]" aria-hidden="true">0{{ i + 1 }}</span>

            <div class="relative flex items-center gap-3">
              <span class="rounded-full border border-gold/30 px-2.5 py-1 font-mono text-[0.65rem] tracking-wider text-gold uppercase">{{ a.tag }}</span>
              <span class="flex gap-1" role="img" :aria-label="`Tier ${i + 1} of ${ACCOUNTS.length}`">
                <span v-for="k in ACCOUNTS.length" :key="k" class="h-1.5 w-5 rounded-full" :class="k <= i + 1 ? 'bg-gold' : 'bg-line-strong'" />
              </span>
            </div>

            <h3 class="display relative mt-6 text-5xl md:text-6xl">{{ a.name }}</h3>

            <div class="relative mt-auto w-full pt-10">
              <p class="font-mono text-[0.68rem] tracking-[0.16em] text-dim uppercase">Minimum deposit</p>
              <p class="num display mt-2 text-[clamp(3rem,2rem+4vw,5rem)] leading-none text-gold-2" :data-amt="a.deposit">{{ fmtUsd(a.deposit) }}</p>
              <a :href="SIGNUP" class="btn btn-gold mt-8 w-full sm:w-auto">Open {{ a.name }} <PhArrowRight :size="16" /></a>
            </div>
          </div>

          <dl class="relative border-t border-line bg-ink/40 px-6 py-4 md:border-l md:border-t-0 md:px-8 md:py-6">
            <div v-for="f in a.features.map(spec)" :key="f.k + f.v" class="flex min-h-12 items-center gap-4 border-b border-line py-3 text-left text-[0.92rem] last:border-b-0">
              <dt class="flex w-24 shrink-0 items-center gap-2 font-mono text-[0.68rem] tracking-[0.12em] text-dim uppercase">
                <PhCheck v-if="!f.k" :size="14" weight="bold" class="text-gold" />
                <span v-else>{{ f.k }}</span>
                <span v-if="!f.k" class="sr-only">Included</span>
              </dt>
              <dd class="text-fg/90">{{ f.v }}</dd>
            </div>
          </dl>
        </article>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.edge { background: linear-gradient(90deg, transparent, var(--color-gold) 30%, var(--color-red) 70%, transparent); opacity: 0.7; }
.ghost { color: transparent; -webkit-text-stroke: 1px color-mix(in oklab, var(--color-fg) 9%, transparent); }
</style>

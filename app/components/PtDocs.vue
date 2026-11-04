<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowUpRight, PhEnvelopeSimple, PhFilePdf, PhWarning } from '@phosphor-icons/vue'
import { DOCS, EMAIL, RISK } from '~/utils/site'
import { LEGAL } from '~/utils/pages/partners'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  gsap.from(q('[data-head] > *'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  gsap.from(q('[data-doc]'), { y: 30, autoAlpha: 0, stagger: 0.07, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: q('[data-list]')[0], start: 'top 82%', once: true } })
  gsap.from(q('[data-aside] > *'), { y: 30, autoAlpha: 0, stagger: 0.1, duration: 1, scrollTrigger: { trigger: q('[data-aside]')[0], start: 'top 85%', once: true } })
})
</script>

<template>
  <section ref="root" data-scene="2" class="relative pb-24 md:pb-36" aria-labelledby="lg-h">
    <SideLabel n="01" text="Documents" />
    <PtHead id="lg-h" :copy="LEGAL.head" />
    <div class="wrap mt-6 grid max-w-6xl gap-8 lg:grid-cols-[1fr_22rem]">
      <ol data-list class="flex flex-col">
        <li v-for="(d, i) in DOCS" :key="d.href" data-doc class="border-b border-line first:border-t">
          <a
            :href="d.href" target="_blank" rel="noopener" :aria-label="`${d.label} (PDF, opens in a new tab)`"
            class="group flex min-h-20 items-center gap-5 py-5 md:gap-8"
          >
            <span class="num w-8 shrink-0 font-mono text-sm text-red-2">{{ String(i + 1).padStart(2, '0') }}</span>
            <PhFilePdf :size="26" weight="duotone" class="shrink-0 text-gold" />
            <span class="display flex-1 text-2xl transition-colors duration-300 group-hover:text-gold-2 md:text-3xl">{{ d.label }}</span>
            <span class="hidden font-mono text-xs tracking-[0.2em] text-dim uppercase sm:block">PDF</span>
            <span class="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-mute transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-on-gold">
              <PhArrowUpRight :size="16" weight="bold" />
            </span>
          </a>
        </li>
      </ol>
      <aside data-aside class="flex flex-col gap-5">
        <div class="card p-7">
          <PhEnvelopeSimple :size="26" weight="duotone" class="text-gold" />
          <h3 class="display mt-5 text-3xl">{{ LEGAL.support.title }}</h3>
          <p class="mt-3 text-mute">
            {{ LEGAL.support.body }}
            <a :href="`mailto:${EMAIL}`" class="text-gold-2 underline decoration-gold/40 underline-offset-4 hover:decoration-gold">{{ EMAIL }}</a>.
          </p>
        </div>
        <div class="card border-red/30 p-7">
          <PhWarning :size="26" weight="duotone" class="text-red-2" />
          <h3 class="mt-5 font-mono text-xs tracking-[0.2em] text-red-2 uppercase">{{ LEGAL.risk }}</h3>
          <p class="mt-3 text-sm text-mute">{{ RISK }}</p>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { PhCheck, PhArrowRight } from '@phosphor-icons/vue'
import { SIGNUP, fmtUsd } from '~/utils/site'
import { TIERS, COMPARE } from '~/utils/pages/accounts'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  gsap.from(q('[data-head] > *'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  gsap.from(q('[data-box]'), { y: 60, autoAlpha: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: q('[data-box]')[0], start: 'top 88%', once: true } })
  gsap.from(q('tbody tr'), { y: 16, autoAlpha: 0, stagger: 0.05, duration: 0.7, scrollTrigger: { trigger: q('[data-box]')[0], start: 'top 75%', once: true } })
})
</script>

<template>
  <section ref="root" data-scene="2" class="relative py-24 md:py-32" aria-labelledby="cmp-h">
    <SideLabel n="02" text="Compare" side="end" />
    <NtHead id="cmp-h" eyebrow="Side by side" title="Compare every" em="account" />
    <div class="wrap mt-6 max-w-6xl">
      <div data-box class="card bg-ink-2/90">
        <div class="overflow-x-auto" role="region" aria-labelledby="cmp-h" tabindex="0">
          <table class="w-full min-w-[46rem] border-collapse text-left text-[0.92rem]">
            <caption class="sr-only">Artix Global account types compared</caption>
            <thead>
              <tr class="border-b border-line-strong">
                <th scope="col" class="sticky left-0 z-10 bg-ink-2 p-5 align-bottom font-mono text-[0.68rem] font-normal tracking-[0.16em] text-dim uppercase">Account</th>
                <th v-for="t in TIERS" :key="t.id" scope="col" class="p-5 align-bottom font-normal">
                  <span class="display block text-2xl text-fg md:text-3xl">{{ t.name }}</span>
                  <span class="mt-2 block font-mono text-[0.65rem] tracking-[0.14em] text-dim uppercase">Min. deposit</span>
                  <span class="num display block text-3xl text-gold-2">{{ fmtUsd(t.deposit) }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in COMPARE" :key="r.k" class="border-b border-line">
                <th scope="row" class="sticky left-0 z-10 bg-ink-2 px-5 py-4 font-mono text-[0.7rem] font-normal tracking-[0.12em] text-dim uppercase">{{ r.k }}</th>
                <td v-for="t in TIERS" :key="t.id" class="px-5 py-4 text-fg/90">
                  <span v-if="r.v[t.id] === true" class="inline-flex items-center gap-2 text-gold"><PhCheck :size="16" weight="bold" aria-hidden="true" /><span class="sr-only">Included</span></span>
                  <span v-else-if="r.v[t.id] === false" class="text-dim">Not listed</span>
                  <template v-else>{{ r.v[t.id] }}</template>
                </td>
              </tr>
              <tr>
                <th scope="row" class="sticky left-0 z-10 bg-ink-2 p-5"><span class="sr-only">Open account</span></th>
                <td v-for="t in TIERS" :key="t.id" class="p-5">
                  <a :href="SIGNUP" class="btn btn-ghost" :aria-label="`Open ${t.name} account`">Open <PhArrowRight :size="14" /></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

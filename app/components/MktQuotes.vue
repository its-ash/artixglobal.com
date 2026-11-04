<script setup lang="ts">
import gsap from 'gsap'
import { PhCaretUp, PhCaretDown } from '@phosphor-icons/vue'
import type { Quote } from '~/composables/useFeed'

const props = defineProps<{ symbols: string[], name: string }>()
const root = ref<HTMLElement | null>(null)
const feed = useFeed()
const rows = computed(() => props.symbols.map(s => feed.value.find(q => q.sym === s)).filter((q): q is Quote => !!q))
const fmt = (q: Quote) => q.px.toLocaleString('en-US', { minimumFractionDigits: q.dp, maximumFractionDigits: q.dp })

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  gsap.from(el.querySelectorAll('[data-row]'), { y: 18, autoAlpha: 0, stagger: 0.07, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
})
</script>

<template>
  <section v-if="rows.length" ref="root" data-scene="0" class="relative pb-16 md:pb-24" aria-labelledby="mq-h">
    <div class="wrap flex justify-center">
      <div class="card w-full max-w-2xl">
        <div class="flex items-center justify-between gap-4 border-b border-line px-5 py-4 md:px-6">
          <h2 id="mq-h" class="font-mono text-xs tracking-[0.14em] text-mute uppercase">{{ name }} prices</h2>
          <span class="rounded-full border border-line-strong px-3 py-1 font-mono text-[0.68rem] tracking-[0.14em] text-dim uppercase">Indicative</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[22rem] text-left">
            <caption class="sr-only">Indicative {{ name }} prices for display only. These are not live quotes.</caption>
            <thead>
              <tr class="font-mono text-[0.68rem] tracking-[0.14em] text-dim uppercase">
                <th scope="col" class="px-5 py-3 font-normal md:px-6">Instrument</th>
                <th scope="col" class="px-5 py-3 text-right font-normal md:px-6">Price</th>
                <th scope="col" class="px-5 py-3 text-right font-normal md:px-6">Change</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="q in rows" :key="q.sym" data-row class="border-t border-line">
                <th scope="row" class="px-5 py-4 font-mono text-sm font-normal text-fg md:px-6">{{ q.sym }}</th>
                <td class="num px-5 py-4 text-right transition-colors duration-500 md:px-6" :class="q.dir > 0 ? 'text-up' : q.dir < 0 ? 'text-down' : 'text-fg'">{{ fmt(q) }}</td>
                <td class="num px-5 py-4 text-right text-sm md:px-6" :class="q.chg >= 0 ? 'text-up' : 'text-down'">
                  <span class="inline-flex items-center gap-1">
                    <component :is="q.chg >= 0 ? PhCaretUp : PhCaretDown" :size="11" weight="fill" aria-hidden="true" />
                    <span class="sr-only">{{ q.chg >= 0 ? 'Up' : 'Down' }}</span>{{ Math.abs(q.chg).toFixed(2) }}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="border-t border-line px-5 py-3 text-xs text-dim md:px-6">Indicative prices for display only. Not live quotes.</p>
      </div>
    </div>
  </section>
</template>

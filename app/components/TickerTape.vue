<script setup lang="ts">
import { PhCaretUp, PhCaretDown } from '@phosphor-icons/vue'
import type { Quote } from '~/composables/useFeed'

const quotes = useFeed()
const fmt = (q: Quote) => q.px.toLocaleString('en-US', { minimumFractionDigits: q.dp, maximumFractionDigits: q.dp })
</script>

<template>
  <section id="ticker" class="relative border-y border-line bg-ink-2/60" aria-label="Indicative market prices">
    <div class="flex items-stretch">
      <p class="z-10 flex shrink-0 items-center border-r border-line bg-ink-2 px-3 font-mono text-[0.62rem] md:px-5 md:text-[0.7rem] tracking-[0.14em] text-dim uppercase md:flex">
        Indicative
      </p>
      <div class="fade relative flex-1 overflow-hidden">
        <div class="track flex w-max">
          <ul v-for="k in 2" :key="k" class="flex shrink-0" :aria-hidden="k === 2">
            <li v-for="q in quotes" :key="q.sym" class="flex h-14 items-center gap-3 border-r border-line px-6">
              <span class="font-mono text-[0.8rem] text-mute">{{ q.sym }}</span>
              <span class="num text-[0.95rem] transition-colors duration-500" :class="q.dir > 0 ? 'text-up' : q.dir < 0 ? 'text-down' : 'text-fg'">{{ fmt(q) }}</span>
              <span class="num flex items-center text-xs" :class="q.chg >= 0 ? 'text-up' : 'text-down'">
                <component :is="q.chg >= 0 ? PhCaretUp : PhCaretDown" :size="11" weight="fill" />{{ Math.abs(q.chg).toFixed(2) }}%
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p class="sr-only">Prices are indicative for display only and are not live quotes.</p>
  </section>
</template>

<style scoped>
.track { animation: marquee 60s linear infinite; }
.fade:hover .track { animation-play-state: paused; }
.fade { mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); }
@keyframes marquee { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .track { animation: none; } .fade { overflow-x: auto; } }
</style>

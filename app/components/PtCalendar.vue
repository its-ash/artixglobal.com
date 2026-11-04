<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowUpRight, PhCalendarDots } from '@phosphor-icons/vue'
import { CAL } from '~/utils/pages/partners'

const root = ref<HTMLElement | null>(null)
const box = ref<HTMLElement | null>(null)
const seen = useInView(box, { rootMargin: '400px' })
const load = ref(false)
const ready = ref(false)
const src = `${CAL.widget.src}#${encodeURIComponent(JSON.stringify(CAL.widget.cfg))}`

watch(seen, (v) => { if (v) load.value = true })

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  gsap.from(q('[data-head] > *'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  gsap.from(q('[data-frame]'), { y: 50, autoAlpha: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: q('[data-frame]')[0], start: 'top 85%', once: true } })
})
</script>

<template>
  <section ref="root" data-scene="1" class="relative pb-24 md:pb-36" aria-labelledby="cal-h">
    <SideLabel n="01" text="Calendar" />
    <PtHead id="cal-h" :copy="CAL.head" />
    <div class="wrap mt-6 max-w-6xl">
      <div ref="box" data-frame class="card relative p-2 md:p-4" :style="{ minHeight: `${CAL.widget.height + 32}px` }">
        <div v-if="!ready" class="absolute inset-0 grid place-items-center text-center text-mute" aria-hidden="true">
          <div class="flex flex-col items-center gap-4">
            <PhCalendarDots :size="40" weight="duotone" class="animate-pulse text-gold" />
            <span class="font-mono text-xs tracking-[0.2em] uppercase">Loading calendar</span>
          </div>
        </div>
        <iframe
          v-if="load"
          :src="src"
          :height="CAL.widget.height"
          width="100%"
          title="Economic calendar by TradingView"
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          class="relative block w-full border-0 transition-opacity duration-500"
          :class="ready ? 'opacity-100' : 'opacity-0'"
          @load="ready = true"
        />
      </div>
      <p class="mt-5 flex flex-col items-center justify-between gap-3 text-sm text-dim md:flex-row">
        <span>Event data is provided by TradingView.</span>
        <a :href="CAL.widget.link" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-gold-2 underline decoration-gold/40 underline-offset-4 hover:decoration-gold">
          {{ CAL.widget.credit }} <PhArrowUpRight :size="14" />
        </a>
      </p>
    </div>
  </section>
</template>

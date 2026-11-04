<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowRight, PhCheck } from '@phosphor-icons/vue'
import { SIGNUP } from '~/utils/site'
import { PT_ACCOUNTS, type PtHeadCopy } from '~/utils/pages/partners'

const props = defineProps<{ id: string, n: string, label: string, scene: number, head: PtHeadCopy }>()
const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  gsap.from(q('[data-head] > *'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  gsap.from(q('[data-acc]'), { y: 60, autoAlpha: 0, stagger: 0.12, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: q('[data-list]')[0], start: 'top 80%', once: true } })
})
</script>

<template>
  <section ref="root" :data-scene="props.scene" class="relative py-24 md:py-36" :aria-labelledby="id">
    <SideLabel :n="n" :text="label" side="end" />
    <PtHead :id="id" :copy="head" />
    <ul data-list class="wrap mt-6 grid max-w-6xl gap-5 md:grid-cols-3">
      <li v-for="(a, i) in PT_ACCOUNTS" :key="a.name" v-tilt="4" data-acc class="card flex flex-col p-8" :class="{ 'border-gold/50': i === 1 }">
        <h3 class="font-mono text-xs tracking-[0.2em] text-gold uppercase">{{ a.name }}</h3>
        <p class="display num mt-6 text-6xl">{{ a.deposit }}</p>
        <p class="mt-1 text-sm text-dim">First deposit</p>
        <p class="mt-6 border-t border-line pt-6 text-sm text-mute">{{ a.markets }}</p>
        <ul class="mt-6 flex flex-1 flex-col gap-3">
          <li v-for="f in a.features" :key="f" class="flex items-center gap-3 text-sm">
            <PhCheck :size="16" weight="bold" class="shrink-0 text-gold" />{{ f }}
          </li>
        </ul>
        <a :href="SIGNUP" class="btn mt-8" :class="i === 1 ? 'btn-gold' : 'btn-ghost'">Open Account <PhArrowRight :size="16" /></a>
      </li>
    </ul>
  </section>
</template>

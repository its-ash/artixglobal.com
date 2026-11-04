<script setup lang="ts">
import type { Component } from 'vue'
import gsap from 'gsap'
import BrandWindows from '~/components/icons/BrandWindows.vue'
import BrandApple from '~/components/icons/BrandApple.vue'
import BrandAndroid from '~/components/icons/BrandAndroid.vue'
import type { Os } from '~/utils/pages/ntrader'

const props = withDefaults(defineProps<{ id: string, n: string, label: string, eyebrow: string, title: string, em?: string, lead?: string, os: Os[], img?: { src: string, w: number, h: number, alt: string }, scene?: number }>(), { scene: 2 })
const ICON: Record<Os['id'], Component> = { windows: BrandWindows, apple: BrandApple, android: BrandAndroid }
const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  gsap.from(q('[data-head] > *'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  gsap.from(q('[data-os]'), { x: -50, autoAlpha: 0, stagger: 0.12, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: q('[data-list]')[0], start: 'top 85%', once: true } })
  gsap.from(q('[data-bar]'), { scaleX: 0, transformOrigin: 'left', stagger: 0.12, duration: 1.2, ease: 'expo.inOut', scrollTrigger: { trigger: q('[data-list]')[0], start: 'top 85%', once: true } })
  if (q('[data-pic]').length) gsap.fromTo(q('[data-pic]'), { yPercent: 8, rotate: 3 }, { yPercent: -8, rotate: -2, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
})
</script>

<template>
  <section ref="root" :data-scene="props.scene" class="relative py-24 md:py-36" :aria-labelledby="id">
    <SideLabel :n="n" :text="label" side="end" />
    <NtHead :id="id" :eyebrow="eyebrow" :title="title" :em="em" :lead="lead" />
    <div class="wrap mt-6 grid max-w-6xl items-center gap-12" :class="{ 'lg:grid-cols-[1.1fr_1fr]': img }">
      <ul data-list class="mx-auto flex w-full max-w-2xl flex-col gap-3">
        <li v-for="o in os" :key="o.id" data-os class="card flex min-h-24 items-center gap-5 p-5 md:p-6">
          <span class="grid size-14 shrink-0 place-items-center rounded-2xl border border-line-strong bg-ink text-fg">
            <component :is="ICON[o.id]" :size="26" />
          </span>
          <span class="min-w-0 flex-1">
            <span class="display block text-3xl">{{ o.name }}</span>
            <span class="mt-1 block text-sm text-mute">{{ o.note }}</span>
          </span>
          <span data-bar class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-gold via-red/60 to-transparent" aria-hidden="true" />
        </li>
      </ul>
      <div v-if="img" class="relative mx-auto w-full max-w-md">
        <img data-pic :src="img.src" :width="img.w" :height="img.h" :alt="img.alt" loading="lazy" decoding="async" class="h-auto w-full rounded-[1.25rem] border border-line">
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import type { PtFeature, PtHeadCopy } from '~/utils/pages/partners'

const props = defineProps<{ id: string, n: string, label: string, scene: number, head: PtHeadCopy, items: PtFeature[] }>()
const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  gsap.from(q('[data-head] > *'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  gsap.from(q('[data-f]'), { y: 40, autoAlpha: 0, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: q('[data-grid]')[0], start: 'top 82%', once: true } })
  gsap.from(q('[data-ic]'), { scale: 0, rotate: -90, stagger: 0.08, duration: 0.8, ease: 'back.out(2)', delay: 0.2, scrollTrigger: { trigger: q('[data-grid]')[0], start: 'top 82%', once: true } })
})
</script>

<template>
  <section ref="root" :data-scene="props.scene" class="relative border-y border-line bg-ink/40 py-24 md:py-36" :aria-labelledby="id">
    <SideLabel :n="n" :text="label" side="end" />
    <PtHead :id="id" :copy="head" />
    <ul data-grid class="wrap mt-6 flex max-w-6xl flex-wrap justify-center gap-4 md:gap-5">
      <li
        v-for="f in items" :key="f.title" v-spot data-f
        class="card spot flex w-full flex-col items-center p-8 text-center sm:w-[calc(50%-0.5rem)] md:items-start md:text-left lg:w-[calc(33.333%-0.85rem)]"
      >
        <span data-ic class="grid size-12 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold">
          <component :is="f.icon" :size="22" weight="duotone" />
        </span>
        <h3 class="display mt-6 text-3xl">{{ f.title }}</h3>
        <p class="mt-3 text-mute">{{ f.body }}</p>
      </li>
    </ul>
  </section>
</template>

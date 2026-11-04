<script setup lang="ts">
import gsap from 'gsap'
import type { PtHeadCopy } from '~/utils/pages/partners'

const props = defineProps<{ id: string, n: string, label: string, scene: number, head: PtHeadCopy, body: string[], img: { src: string, w: number, h: number, alt?: string }, flip?: boolean }>()
const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  gsap.from(q('[data-head] > *'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  gsap.from(q('[data-p]'), { y: 24, autoAlpha: 0, stagger: 0.1, duration: 0.9, scrollTrigger: { trigger: q('[data-body]')[0], start: 'top 80%', once: true } })
  gsap.fromTo(q('[data-img]'), { scale: 0.9, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: q('[data-body]')[0], start: 'top 80%', once: true } })
  gsap.fromTo(q('[data-img] img'), { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
})
</script>

<template>
  <section ref="root" :data-scene="props.scene" class="relative py-24 md:py-36" :aria-labelledby="id">
    <SideLabel :n="n" :text="label" />
    <PtHead :id="id" :copy="head" />
    <div data-body class="wrap mt-6 grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
      <div data-img class="card aspect-square p-6 md:p-10" :class="{ 'md:order-2': flip }">
        <img :src="img.src" :width="img.w" :height="img.h" :alt="img.alt ?? ''" loading="lazy" decoding="async" class="size-full object-contain">
      </div>
      <div class="flex flex-col gap-5 text-center md:text-left">
        <p v-for="(t, i) in body" :key="i" data-p :class="i ? 'text-mute' : 'text-xl text-fg md:text-2xl'">{{ t }}</p>
      </div>
    </div>
  </section>
</template>

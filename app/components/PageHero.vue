<script setup lang="ts">
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

const props = withDefaults(defineProps<{ eyebrow: string, title: string, em?: string, lead?: string, scene?: number, label?: string }>(), { scene: 0 })
const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  const split = SplitText.create(q('[data-h]'), { type: 'lines,words', mask: 'lines', linesClass: 'pb-[0.06em]' })
  gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 })
    .from(q('[data-k]'), { y: 16, autoAlpha: 0, duration: 0.8 }, 0)
    .from(split.words, { yPercent: 115, duration: 1.2, stagger: 0.04 }, 0.05)
    .from(q('[data-r]'), { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.35)
    .from(q('[data-rule]'), { scaleY: 0, transformOrigin: 'top', duration: 1.2, ease: 'expo.inOut' }, 0.5)
  return () => split.revert()
})
</script>

<template>
  <section ref="root" :data-scene="props.scene" class="relative pb-10 pt-32 text-center md:pb-14 md:pt-44" aria-labelledby="page-h">
    <SideLabel v-if="label" :text="label" />
    <div class="wrap flex flex-col items-center">
      <p data-k class="eyebrow flex items-center gap-3">
        <span class="size-1.5 rounded-full bg-gold" />{{ eyebrow }}<span class="size-1.5 rounded-full bg-gold" />
      </p>
      <h1 id="page-h" data-h class="display mt-5 max-w-[16ch] text-[clamp(2.75rem,1.6rem+4.6vw,6.5rem)]">
        {{ title }}<template v-if="em"> <em class="text-red-2">{{ em }}</em></template>
      </h1>
      <p v-if="lead" data-r class="mt-6 max-w-2xl text-mute md:text-lg">{{ lead }}</p>
      <div data-r class="mt-8 flex flex-wrap justify-center gap-3"><slot /></div>
      <div data-rule class="mt-10 h-16 w-px bg-gradient-to-b from-gold to-transparent" />
    </div>
  </section>
</template>

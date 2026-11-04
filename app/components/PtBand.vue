<script setup lang="ts">
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { PhArrowRight } from '@phosphor-icons/vue'

const props = defineProps<{ id: string, n: string, label: string, scene: number, eyebrow: string, title: string, em?: string, lead: string, cta: string, href: string }>()
const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  const split = SplitText.create(q('[data-h]'), { type: 'lines,words', mask: 'lines', linesClass: 'pb-[0.06em]' })
  gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 70%', once: true } })
    .from(split.words, { yPercent: 115, duration: 1.2, stagger: 0.04, ease: 'expo.out' })
    .from(q('[data-r]'), { y: 24, autoAlpha: 0, stagger: 0.08, duration: 1 }, 0.3)
  gsap.fromTo(q('[data-mark]'), { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
  return () => split.revert()
})
</script>

<template>
  <section ref="root" :data-scene="props.scene" class="relative overflow-hidden py-24 text-center md:py-32" :aria-labelledby="id">
    <SideLabel :n="n" :text="label" />
    <span data-mark class="display pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[26vw] leading-none text-fg/[0.03]" aria-hidden="true">{{ em || title }}</span>
    <div class="wrap relative flex flex-col items-center">
      <p data-r class="eyebrow">{{ eyebrow }}</p>
      <div data-r class="mt-6 h-12 w-px bg-gradient-to-b from-transparent to-gold" />
      <h2 :id="id" data-h class="display mt-6 max-w-[18ch] text-[length:var(--text-h2)]">
        {{ title }}<template v-if="em"> <em class="text-red-2">{{ em }}</em></template>
      </h2>
      <p data-r class="mt-6 max-w-xl text-mute md:text-lg">{{ lead }}</p>
      <div data-r class="mt-9">
        <a v-magnetic :href="href" class="btn btn-gold btn-lg">{{ cta }} <PhArrowRight :size="18" /></a>
      </div>
    </div>
  </section>
</template>

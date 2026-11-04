<script setup lang="ts">
import gsap from 'gsap'

const props = defineProps<{ id: string, n: string, label: string, scene: number, eyebrow: string, title: string, em?: string, lead?: string }>()
const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  gsap.from(q('[data-hd]'), { y: 28, autoAlpha: 0, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  gsap.fromTo(q('[data-vline]'), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 35%', scrub: true } })
  q('[data-in]').forEach((n, i) => {
    gsap.from(n, { y: 32, autoAlpha: 0, duration: 0.9, delay: (i % 3) * 0.08, ease: 'expo.out', scrollTrigger: { trigger: n, start: 'top 90%', once: true } })
  })
})
</script>

<template>
  <section :id="id" ref="root" :data-scene="props.scene" class="relative scroll-mt-20 py-20 md:py-32" :aria-labelledby="`${id}-h`">
    <SideLabel :n="n" :text="label" />
    <div class="wrap flex flex-col items-center text-center">
      <p data-hd class="eyebrow">{{ eyebrow }}</p>
      <h2 :id="`${id}-h`" data-hd class="display mt-4 max-w-[18ch] text-[length:var(--text-h2)]">
        {{ title }}<template v-if="em"> <em class="text-red-2">{{ em }}</em></template>
      </h2>
      <p v-if="lead" data-hd class="mt-5 max-w-2xl text-mute md:text-lg">{{ lead }}</p>
      <div class="mt-8 h-16 w-px bg-line md:h-20"><div data-vline class="h-full w-full origin-top bg-gradient-to-b from-gold to-transparent" /></div>
    </div>
    <div class="wrap mt-10 md:mt-14"><slot /></div>
  </section>
</template>

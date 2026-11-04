<script setup lang="ts">
import gsap from 'gsap'
import type { Feature } from '~/utils/pages/ntrader'

const props = withDefaults(defineProps<{ id: string, n: string, label: string, eyebrow: string, title: string, em?: string, lead?: string, items?: Feature[], scene?: number }>(), { scene: 1, items: () => [] })
const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  gsap.from(q('[data-head] > *'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  const grid = q('[data-grid]')[0]
  if (!grid) return
  gsap.from(q('[data-f]'), { y: 60, autoAlpha: 0, stagger: 0.1, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: grid, start: 'top 85%', once: true } })
  gsap.from(q('[data-ico]'), { scale: 0, rotate: -90, stagger: 0.1, duration: 0.9, ease: 'back.out(2)', delay: 0.25, scrollTrigger: { trigger: grid, start: 'top 85%', once: true } })
})
</script>

<template>
  <section ref="root" :data-scene="props.scene" class="relative py-24 md:py-36" :aria-labelledby="id">
    <SideLabel :n="n" :text="label" />
    <NtHead :id="id" :eyebrow="eyebrow" :title="title" :em="em" :lead="lead" />
    <ul v-if="items.length" data-grid class="wrap mt-6 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="(f, i) in items" :key="f.t" data-f>
        <article v-spot class="card spot flex h-full flex-col p-6 md:p-8">
          <div class="flex items-center justify-between">
            <span data-ico class="grid size-14 place-items-center rounded-full border border-line-strong bg-ink text-gold">
              <component :is="f.icon" :size="24" weight="duotone" aria-hidden="true" />
            </span>
            <span class="num font-mono text-xs text-dim" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          </div>
          <h3 class="display mt-8 text-3xl md:text-[2.1rem]">{{ f.t }}</h3>
          <p class="mt-3 text-mute">{{ f.d }}</p>
        </article>
      </li>
    </ul>
  </section>
</template>

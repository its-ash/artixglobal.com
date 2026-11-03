<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowUpRight } from '@phosphor-icons/vue'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  el.querySelectorAll<HTMLElement>('[data-post]').forEach((p, i) => {
    gsap.timeline({ scrollTrigger: { trigger: p, start: 'top 88%', once: true } })
      .from(p, { y: 50, autoAlpha: 0, duration: 1.1, delay: (i % 3) * 0.08 })
      .from(p.querySelector('img'), { scale: 1.25, duration: 1.6, ease: 'expo.out' }, 0)
  })
})
</script>

<template>
  <section ref="root" data-scene="0" class="relative pb-24 md:pb-36" aria-labelledby="bl-h">
    <SideLabel n="07" text="Blog" />
    <div class="wrap flex flex-col items-center text-center">
      <p class="eyebrow">Blog</p>
      <h2 id="bl-h" class="display mt-4 text-[length:var(--text-h2)]">News and <em class="text-red-2">analysis</em></h2>
      <a :href="`${ORIGIN}/blog/`" class="btn btn-ghost mt-6">See all articles</a>
    </div>
    <ul class="track wrap mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
      <li v-for="p in POSTS" :key="p.href" data-post class="w-[82vw] max-w-[24rem] shrink-0 snap-start md:w-auto md:max-w-none">
        <a :href="p.href" class="group block text-center">
          <div class="overflow-hidden rounded-[var(--radius-card)] border border-line">
            <img :src="p.img" :alt="p.title" width="760" height="405" loading="lazy" decoding="async" class="aspect-[16/10] w-full object-cover transition-[scale] duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-105">
          </div>
          <p class="mt-5 font-mono text-[0.7rem] tracking-[0.12em] text-gold uppercase">{{ p.tag }}</p>
          <h3 class="mt-2 text-lg leading-snug md:text-xl">
            {{ p.title }}
            <PhArrowUpRight :size="16" class="ml-1 inline text-mute transition-colors duration-300 group-hover:text-gold" />
          </h3>
          <p class="mt-3 text-sm text-dim"><time :datetime="p.date">{{ fmtDate(p.date) }}</time> · {{ p.author }}</p>
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.track { scrollbar-width: none; scroll-padding-inline: clamp(1.125rem, 4vw, 3rem); }
.track::-webkit-scrollbar { display: none; }
</style>

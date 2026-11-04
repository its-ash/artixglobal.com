<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PhArrowDown } from '@phosphor-icons/vue'
import { CATS, POSTS } from '~/utils/pages/blog'

const desc = 'News and analysis from Artix Global: trading psychology, risk management, technical and fundamental analysis, and trading strategies.'
usePageSeo({ slug: 'blog', title: 'Trading Blog: News and Analysis | Artix Global', desc, crumb: 'Blog', img: { src: '/img/blog-3.webp', w: 760, h: 405, alt: 'Artix Global trading blog' } })

const [latest] = POSTS
const cat = ref('all')
const cats = [{ id: 'all', label: 'All', n: POSTS.length }, ...Object.entries(CATS).map(([id, label]) => ({ id, label, n: POSTS.filter(p => p.cats.includes(id)).length }))]
const list = computed(() => cat.value === 'all' ? POSTS.slice(1) : POSTS.filter(p => p.cats.includes(cat.value)))

const root = ref<HTMLElement | null>(null)
const grid = ref<HTMLElement | null>(null)

watch(cat, async () => {
  await nextTick()
  ScrollTrigger.refresh()
  if (grid.value && !matchMedia('(prefers-reduced-motion: reduce)').matches)
    gsap.fromTo(grid.value.children, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.05, ease: 'expo.out', overwrite: true })
})

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  q('[data-head]').forEach((h: HTMLElement) => {
    gsap.from(h.querySelectorAll('[data-in]'), { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 85%', once: true } })
  })
  const feat = q('[data-feat]')
  gsap.from(feat, { y: 60, autoAlpha: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: feat, start: 'top 90%', once: true } })
  gsap.fromTo(q('[data-feat] [data-img]'), { scale: 1.18 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: feat, start: 'top bottom', end: 'bottom 40%', scrub: true } })
  const cards = q('[data-card]')
  gsap.set(cards, { y: 50, autoAlpha: 0 })
  ScrollTrigger.batch(cards, { start: 'top 92%', once: true, onEnter: b => gsap.to(b, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.08, ease: 'expo.out', overwrite: true }) })
})
</script>

<template>
  <div ref="root">
    <PageHero eyebrow="Blog" title="News and" em="analysis" :scene="0" label="Blog">
      <a href="#latest" class="btn btn-ghost">Read the latest <PhArrowDown :size="16" /></a>
    </PageHero>

    <section v-if="latest" id="latest" data-scene="1" class="relative scroll-mt-24 pb-20 md:pb-28" aria-labelledby="latest-h">
      <SideLabel n="01" text="Latest" />
      <div class="wrap">
        <div data-head class="flex flex-col items-center text-center">
          <span data-in class="h-10 w-px bg-gradient-to-b from-transparent to-gold" />
          <p data-in class="eyebrow mt-4">Featured</p>
          <h2 id="latest-h" data-in class="display mt-3 text-[length:var(--text-h3)]">Latest <em class="text-red-2">article</em></h2>
        </div>
        <div data-feat class="mx-auto mt-10 max-w-6xl">
          <BlogCard :post="latest" featured />
        </div>
      </div>
    </section>

    <section id="archive" data-scene="2" class="relative pb-24 md:pb-32" aria-labelledby="archive-h">
      <SideLabel n="02" text="Archive" side="end" />
      <div class="wrap">
        <div data-head class="flex flex-col items-center text-center">
          <span data-in class="h-10 w-px bg-gradient-to-b from-transparent to-gold" />
          <p data-in class="eyebrow mt-4">Archive</p>
          <h2 id="archive-h" data-in class="display mt-3 text-[length:var(--text-h2)]">All <em class="text-red-2">articles</em></h2>
          <div data-in role="group" aria-label="Filter by category" class="mt-8 flex max-w-4xl flex-wrap justify-center gap-2">
            <button
              v-for="c in cats"
              :key="c.id"
              type="button"
              :aria-pressed="cat === c.id"
              class="inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-200"
              :class="cat === c.id ? 'border-gold bg-gold text-on-gold' : 'border-line-strong text-mute hover:border-gold hover:text-gold-2'"
              @click="cat = c.id"
            >
              {{ c.label }}<span class="num font-mono text-xs" :class="cat === c.id ? 'text-on-gold/70' : 'text-dim'">{{ c.n }}</span>
            </button>
          </div>
        </div>
        <p class="sr-only" aria-live="polite">{{ list.length }} articles shown</p>
        <ul ref="grid" class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="p in list" :key="p.slug" data-card>
            <BlogCard :post="p" />
          </li>
        </ul>
      </div>
    </section>

    <HomeCta />
  </div>
</template>

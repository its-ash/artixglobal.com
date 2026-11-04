<script setup lang="ts">
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { PhArrowLeft, PhCalendarBlank, PhClock, PhUser } from '@phosphor-icons/vue'
import { POSTS, catName, clip, excerpt, fmtDate, readMins, type Post } from '~/utils/pages/blog'
import { OG_IMG, ORG_ID, ORIGIN, SITE_NAME } from '~/utils/site'

const route = useRoute()
const slug = String(route.params.post ?? '')
const i = POSTS.findIndex(p => p.slug === slug)
const hit = POSTS[i]
if (!hit) throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
const post: Post = hit

const prev = POSTS[i + 1]
const next = i > 0 ? POSTS[i - 1] : undefined
const more = POSTS.filter(p => p.slug !== post.slug && p.cats.some(c => post.cats.includes(c))).slice(0, 3)
const mins = readMins(post)
const full = `${post.title} | Artix Global`
const title = full.length <= 60 ? full : post.title
const desc = clip(`${post.title}. ${excerpt(post)}`)
const img = post.cover ? { src: post.cover, w: 760, h: 405, alt: post.title } : { ...OG_IMG, alt: post.title }

const url = usePageSeo({ slug: post.slug, title, desc, crumb: post.title, parent: { name: 'Blog', slug: 'blog' }, img, type: 'article' })
useSeoMeta({
  articlePublishedTime: post.date,
  articleModifiedTime: post.modified,
  articleAuthor: [post.author],
  articleSection: catName(post.cats[0] ?? ''),
  articleTag: post.tags
})
useHead({
  script: [ldJson({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: desc,
    image: `${ORIGIN}${img.src}`,
    datePublished: post.date,
    dateModified: post.modified,
    inLanguage: 'en',
    author: { '@type': 'Person', name: post.author },
    publisher: { '@id': ORG_ID, '@type': 'Organization', name: SITE_NAME, url: `${ORIGIN}/`, logo: { '@type': 'ImageObject', url: `${ORIGIN}/logo.svg` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@id': `${ORIGIN}/#website` },
    articleSection: post.cats.map(catName),
    keywords: post.tags.join(', '),
    wordCount: post.body.flatMap(b => 'p' in b ? [b.p] : 'quote' in b ? [b.quote] : []).join(' ').split(/\s+/).length
  })]
})

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  const split = SplitText.create(q('[data-h]'), { type: 'lines,words', mask: 'lines', linesClass: 'pb-[0.06em]' })
  gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 })
    .from(q('[data-k]'), { y: 16, autoAlpha: 0, duration: 0.8, stagger: 0.06 }, 0)
    .from(split.words, { yPercent: 115, duration: 1.2, stagger: 0.03 }, 0.05)
    .from(q('[data-r]'), { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.35)
    .from(q('[data-cover]'), { y: 60, autoAlpha: 0, duration: 1.4 }, 0.45)
  gsap.fromTo(q('[data-cover] [data-img]'), { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: q('[data-cover]'), start: 'top 80%', end: 'bottom top', scrub: true } })
  gsap.fromTo(q('[data-progress]'), { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: q('[data-article]'), start: 'top 70%', end: 'bottom 70%', scrub: 0.3 } })
  q('[data-blk], [data-pg], [data-in]').forEach((b: HTMLElement) => {
    gsap.from(b, { y: 32, autoAlpha: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: b, start: 'top 90%', once: true } })
  })
  return () => split.revert()
})
</script>

<template>
  <div ref="root">
    <div data-progress class="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gold" style="transform: scaleX(0)" aria-hidden="true" />

    <article data-article aria-labelledby="post-h">
      <header data-scene="0" class="relative pb-12 pt-32 text-center md:pb-16 md:pt-44">
        <SideLabel n="01" text="Article" />
        <div class="wrap flex flex-col items-center">
          <NuxtLink data-k to="/blog/" class="group inline-flex min-h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-mute transition-colors duration-200 hover:border-gold hover:text-gold-2">
            <PhArrowLeft :size="14" class="transition-transform duration-300 group-hover:-translate-x-0.5" />Back to blog
          </NuxtLink>
          <ul data-k class="mt-8 flex flex-wrap justify-center gap-x-2 gap-y-1" aria-label="Categories">
            <li v-for="(c, n) in post.cats" :key="c" class="eyebrow flex items-center gap-2">
              <span v-if="n" class="size-1 rounded-full bg-red-2" aria-hidden="true" />{{ catName(c) }}
            </li>
          </ul>
          <h1 id="post-h" data-h class="display mt-6 max-w-[20ch] text-[clamp(2.4rem,1.5rem+3.6vw,5.25rem)]">{{ post.title }}</h1>
          <p data-r class="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-mute">
            <span class="inline-flex items-center gap-2"><PhUser :size="16" class="text-gold" />Written by {{ post.author }}</span>
            <span class="inline-flex items-center gap-2"><PhCalendarBlank :size="16" class="text-gold" /><time :datetime="post.date">{{ fmtDate(post.date) }}</time></span>
            <span class="inline-flex items-center gap-2"><PhClock :size="16" class="text-gold" />{{ mins }} min read</span>
          </p>
          <div data-r class="mt-10 h-16 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>
      </header>

      <div class="wrap">
        <figure data-cover class="mx-auto max-w-4xl overflow-hidden rounded-[1.25rem] border border-line">
          <div data-img class="aspect-[760/405] w-full">
            <BlogCover :src="post.cover" :alt="post.title" eager />
          </div>
        </figure>
      </div>

      <section data-scene="1" class="relative py-16 md:py-24" aria-label="Article body">
        <div class="wrap">
          <div class="mx-auto max-w-[68ch]">
            <BlogBody :blocks="post.body" />
            <div data-in class="mt-14 flex flex-wrap items-center gap-2 border-t border-line pt-8">
              <span class="mr-2 font-mono text-[0.7rem] tracking-[0.14em] text-dim uppercase">Post tags</span>
              <span v-for="t in post.tags" :key="t" class="inline-flex min-h-8 items-center rounded-full border border-line-strong px-3 text-sm text-mute">{{ t }}</span>
            </div>
          </div>
        </div>
      </section>
    </article>

    <section data-scene="2" class="relative pb-24 md:pb-32" aria-labelledby="more-h">
      <SideLabel n="02" text="Keep reading" side="end" />
      <div class="wrap">
        <div class="mx-auto max-w-6xl">
          <BlogPager :prev="prev" :next="next" />
        </div>
        <div data-in class="mt-20 flex flex-col items-center text-center">
          <span class="h-10 w-px bg-gradient-to-b from-transparent to-gold" />
          <p class="eyebrow mt-4">Blog</p>
          <h2 id="more-h" class="display mt-3 text-[length:var(--text-h3)]">Keep <em class="text-red-2">reading</em></h2>
        </div>
        <ul class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="p in more" :key="p.slug" data-in>
            <BlogCard :post="p" />
          </li>
        </ul>
        <div data-in class="mt-12 flex justify-center">
          <NuxtLink to="/blog/" class="btn btn-ghost"><PhArrowLeft :size="16" />All articles</NuxtLink>
        </div>
      </div>
    </section>

    <HomeCta />
  </div>
</template>

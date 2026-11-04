<script setup lang="ts">
import { PhArrowUpRight, PhClock } from '@phosphor-icons/vue'
import { catName, clip, excerpt, fmtDate, readMins, type Post } from '~/utils/pages/blog'

const props = withDefaults(defineProps<{ post: Post, featured?: boolean, level?: 'h2' | 'h3' }>(), { featured: false, level: 'h3' })
const to = computed(() => `/${props.post.slug}/`)
</script>

<template>
  <article v-spot class="card spot group h-full" :class="featured ? 'grid md:grid-cols-[1.15fr_1fr]' : 'flex flex-col'">
    <NuxtLink :to="to" tabindex="-1" aria-hidden="true" class="block overflow-hidden" :class="featured ? 'aspect-[16/10] md:aspect-auto md:min-h-[24rem]' : 'aspect-[16/10]'">
      <div data-img class="h-full w-full">
        <BlogCover :src="post.cover" :eager="featured" class="transition-[scale] duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-105" />
      </div>
    </NuxtLink>
    <div class="flex flex-1 flex-col gap-4" :class="featured ? 'p-7 md:p-10 md:justify-center' : 'p-6'">
      <p class="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] tracking-[0.12em] uppercase">
        <span class="text-gold">{{ catName(post.cats[0] ?? '') }}</span>
        <span class="text-dim"><time :datetime="post.date">{{ fmtDate(post.date) }}</time></span>
      </p>
      <component :is="level" :class="featured ? 'display text-[length:var(--text-h3)] leading-[1.05]' : 'text-lg leading-snug md:text-xl'">
        <NuxtLink :to="to" class="after:absolute after:inset-0 after:content-[''] hover:text-gold-2">
          {{ post.title }}
        </NuxtLink>
      </component>
      <p class="line-clamp-3 text-sm leading-relaxed text-mute" :class="{ 'md:text-base': featured }">{{ clip(excerpt(post), featured ? 220 : 140) }}</p>
      <p class="mt-auto flex items-center justify-between gap-4 pt-2 text-sm text-dim">
        <span>By {{ post.author }}<span class="mx-2 text-line-strong">/</span><PhClock :size="14" class="mb-0.5 inline" /> {{ readMins(post) }} min read</span>
        <span class="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-mute transition-colors duration-300 group-hover:border-gold group-hover:text-gold">
          <PhArrowUpRight :size="16" />
        </span>
      </p>
    </div>
  </article>
</template>

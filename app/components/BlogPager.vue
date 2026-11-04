<script setup lang="ts">
import { PhArrowLeft, PhArrowRight } from '@phosphor-icons/vue'
import type { Post } from '~/utils/pages/blog'

defineProps<{ prev?: Post, next?: Post }>()
</script>

<template>
  <nav aria-label="More posts" class="grid gap-4 md:grid-cols-2">
    <NuxtLink v-if="prev" v-spot :to="`/${prev.slug}/`" rel="prev" data-pg class="card spot group flex min-h-36 flex-col justify-between gap-6 p-6 md:p-8">
      <span class="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.14em] text-dim uppercase">
        <PhArrowLeft :size="14" class="text-gold transition-transform duration-300 group-hover:-translate-x-1" />Previous post
      </span>
      <span class="display text-2xl leading-tight transition-colors duration-300 group-hover:text-gold-2 md:text-3xl">{{ prev.title }}</span>
    </NuxtLink>
    <span v-else class="hidden md:block" />
    <NuxtLink v-if="next" v-spot :to="`/${next.slug}/`" rel="next" data-pg class="card spot group flex min-h-36 flex-col items-end justify-between gap-6 p-6 text-right md:p-8">
      <span class="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.14em] text-dim uppercase">
        Next post<PhArrowRight :size="14" class="text-gold transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <span class="display text-2xl leading-tight transition-colors duration-300 group-hover:text-gold-2 md:text-3xl">{{ next.title }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import type { Block } from '~/utils/pages/blog'

defineProps<{ blocks: Block[] }>()
</script>

<template>
  <div class="flex flex-col">
    <template v-for="(b, i) in blocks" :key="i">
      <h2 v-if="'h2' in b" data-blk class="display mt-14 text-[clamp(2rem,1.5rem+1.8vw,3rem)] leading-[1.02] first:mt-0">{{ b.h2 }}</h2>
      <h3 v-else-if="'h3' in b" data-blk class="display mt-12 text-[clamp(1.6rem,1.3rem+1vw,2.15rem)] leading-[1.08]">{{ b.h3 }}</h3>
      <p v-else-if="'p' in b" data-blk class="mt-6 text-[1.0625rem] leading-[1.8] text-fg/85 md:text-lg">{{ b.p }}</p>
      <blockquote v-else-if="'quote' in b" data-blk class="relative my-10 border-l-2 border-gold py-1 pl-6 md:pl-8">
        <p class="display text-[clamp(1.4rem,1.15rem+0.9vw,1.9rem)] leading-[1.25] text-fg italic">{{ b.quote }}</p>
      </blockquote>
      <ul v-else-if="'ul' in b" data-blk class="mt-6 flex flex-col gap-3 text-[1.0625rem] leading-[1.75] text-fg/85 md:text-lg">
        <li v-for="t in b.ul" :key="t" class="relative pl-6 before:absolute before:left-0 before:top-[0.8em] before:size-1.5 before:rounded-full before:bg-gold">{{ t }}</li>
      </ul>
      <div v-else-if="'imgs' in b" data-blk class="mt-10 grid gap-4 sm:grid-cols-2">
        <figure v-for="m in b.imgs" :key="m.src" class="overflow-hidden rounded-[1.25rem] border border-line bg-ink-2">
          <img :src="m.src" :alt="m.alt" :width="m.w" :height="m.h" loading="lazy" decoding="async" class="h-auto w-full">
        </figure>
      </div>
    </template>
  </div>
</template>

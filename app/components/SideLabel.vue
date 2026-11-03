<script setup lang="ts">
withDefaults(defineProps<{ n?: string, text: string, side?: 'start' | 'end' }>(), { side: 'start' })
</script>

<template>
  <div class="pointer-events-none absolute inset-y-0 z-10 hidden w-10 md:block" :class="side === 'start' ? 'left-2 lg:left-5' : 'right-2 lg:right-5'" aria-hidden="true">
    <div class="sticky top-[50svh] -translate-y-1/2">
      <p class="vlabel flex items-center gap-4 font-mono text-[0.68rem] tracking-[0.32em] text-dim uppercase" :class="{ flip: side === 'start' }">
        <span v-if="n" class="text-red-2">{{ n }}</span>
        <span class="block h-10 w-px bg-line-strong" />
        <span>{{ text }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.vlabel { writing-mode: vertical-rl; white-space: nowrap; }
.vlabel.flip { rotate: 180deg; }
</style>

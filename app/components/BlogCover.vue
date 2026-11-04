<script setup lang="ts">
withDefaults(defineProps<{ src: string | null, alt?: string, eager?: boolean, w?: number, h?: number }>(), { alt: '', eager: false, w: 760, h: 405 })
</script>

<template>
  <img v-if="src" :src="src" :alt="alt" :width="w" :height="h" :loading="eager ? 'eager' : 'lazy'" :fetchpriority="eager ? 'high' : 'auto'" decoding="async" class="h-full w-full object-cover">
  <div v-else class="cover-fb relative grid h-full w-full place-items-center overflow-hidden bg-ink-3" aria-hidden="true">
    <span class="display text-[clamp(3rem,8vw,6rem)] text-fg/10">A<em class="text-red-2/40">x</em></span>
  </div>
</template>

<style scoped>
.cover-fb {
  background-image:
    radial-gradient(ellipse at 30% 20%, color-mix(in oklab, var(--color-gold) 16%, transparent), transparent 60%),
    radial-gradient(ellipse at 80% 90%, color-mix(in oklab, var(--color-red) 12%, transparent), transparent 55%),
    linear-gradient(var(--color-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-line) 1px, transparent 1px);
  background-size: auto, auto, 2.5rem 2.5rem, 2.5rem 2.5rem;
}
</style>

<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PhArrowRight } from '@phosphor-icons/vue'

const el = ref<HTMLElement | null>(null)
let st: ScrollTrigger | null = null

onMounted(() => {
  st = ScrollTrigger.create({
    start: () => innerHeight * 0.6,
    end: 'max',
    onToggle: s => el.value?.classList.toggle('on', s.isActive),
    onUpdate: s => el.value?.classList.toggle('low', s.progress > 0.985)
  })
})
onBeforeUnmount(() => st?.kill())
</script>

<template>
  <div ref="el" class="dock fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 lg:hidden">
    <div class="flex items-center gap-2 rounded-full border border-line-strong bg-ink-2/90 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl">
      <a :href="LOGIN" class="flex min-h-11 flex-1 items-center justify-center rounded-full text-sm text-mute active:bg-ink-3">Login</a>
      <a :href="SIGNUP" class="btn btn-gold !min-h-11 flex-[1.6] text-sm">Open Account <PhArrowRight :size="16" /></a>
    </div>
  </div>
</template>

<style scoped>
.dock { transform: translateY(140%); opacity: 0; transition: transform 500ms var(--ease-out-expo), opacity 300ms; pointer-events: none; }
.dock.on { transform: none; opacity: 1; pointer-events: auto; }
.dock.on.low, :global(.menu-open) .dock { transform: translateY(140%); opacity: 0; pointer-events: none; }
@media (prefers-reduced-motion: reduce) { .dock { transition: opacity 200ms; transform: none; } .dock.on.low, :global(.menu-open) .dock { transform: none; } }
@media (prefers-reduced-transparency: reduce) { .dock > div { background: var(--color-ink-2); backdrop-filter: none; } }
</style>

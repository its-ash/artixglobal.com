<script setup lang="ts">
const POSES = {
  stand: { src: '/img/mascot.webp', w: 420, h: 720, alt: 'Artix Global polar bear mascot' },
  signup: { src: '/img/mascot/signup.webp', w: 301, h: 464, alt: 'Artix Global polar bear filling out the registration form' },
  verify: { src: '/img/mascot/verify.webp', w: 356, h: 470, alt: 'Artix Global polar bear holding a verified identity badge' },
  trade: { src: '/img/mascot/trade.webp', w: 388, h: 456, alt: 'Artix Global polar bear trading with a rising candlestick chart' },
  oops: { src: '/img/mascot/oops.webp', w: 431, h: 457, alt: 'Artix Global polar bear holding a broken chart' }
} as const

export type GlobalMascotPose = keyof typeof POSES

const props = withDefaults(defineProps<{ pose?: GlobalMascotPose; decorative?: boolean; eager?: boolean }>(), {
  pose: 'stand'
})

const m = computed(() => POSES[props.pose])
</script>

<template>
  <img
    :src="m.src"
    :width="m.w"
    :height="m.h"
    :alt="decorative ? '' : m.alt"
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
    draggable="false"
    class="bear-mascot pointer-events-none block h-auto max-w-full select-none"
  >
</template>

<style scoped>
.bear-mascot {
  filter: drop-shadow(0 18px 36px color-mix(in oklab, var(--color-gold) 22%, transparent));
}
</style>

<script setup lang="ts">
import BrandPlay from '~/components/icons/BrandPlay.vue'
import BrandApple from '~/components/icons/BrandApple.vue'
import { PLAY_URL, APPSTORE_URL } from '~/utils/pages/ntrader'

const STORES = [
  { href: PLAY_URL, icon: BrandPlay, k: 'Get it on', t: 'Google Play' },
  { href: APPSTORE_URL, icon: BrandApple, k: 'Download on the', t: 'App Store' }
]
</script>

<template>
  <a
    v-for="s in STORES" :key="s.t" :href="s.href" target="_blank" rel="noopener noreferrer"
    class="btn btn-ghost btn-lg gap-3 bg-ink/40 pl-5 text-left" :aria-label="`${s.k} ${s.t} (opens in a new tab)`"
  >
    <component :is="s.icon" :size="22" class="shrink-0" />
    <span class="flex flex-col leading-tight">
      <span class="text-[0.62rem] tracking-wider text-mute uppercase">{{ s.k }}</span>
      <span class="font-semibold">{{ s.t }}</span>
    </span>
  </a>
</template>

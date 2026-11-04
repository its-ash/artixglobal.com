<script setup lang="ts">
import type { PtHeadCopy } from '~/utils/pages/partners'

defineProps<{ id: string, copy: PtHeadCopy }>()
</script>

<template>
  <div data-head class="wrap flex flex-col items-center text-center">
    <p class="eyebrow">{{ copy.eyebrow }}</p>
    <h2 :id="id" class="display mt-4 max-w-[18ch] text-[length:var(--text-h2)]">
      {{ copy.title }}<template v-if="copy.em"> <em class="text-red-2">{{ copy.em }}</em></template>
    </h2>
    <p v-if="copy.lead" class="mt-6 max-w-2xl text-mute md:text-lg">{{ copy.lead }}</p>
    <div class="mt-10 h-14 w-px bg-gradient-to-b from-gold to-transparent" />
  </div>
</template>

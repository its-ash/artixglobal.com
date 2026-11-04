<script setup lang="ts">
defineProps<{ id: string, eyebrow: string, title: string, em?: string, lead?: string }>()
</script>

<template>
  <div data-head class="wrap flex flex-col items-center text-center">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2 :id="id" class="display mt-4 max-w-[16ch] text-[length:var(--text-h2)]">
      {{ title }}<template v-if="em"> <em class="text-red-2">{{ em }}</em></template>
    </h2>
    <p v-if="lead" class="mt-5 max-w-2xl text-mute">{{ lead }}</p>
    <div class="mt-10 h-16 w-px bg-gradient-to-b from-gold to-transparent" />
  </div>
</template>

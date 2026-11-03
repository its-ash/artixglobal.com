<script setup lang="ts">
defineProps<{ mark?: boolean }>()
</script>

<template>
  <img v-if="!mark" src="/logo.svg" width="1120" height="394" alt="Artix Global" decoding="async" class="aspect-[1120/394] w-auto">
  <svg v-else viewBox="830 10 252 326" role="img" aria-label="Artix Global" fill-rule="evenodd">
    <polygon fill="currentColor" points="1074.6,329.8 1037.7,329.8 837.3,15.7 874.3,15.7" />
    <g data-down>
      <polygon fill="#851c23" points="1074.6,15.7 985.7,144.5 907.8,15.7" />
      <polygon fill="#ec2026" points="907.8,15.7 966.5,113.4 1011,83.7" />
      <polygon fill="#d71f29" points="1074.6,15.7 994.5,15.7 1011,83.7" />
    </g>
    <g data-up>
      <polygon fill="#47b549" points="926.2,200.9 1004.1,329.8 837.3,329.8" />
      <polygon fill="#8dc582" points="1003.8,329.3 944.1,230.5 901.3,259.7" />
      <polygon fill="#30a150" points="918.6,329.8 901.3,259.7 837.3,329.8" />
      <polygon fill="#1b713b" points="944.1,230.5 871.6,280.1 911.3,222.5" />
    </g>
  </svg>
</template>

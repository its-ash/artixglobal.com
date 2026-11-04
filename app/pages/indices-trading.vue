<script setup lang="ts">
import { MARKET_PAGES } from '~/utils/pages/markets'

const { desc } = MARKET_PAGES['indices-trading']
usePageSeo({ slug: 'indices-trading', title: 'Indices Trading | Artix Global', desc })
</script>

<template>
  <MarketPage slug="indices-trading" />
</template>

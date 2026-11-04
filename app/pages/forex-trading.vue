<script setup lang="ts">
import { MARKET_PAGES } from '~/utils/pages/markets'

const { desc } = MARKET_PAGES['forex-trading']
usePageSeo({ slug: 'forex-trading', title: 'Forex Trading | Artix Global', desc })
</script>

<template>
  <MarketPage slug="forex-trading" />
</template>

<script setup lang="ts">
import { MARKET_PAGES } from '~/utils/pages/markets'

const { desc } = MARKET_PAGES['stocks-trading']
usePageSeo({ slug: 'stocks-trading', title: 'Stock CFD Trading | Artix Global', desc })
</script>

<template>
  <MarketPage slug="stocks-trading" />
</template>

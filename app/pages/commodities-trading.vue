<script setup lang="ts">
import { MARKET_PAGES } from '~/utils/pages/markets'

const { desc } = MARKET_PAGES['commodities-trading']
usePageSeo({ slug: 'commodities-trading', title: 'Commodities Trading | Artix Global', desc })
</script>

<template>
  <MarketPage slug="commodities-trading" />
</template>

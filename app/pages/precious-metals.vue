<script setup lang="ts">
import { MARKET_PAGES } from '~/utils/pages/markets'

const { desc } = MARKET_PAGES['precious-metals']
usePageSeo({ slug: 'precious-metals', title: 'Precious Metals Trading | Artix Global', desc })
</script>

<template>
  <MarketPage slug="precious-metals" />
</template>

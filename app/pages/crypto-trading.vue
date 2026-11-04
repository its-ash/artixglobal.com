<script setup lang="ts">
import { MARKET_PAGES } from '~/utils/pages/markets'

const { desc } = MARKET_PAGES['crypto-trading']
usePageSeo({ slug: 'crypto-trading', title: 'Crypto CFD Trading | Artix Global', desc })
</script>

<template>
  <MarketPage slug="crypto-trading" />
</template>

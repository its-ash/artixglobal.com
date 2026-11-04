<script setup lang="ts">
import { SITE_DESC, SITE_TITLE } from '~/utils/site'

usePageSeo({ title: SITE_TITLE, desc: SITE_DESC })
</script>

<template>
  <div>
    <HomeHero />
    <TickerTape />
    <HomeWhy />
    <HomeTapes />
    <HomeMarkets />
    <HomePlatform />
    <HomeAccounts />
    <HomeSteps />
    <HomeFaq />
    <HomeCta />
  </div>
</template>

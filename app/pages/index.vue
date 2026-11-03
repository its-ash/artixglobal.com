<script setup lang="ts">
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FinancialService',
      name: 'Artix Global',
      url: ORIGIN,
      logo: `${ORIGIN}/logo.svg`,
      email: EMAIL,
      address: { '@type': 'PostalAddress', streetAddress: '3 Arabian Crescent, Leeuwenhof', addressLocality: 'Tygervalley', addressRegion: 'Western Cape', postalCode: '7441', addressCountry: 'ZA' }
    })
  }]
})
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
    <HomeBlog />
    <HomeCta />
  </div>
</template>

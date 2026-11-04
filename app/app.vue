<script setup lang="ts">
import { ORG, ORG_ID, ORIGIN, SITE_DESC, SITE_NAME } from '~/utils/site'

useHead({
  script: [ldJson({
    '@context': 'https://schema.org',
    '@graph': [
      ORG,
      { '@type': 'WebSite', '@id': `${ORIGIN}/#website`, name: SITE_NAME, url: `${ORIGIN}/`, description: SITE_DESC, inLanguage: 'en', publisher: { '@id': ORG_ID } }
    ]
  })]
})
</script>

<template>
  <div class="grain">
    <ScrollScene />
    <SitePreloader />
    <SiteNav />
    <main id="main">
      <NuxtPage />
    </main>
    <SiteFooter />
    <MobileDock />
    <SiteCursor />
  </div>
</template>

<script setup lang="ts">
import { ORG, ORG_ID, ORIGIN, SITE_DESC, SITE_NAME } from '~/utils/site'

const SITELINKS = [
  { name: 'Forex Trading', description: 'Trade major, minor and exotic currency pairs with raw spreads from 0.0 pips.', url: `${ORIGIN}/forex-trading/` },
  { name: 'Precious Metals', description: 'Trade gold, silver and platinum CFDs with institutional liquidity.', url: `${ORIGIN}/precious-metals/` },
  { name: 'Stocks & Indices', description: 'Access global shares and major stock market indices from one account.', url: `${ORIGIN}/stocks-trading/` },
  { name: 'Crypto Trading', description: 'Trade leading cryptocurrency CFDs on nTrader with tight spreads.', url: `${ORIGIN}/crypto-trading/` },
  { name: 'Trading Accounts', description: 'Open a live or demo trading account starting from $50 with up to 1:200 leverage.', url: `${ORIGIN}/accounts/` },
  { name: 'nTrader Platform', description: 'Download nTrader for Windows and mobile with integrated CRM and copy trading.', url: `${ORIGIN}/ntrader-windows/` },
  { name: 'Trading Blog', description: 'Market education, trading psychology and platform insights.', url: `${ORIGIN}/blog/` },
  { name: 'Support & Contact', description: 'Get in touch with Artix Global support and partner desks.', url: `${ORIGIN}/contact/` }
]

useHead({
  script: [ldJson({
    '@context': 'https://schema.org',
    '@graph': [
      { ...ORG, sameAs: ['https://artixcapital.com/', 'https://prop.itsash.in/'] },
      { '@type': 'WebSite', '@id': `${ORIGIN}/#website`, name: SITE_NAME, alternateName: ['Artix Global Markets', 'Artix'], url: `${ORIGIN}/`, description: SITE_DESC, inLanguage: 'en', publisher: { '@id': ORG_ID } },
      {
        '@type': 'ItemList',
        '@id': `${ORIGIN}/#sitelinks`,
        name: 'Artix Global Main Categories',
        itemListElement: SITELINKS.map((s, i) => ({
          '@type': 'SiteNavigationElement',
          position: i + 1,
          name: s.name,
          description: s.description,
          url: s.url
        }))
      }
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

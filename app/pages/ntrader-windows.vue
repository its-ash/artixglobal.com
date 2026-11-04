<script setup lang="ts">
import { PhArrowRight } from '@phosphor-icons/vue'
import { SIGNUP } from '~/utils/site'
import { WIN } from '~/utils/pages/ntrader'

const DESC = 'nTrader for Windows: trade forex, commodities, stocks, indices and crypto in one desktop terminal with advanced charting, all order types and a FIX API liquidity bridge.'

usePageSeo({ slug: 'ntrader-windows', title: 'nTrader for Windows | Artix Global', desc: DESC, img: WIN.shot })
</script>

<template>
  <div>
    <PageHero eyebrow="Amazing feature for" title="nTrader for" em="Windows" :lead="WIN.lead" :scene="4" label="Platforms">
      <a v-magnetic :href="SIGNUP" class="btn btn-gold btn-lg">Open Account <PhArrowRight :size="18" /></a>
      <NtStores />
    </PageHero>
    <NtShot v-bind="WIN.shot" :scene="4" />
    <NtFeatures id="win-f-h" n="01" label="Features" eyebrow="nTrader for Windows" title="Amazing" em="Features" :items="WIN.features" :scene="1" />
    <NtOs id="win-os-h" n="02" label="Platforms" eyebrow="Desktop and mobile" title="Available across all major" em="platforms" :os="WIN.os" :scene="2" />
    <NtFeatures id="win-sf-h" n="03" label="Special features" eyebrow="Inside the terminal" title="Our Special" em="Features" :items="WIN.special" :scene="3" />
    <NtSteps id="win-st-h" n="04" label="How it works" :eyebrow="WIN.how.title" title="How nTrader" em="works" :lead="WIN.how.body" :steps="WIN.steps" :scene="1" />
    <HomeFaq n="05" />
  </div>
</template>

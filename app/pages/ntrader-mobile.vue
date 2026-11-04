<script setup lang="ts">
import { PhArrowRight } from '@phosphor-icons/vue'
import { SIGNUP } from '~/utils/site'
import { MOB } from '~/utils/pages/ntrader'

const DESC = 'nTrader Mobile for iOS and Android: trade forex, indices, commodities and crypto CFDs anywhere with advanced charts, real-time quotes and order management.'

usePageSeo({ slug: 'ntrader-mobile', title: 'nTrader Mobile App for iOS and Android | Artix Global', desc: DESC, crumb: 'nTrader Mobile', img: MOB.shot })
</script>

<template>
  <div>
    <PageHero eyebrow="Amazing feature for" title="nTrader" em="Mobile" :lead="MOB.lead" :scene="4" label="Platforms">
      <NtStores />
      <a v-magnetic :href="SIGNUP" class="btn btn-gold btn-lg">Open Account <PhArrowRight :size="18" /></a>
    </PageHero>
    <NtShot v-bind="MOB.shot" :scene="4" />
    <NtFeatures id="mob-f-h" n="01" label="Features" eyebrow="Trading without compromise" title="Amazing" em="Features" :lead="MOB.intro" :items="MOB.features" :scene="1" />
    <NtFeatures id="mob-sf-h" n="02" label="Special features" eyebrow="One platform" title="Our Special" em="Features" :lead="MOB.special" :scene="3" />
    <NtOs id="mob-os-h" n="03" label="Platforms" eyebrow="How it works" title="Available across all major" em="platforms" :os="MOB.os" :img="MOB.poster" :scene="2" />
    <NtSteps id="mob-st-h" n="04" label="Get started" eyebrow="3 easy steps" title="Start trading in" em="three steps" :steps="MOB.steps" :scene="1" />
    <HomeFaq n="05" />
  </div>
</template>

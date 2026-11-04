<script setup lang="ts">
import { PhArrowRight } from '@phosphor-icons/vue'
import { EMAIL, SIGNUP } from '~/utils/site'
import { WL } from '~/utils/pages/partners'

usePageSeo({ slug: 'white-label-solution', title: WL.seo.title, desc: WL.seo.description, crumb: 'White Label Solution' })
</script>

<template>
  <div>
    <PageHero :eyebrow="WL.hero.eyebrow" :title="WL.hero.title" :em="WL.hero.em" :lead="WL.hero.lead" :scene="0" label="Partners">
      <a v-magnetic :href="SIGNUP" class="btn btn-gold btn-lg">{{ WL.hero.cta }} <PhArrowRight :size="18" /></a>
      <a :href="`mailto:${EMAIL}?subject=White%20label%20enquiry`" class="btn btn-ghost btn-lg">{{ EMAIL }}</a>
    </PageHero>
    <PtSplit id="wl-in" n="01" label="nTrader" :scene="1" :head="WL.intro.head" :body="WL.intro.body" :img="WL.intro.img" flip />
    <PtFeatures id="wl-of" n="02" label="What we offer" :scene="2" :head="WL.offer.head" :items="WL.offer.items" />
    <PtBand id="wl-bd" n="03" label="Coverage" :scene="3" v-bind="WL.band" :href="SIGNUP" />
    <PtSteps id="wl-st" n="04" label="Launch" :scene="1" :head="WL.steps.head" :items="WL.steps.items" :cta="WL.steps.cta" :href="SIGNUP" />
    <PtAccounts id="wl-ac" n="05" label="Accounts" :scene="4" :head="WL.accounts.head" />
    <HomeCta />
  </div>
</template>

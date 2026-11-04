<script setup lang="ts">
import { PhArrowRight } from '@phosphor-icons/vue'
import { EMAIL, SIGNUP } from '~/utils/site'
import { IB } from '~/utils/pages/partners'

usePageSeo({ slug: 'introducing-broker', title: IB.seo.title, desc: IB.seo.description, crumb: 'Introducing Broker' })
</script>

<template>
  <div>
    <PageHero :eyebrow="IB.hero.eyebrow" :title="IB.hero.title" :em="IB.hero.em" :lead="IB.hero.lead" :scene="0" label="Partners">
      <a v-magnetic :href="SIGNUP" class="btn btn-gold btn-lg">{{ IB.hero.cta }} <PhArrowRight :size="18" /></a>
      <a :href="`mailto:${EMAIL}?subject=Introducing%20Broker%20enquiry`" class="btn btn-ghost btn-lg">{{ EMAIL }}</a>
    </PageHero>
    <PtSplit id="ib-in" n="01" label="Partnership" :scene="1" :head="IB.intro.head" :body="IB.intro.body" :img="IB.intro.img" />
    <PtFeatures id="ib-of" n="02" label="What we offer" :scene="2" :head="IB.offer.head" :items="IB.offer.items" />
    <PtBand id="ib-bd" n="03" label="Earn" :scene="3" v-bind="IB.band" :href="SIGNUP" />
    <PtSteps id="ib-st" n="04" label="How to join" :scene="1" :head="IB.steps.head" :items="IB.steps.items" :cta="IB.steps.cta" :href="SIGNUP" />
    <PtAccounts id="ib-ac" n="05" label="Accounts" :scene="4" :head="IB.accounts.head" />
    <HomeCta />
  </div>
</template>

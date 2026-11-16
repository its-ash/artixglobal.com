<script setup lang="ts">
import { PhArrowRight } from '@phosphor-icons/vue'
import { SIGNUP, LOGIN } from '~/utils/site'
import { ACC_INTRO, ACC_STEPS } from '~/utils/pages/accounts'

const DESC = 'Compare Retail, Professional, Arbitrage and Bullion Trader accounts: minimum deposits, spreads from 0.0 pips, leverage up to 1:200 and commissions.'

usePageSeo({ slug: 'accounts', title: 'Account Types | Artix Global', desc: DESC })
</script>

<template>
  <div>
    <PageHero eyebrow="Accounts" title="Our Account" em="Types" :lead="ACC_INTRO" :scene="3" label="Accounts">
      <a v-magnetic :href="SIGNUP" class="btn btn-gold btn-lg">Open Account <PhArrowRight :size="18" /></a>
      <a :href="LOGIN" class="btn btn-ghost btn-lg">Login</a>
    </PageHero>
    <AccTiers />
    <AccCompare />
    <NtSteps id="acc-st-h" n="03" label="Get started" eyebrow="3 easy steps to start trading" title="How to Open an" em="Account" :steps="ACC_STEPS" />
    <HomeFaq n="04" />
    <HomeCta />
  </div>
</template>

<script setup lang="ts">
import { PhArrowRight } from '@phosphor-icons/vue'
import { SIGNUP, LOGIN } from '~/utils/site'
import { ACC_INTRO, ACC_STEPS } from '~/utils/pages/accounts'

const DESC = 'Compare Artix Core, Edge, Elite and Coverage accounts: minimum deposits, spreads, leverage up to 1:200, commissions and stop out levels on nTrader.'

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

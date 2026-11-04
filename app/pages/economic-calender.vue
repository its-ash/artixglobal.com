<script setup lang="ts">
import { PhArrowRight } from '@phosphor-icons/vue'
import { SIGNUP } from '~/utils/site'
import { CAL } from '~/utils/pages/partners'

usePageSeo({ slug: 'economic-calender', title: CAL.seo.title, desc: CAL.seo.description })
</script>

<template>
  <div>
    <PageHero :eyebrow="CAL.hero.eyebrow" :title="CAL.hero.title" :em="CAL.hero.em" :lead="CAL.hero.lead" :scene="0" label="Education">
      <a v-magnetic :href="SIGNUP" class="btn btn-gold btn-lg">Open Account <PhArrowRight :size="18" /></a>
    </PageHero>
    <PtCalendar />
    <HomeCta />
  </div>
</template>

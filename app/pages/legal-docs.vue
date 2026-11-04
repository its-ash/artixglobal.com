<script setup lang="ts">
import { PhArrowRight } from '@phosphor-icons/vue'
import { SIGNUP } from '~/utils/site'
import { LEGAL } from '~/utils/pages/partners'

usePageSeo({ slug: 'legal-docs', title: LEGAL.seo.title, desc: LEGAL.seo.description })
</script>

<template>
  <div>
    <PageHero :eyebrow="LEGAL.hero.eyebrow" :title="LEGAL.hero.title" :em="LEGAL.hero.em" :lead="LEGAL.hero.lead" :scene="0" label="Legal">
      <a v-magnetic :href="SIGNUP" class="btn btn-gold btn-lg">Open Account <PhArrowRight :size="18" /></a>
    </PageHero>
    <PtDocs />
    <HomeCta />
  </div>
</template>

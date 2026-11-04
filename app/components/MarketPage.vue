<script setup lang="ts">
import { PhArrowRight, PhArrowDown } from '@phosphor-icons/vue'
import { SIGNUP } from '~/utils/site'
import { MARKET_PAGES, type MarketSlug } from '~/utils/pages/markets'

const props = defineProps<{ slug: MarketSlug }>()
const m = computed(() => MARKET_PAGES[props.slug])
const n = (i: number) => String(i).padStart(2, '0')
const off = computed(() => (m.value.feature ? 1 : 0))
</script>

<template>
  <div>
    <PageHero eyebrow="Markets" :title="m.title" :em="m.em" :lead="m.lead" :scene="0" :label="m.name">
      <a v-magnetic :href="SIGNUP" class="btn btn-gold btn-lg">Start Trading <PhArrowRight :size="18" /></a>
      <a href="#products" class="btn btn-ghost btn-lg">Products offer <PhArrowDown :size="18" /></a>
    </PageHero>
    <MktQuotes :symbols="m.quotes" :name="m.name" />
    <MktProducts :name="m.name" :products="m.products" :n="n(1)" />
    <MktFeature v-if="m.feature" :feature="m.feature" :n="n(2)" />
    <MktSteps :gateway="m.gateway" :n="n(2 + off)" />
    <MktWhy :n="n(3 + off)" />
    <HomeCta />
  </div>
</template>

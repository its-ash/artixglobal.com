<script setup lang="ts">
import { PhArrowUpRight, PhChartLineUp, PhGraduationCap, PhPlus, PhWrench } from '@phosphor-icons/vue'
import { EMAIL, FAQ } from '~/utils/site'
import { SUPPORT } from '~/utils/pages/company'

usePageSeo({ slug: 'support', title: 'Support and FAQ | Artix Global', desc: `Artix Global support: answers to common trading questions, beginner resources and trading tools. Write to our team at ${EMAIL}.`, crumb: 'Support' })
useHead({ script: [ldJson({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })] })

const ICONS = [PhGraduationCap, PhWrench, PhChartLineUp]
const open = ref(0)
</script>

<template>
  <div>
    <PageHero eyebrow="Support" title="Anytime support" em="from our team" :lead="SUPPORT.lead" :scene="0" label="Support">
      <NuxtLink v-magnetic to="/contact/" class="btn btn-gold btn-lg">Contact Us</NuxtLink>
      <a :href="`mailto:${EMAIL}`" class="btn btn-ghost btn-lg">{{ EMAIL }}</a>
    </PageHero>

    <CoSection id="learn" n="01" label="Resources" :scene="1" eyebrow="Resources" title="Learn and" em="trade">
      <ul class="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
        <li v-for="(t, i) in SUPPORT.topics" :key="t.t" v-spot data-in class="card spot flex flex-col items-center gap-6 px-6 py-10 text-center">
          <span class="num font-mono text-xs text-red-2">0{{ i + 1 }}</span>
          <span class="grid size-14 place-items-center rounded-full border border-line-strong text-gold"><component :is="ICONS[i]" :size="24" /></span>
          <h3 class="display text-3xl">{{ t.t }}</h3>
          <a :href="t.href" class="group inline-flex min-h-11 items-center gap-2 text-gold-2" :aria-label="`Learn more about ${t.t}`">
            Learn More <PhArrowUpRight :size="16" class="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </li>
      </ul>
    </CoSection>

    <CoSection id="faq" n="02" label="FAQ" :scene="0" eyebrow="FAQ" title="Frequently asked" em="questions">
      <div class="mx-auto w-full max-w-3xl text-center">
        <div v-for="(f, i) in FAQ" :key="f.q" data-in class="border-b border-line first:border-t">
          <h3>
            <button
              :id="`sq-b-${i}`" class="flex min-h-16 w-full flex-col items-center justify-center gap-3 py-6 text-lg md:flex-row md:justify-between md:gap-6 md:text-left md:text-xl"
              :aria-expanded="open === i" :aria-controls="`sq-p-${i}`" @click="open = open === i ? -1 : i"
            >
              {{ f.q }}
              <span class="grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-300" :class="open === i ? 'border-gold bg-gold text-on-gold' : 'border-line-strong text-mute'">
                <PhPlus :size="14" weight="bold" class="transition-transform duration-300" :class="{ 'rotate-45': open === i }" />
              </span>
            </button>
          </h3>
          <div :id="`sq-p-${i}`" role="region" :aria-labelledby="`sq-b-${i}`" class="acc" :class="{ on: open === i }">
            <div class="min-h-0 overflow-hidden">
              <p class="mx-auto max-w-2xl pb-7 text-mute md:mx-0 md:pr-14 md:text-left">{{ f.a }}</p>
            </div>
          </div>
        </div>
        <p data-in class="mt-10 text-mute">Need more help? Write to <a :href="`mailto:${EMAIL}`" class="text-gold-2 underline decoration-gold/40 underline-offset-4 hover:decoration-gold">{{ EMAIL }}</a>.</p>
      </div>
    </CoSection>

    <HomeCta />
  </div>
</template>

<style scoped>
.acc { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 360ms var(--ease-out-quart); }
.acc.on { grid-template-rows: 1fr; }
.acc:not(.on) { visibility: hidden; transition: grid-template-rows 360ms var(--ease-out-quart), visibility 0s 360ms; }
@media (prefers-reduced-motion: reduce) { .acc, .acc:not(.on) { transition: none; } }
</style>

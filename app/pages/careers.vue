<script setup lang="ts">
import { PhArrowUpRight, PhBriefcase, PhClock, PhGlobeHemisphereEast } from '@phosphor-icons/vue'
import { EMAIL } from '~/utils/site'
import { CAREERS, type Job } from '~/utils/pages/company'

usePageSeo({ slug: 'careers', title: 'Careers | Artix Global', desc: `Careers at Artix Global: remote ${CAREERS.jobs.map(j => j.title).join(' and ')} roles. Join our dealing, sales, support, IB and back-office teams.` })

const apply = (j: Job) => `mailto:${EMAIL}?subject=${encodeURIComponent(`Application: ${j.title}`)}&body=${encodeURIComponent(`Role: ${j.title}\nJob type: ${j.type}\n\n`)}`
</script>

<template>
  <div>
    <PageHero eyebrow="Careers" title="Apply" em="today" :lead="CAREERS.lead" :scene="0" label="Careers">
      <a href="#jobs" class="btn btn-gold btn-lg">Job openings</a>
      <a :href="`mailto:${EMAIL}`" class="btn btn-ghost btn-lg">{{ EMAIL }}</a>
    </PageHero>

    <CoSection id="jobs" n="01" label="Openings" :scene="1" eyebrow="Job openings" title="Open" em="roles">
      <ul class="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        <li v-for="j in CAREERS.jobs" :key="j.slug" v-spot data-in class="card spot flex flex-col gap-8 p-7 md:p-9">
          <div class="flex items-start justify-between gap-4">
            <h3 class="display text-4xl">{{ j.title }}</h3>
            <span class="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong text-gold"><PhBriefcase :size="22" /></span>
          </div>
          <dl class="grid grid-cols-2 gap-4 border-y border-line py-5 text-sm">
            <div class="flex items-center gap-3">
              <PhGlobeHemisphereEast :size="20" class="shrink-0 text-gold" />
              <div><dt class="font-mono text-[0.7rem] tracking-[0.14em] text-dim uppercase">Job type</dt><dd class="mt-1">{{ j.type }}</dd></div>
            </div>
            <div class="flex items-center gap-3">
              <PhClock :size="20" class="shrink-0 text-gold" />
              <div><dt class="font-mono text-[0.7rem] tracking-[0.14em] text-dim uppercase">Experience</dt><dd class="num mt-1">{{ j.exp }}</dd></div>
            </div>
          </dl>
          <a :href="apply(j)" class="btn btn-gold self-start" :aria-label="`Apply now for ${j.title}`">Apply Now <PhArrowUpRight :size="16" /></a>
        </li>
      </ul>
    </CoSection>

    <CoSection id="env" n="02" label="Hiring" :scene="3" eyebrow="Work with us" title="Supportive environment to help you meet your career development and" em="aspirations" :lead="CAREERS.env">
      <ol class="relative mx-auto grid max-w-4xl gap-10 md:grid-cols-3 md:gap-6">
        <li v-for="(s, i) in CAREERS.steps" :key="s" data-in class="flex flex-col items-center text-center">
          <span class="num grid size-16 place-items-center rounded-full border border-line-strong bg-ink-2 font-mono text-sm text-red-2">0{{ i + 1 }}</span>
          <div class="mt-5 h-px w-full max-w-[10rem] bg-line-strong" />
          <h3 class="display mt-5 text-4xl">{{ s }}</h3>
        </li>
      </ol>
    </CoSection>

    <HomeCta />
  </div>
</template>

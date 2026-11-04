<script setup lang="ts">
import { PhArrowRight, PhCheckCircle, PhHandshake, PhLightning, PhShieldCheck } from '@phosphor-icons/vue'
import { ADDRESS, SIGNUP } from '~/utils/site'
import { ABOUT } from '~/utils/pages/company'

usePageSeo({ slug: 'about-us', title: 'About Us | Artix Global', desc: 'Artix Global Trading (Pty) Ltd is an FSCA regulated Forex and CFD broker in South Africa, FSP licence 53224, giving traders access to global markets.', img: { src: '/img/company/story.webp', w: 526, h: 394, alt: 'Artix Global company story' } })

const ICONS = [PhHandshake, PhShieldCheck, PhLightning]
</script>

<template>
  <div>
    <PageHero eyebrow="About Us" title="Our company" em="story" :lead="ABOUT.lead" :scene="0" label="About">
      <a v-magnetic :href="SIGNUP" class="btn btn-gold btn-lg">Start Now <PhArrowRight :size="18" /></a>
      <NuxtLink to="/contact/" class="btn btn-ghost btn-lg">Contact Us</NuxtLink>
    </PageHero>

    <CoSection id="who" n="01" label="Who we are" :scene="1" eyebrow="Who we are" title="A licensed" em="FSCA broker">
      <div class="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <figure data-in class="card p-3">
          <img src="/img/company/story.webp" alt="Artix Global company story" width="526" height="394" loading="lazy" decoding="async" class="h-auto w-full rounded-[1rem]">
        </figure>
        <div class="flex flex-col gap-8">
          <div data-in>
            <h3 class="font-mono text-xs tracking-[0.16em] text-gold uppercase">What we do</h3>
            <p class="mt-3 text-lg text-fg/90">{{ ABOUT.lead }}</p>
          </div>
          <div data-in>
            <h3 class="font-mono text-xs tracking-[0.16em] text-gold uppercase">Who we are</h3>
            <p v-for="t in ABOUT.who" :key="t" class="mt-3 text-mute">{{ t }}</p>
          </div>
        </div>
      </div>
      <dl class="mt-14 grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="f in ABOUT.facts" :key="f.k" data-in class="flex flex-col gap-2 bg-ink-2 p-6 text-center">
          <dt class="font-mono text-[0.7rem] tracking-[0.16em] text-dim uppercase">{{ f.k }}</dt>
          <dd class="num display text-3xl">{{ f.v }}</dd>
        </div>
      </dl>
      <p data-in class="mt-6 text-center text-sm text-dim">Registered office: {{ ADDRESS }}</p>
    </CoSection>

    <CoSection id="plat" n="02" label="Platform" :scene="2" eyebrow="Trade on our" title="World class" em="platform">
      <div class="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div class="order-2 flex flex-col gap-6 md:order-1">
          <p data-in class="text-lg text-fg/90">{{ ABOUT.platform.body }}</p>
          <ul class="flex flex-col">
            <li v-for="t in ABOUT.platform.topics" :key="t" data-in class="flex min-h-14 items-center gap-4 border-b border-line">
              <PhCheckCircle :size="20" weight="fill" class="shrink-0 text-gold" />{{ t }}
            </li>
          </ul>
          <div data-in><a :href="SIGNUP" class="btn btn-gold">Open Account <PhArrowRight :size="16" /></a></div>
        </div>
        <figure data-in class="order-1 md:order-2">
          <img v-tilt src="/img/company/ntrader.webp" alt="nTrader platform on desktop and mobile" width="794" height="563" loading="lazy" decoding="async" class="h-auto w-full">
        </figure>
      </div>
    </CoSection>

    <CoSection id="mission" n="03" label="Mission" :scene="3" eyebrow="Our mission" title="Empowering success, how we're" em="making a difference" :lead="ABOUT.mission.lead">
      <ul class="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
        <li v-for="(v, i) in ABOUT.mission.values" :key="v" v-spot data-in class="card spot flex flex-col items-center gap-5 px-6 py-10 text-center">
          <span class="num font-mono text-xs text-red-2">0{{ i + 1 }}</span>
          <span class="grid size-14 place-items-center rounded-full border border-line-strong text-gold"><component :is="ICONS[i]" :size="24" /></span>
          <h3 class="display text-3xl">{{ v }}</h3>
        </li>
      </ul>
    </CoSection>

    <HomeCta />
  </div>
</template>

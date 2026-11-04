<script setup lang="ts">
import { PhBriefcase, PhEnvelopeSimple, PhMapPin } from '@phosphor-icons/vue'
import { ADDRESS, EMAIL } from '~/utils/site'
import { CONTACT } from '~/utils/pages/company'

usePageSeo({ slug: 'contact', title: 'Contact Us | Artix Global', desc: `Contact Artix Global at ${EMAIL} or visit us at ${ADDRESS}.`, crumb: 'Contact' })

const MAP = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`
const CARDS = [
  { icon: PhBriefcase, t: 'Business submissions', d: CONTACT.business, link: EMAIL, href: `mailto:${EMAIL}?subject=${encodeURIComponent('Business plan submission')}` },
  { icon: PhEnvelopeSimple, t: 'Email', d: '', link: EMAIL, href: `mailto:${EMAIL}` },
  { icon: PhMapPin, t: 'Address', d: ADDRESS, link: 'Open in Google Maps', href: MAP }
]
</script>

<template>
  <div>
    <PageHero eyebrow="Contact" title="Contact" em="us" :scene="0" label="Contact">
      <a v-magnetic :href="`mailto:${EMAIL}`" class="btn btn-gold btn-lg"><PhEnvelopeSimple :size="18" /> {{ EMAIL }}</a>
      <a href="#enquiry" class="btn btn-ghost btn-lg">Enquiry Form</a>
    </PageHero>

    <CoSection id="enquiry" n="01" label="Enquiry" :scene="2" eyebrow="Get in touch" title="Send us a" em="message">
      <div class="grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        <ul class="flex flex-col gap-4">
          <li v-for="c in CARDS" :key="c.t" v-spot data-in class="card spot flex gap-5 p-6 text-left">
            <span class="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong text-gold"><component :is="c.icon" :size="22" /></span>
            <div class="flex min-w-0 flex-col gap-2">
              <h3 class="font-mono text-xs tracking-[0.16em] text-gold uppercase">{{ c.t }}</h3>
              <p v-if="c.d" class="text-mute">{{ c.d }}</p>
              <a :href="c.href" :target="c.href.startsWith('http') ? '_blank' : undefined" :rel="c.href.startsWith('http') ? 'noopener noreferrer' : undefined" class="inline-flex min-h-11 items-center break-all text-gold-2 underline decoration-gold/40 underline-offset-4 hover:decoration-gold">{{ c.link }}</a>
            </div>
          </li>
        </ul>
        <div data-in><CoContactForm /></div>
      </div>
    </CoSection>

    <HomeCta />
  </div>
</template>

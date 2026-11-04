<script setup lang="ts">
import gsap from 'gsap'
import { PhPlus } from '@phosphor-icons/vue'

const { n = '06' } = defineProps<{ n?: string }>()
const root = ref<HTMLElement | null>(null)
const open = ref(0)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  gsap.from(el.querySelectorAll('[data-q]'), { y: 24, autoAlpha: 0, stagger: 0.06, duration: 0.9, scrollTrigger: { trigger: el, start: 'top 70%', once: true } })
})

useHead({ script: [ldJson({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })] })
</script>

<template>
  <section ref="root" data-scene="0" class="relative py-24 text-center md:py-36" aria-labelledby="fq-h">
    <SideLabel :n="n" text="FAQ" />
    <div class="wrap flex flex-col items-center">
      <div class="flex flex-col items-center">
        <p class="eyebrow">FAQ</p>
        <h2 id="fq-h" class="display mt-4 text-[length:var(--text-h2)]">Questions, <em class="text-red-2">answered</em></h2>
        <p class="mt-5 max-w-sm text-mute">Need more help? Write to <a :href="`mailto:${EMAIL}`" class="text-gold-2 underline decoration-gold/40 underline-offset-4 hover:decoration-gold">{{ EMAIL }}</a>.</p>
        <div class="mt-10 h-14 w-px bg-gradient-to-b from-gold to-transparent" />
      </div>
      <div class="mt-4 w-full max-w-3xl">
        <div v-for="(f, i) in FAQ" :key="f.q" data-q class="border-b border-line first:border-t">
          <h3>
            <button
              :id="`fq-b-${i}`" class="flex min-h-16 w-full flex-col items-center justify-center gap-3 py-6 text-lg md:flex-row md:justify-between md:gap-6 md:text-left md:text-xl"
              :aria-expanded="open === i" :aria-controls="`fq-p-${i}`" @click="open = open === i ? -1 : i"
            >
              {{ f.q }}
              <span class="grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-300" :class="open === i ? 'border-gold bg-gold text-on-gold' : 'border-line-strong text-mute'">
                <PhPlus :size="14" weight="bold" class="transition-transform duration-300" :class="{ 'rotate-45': open === i }" />
              </span>
            </button>
          </h3>
          <div :id="`fq-p-${i}`" role="region" :aria-labelledby="`fq-b-${i}`" class="acc" :class="{ on: open === i }">
            <div class="min-h-0 overflow-hidden">
              <p class="mx-auto max-w-2xl pb-7 text-mute md:mx-0 md:pr-14 md:text-left">{{ f.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.acc { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 360ms var(--ease-out-quart); }
.acc.on { grid-template-rows: 1fr; }
.acc:not(.on) { visibility: hidden; transition: grid-template-rows 360ms var(--ease-out-quart), visibility 0s 360ms; }
@media (prefers-reduced-motion: reduce) { .acc, .acc:not(.on) { transition: none; } }
</style>

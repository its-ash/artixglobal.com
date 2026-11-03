<script setup lang="ts">
import { PhEnvelopeSimple, PhMapPin, PhFilePdf } from '@phosphor-icons/vue'

const year = new Date().getFullYear()
const markets = NAV.find(g => g.label === 'Markets')!.links
const company = NAV.find(g => g.label === 'Company')!.links
</script>

<template>
  <footer class="relative overflow-hidden border-t border-line bg-ink-2/50 pb-28 pt-20 lg:pb-12">
    <div class="wrap flex flex-col items-center text-center">
      <div class="flex flex-col items-center">
        <BrandLogo class="h-14" />
        <p class="mt-6 max-w-md text-mute">Artix Global is a global forex and CFD broker that gives traders strong access to global financial markets.</p>
        <ul class="mt-6 grid justify-items-center gap-2 text-sm">
          <li class="flex flex-col items-center gap-2 text-mute sm:flex-row"><PhMapPin :size="18" class="shrink-0 text-gold" /><address class="not-italic">{{ ADDRESS }}</address></li>
          <li><a :href="`mailto:${EMAIL}`" class="flex min-h-11 items-center gap-2 text-mute transition-colors hover:text-fg"><PhEnvelopeSimple :size="18" class="text-gold" />{{ EMAIL }}</a></li>
        </ul>
        <div class="mt-12 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>
      <nav class="mt-12 grid w-full max-w-4xl grid-cols-2 gap-10 sm:grid-cols-3 [&_a]:justify-center" aria-label="Footer">
        <div>
          <h2 class="eyebrow !text-dim">Markets</h2>
          <ul class="mt-5 grid gap-1">
            <li v-for="l in markets" :key="l.href"><a :href="l.href" class="flex min-h-10 items-center text-mute transition-colors hover:text-fg">{{ l.label }}</a></li>
          </ul>
        </div>
        <div>
          <h2 class="eyebrow !text-dim">Company</h2>
          <ul class="mt-5 grid gap-1">
            <li v-for="l in company" :key="l.href"><a :href="l.href" class="flex min-h-10 items-center text-mute transition-colors hover:text-fg">{{ l.label }}</a></li>
          </ul>
        </div>
        <div class="col-span-2 sm:col-span-1">
          <h2 class="eyebrow !text-dim">Documents</h2>
          <ul class="mt-5 grid gap-1">
            <li v-for="d in DOCS" :key="d.href">
              <a :href="d.href" target="_blank" rel="noopener" class="flex min-h-10 items-center gap-2 text-mute transition-colors hover:text-fg">
                <PhFilePdf :size="16" class="shrink-0 text-gold" />{{ d.label }}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="wrap mt-16">
      <div class="mx-auto max-w-4xl rounded-2xl border border-line p-5 text-center text-[0.82rem] leading-relaxed text-dim md:p-6">
        <strong class="font-medium text-mute">Risk warning:</strong> {{ RISK }}
      </div>
      <div class="mt-8 flex flex-col items-center gap-3 text-xs text-dim">
        <p>© {{ year }} Artix Global. All rights reserved.</p>
        <a :href="SIGNUP" class="text-gold-2 hover:underline">Open an account</a>
      </div>
    </div>

    <p class="ghost display pointer-events-none mt-12 select-none text-center leading-none text-fg/[0.04]" aria-hidden="true">ARTIX</p>
  </footer>
</template>

<style scoped>
.ghost { font-size: clamp(6rem, 26vw, 24rem); margin-bottom: -0.2em; }
</style>

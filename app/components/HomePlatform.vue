<script setup lang="ts">
import type { Component } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PhArrowUpRight, PhDesktop, PhDeviceMobile } from '@phosphor-icons/vue'
import BrandNtrader from '~/components/icons/BrandNtrader.vue'
import BrandChrome from '~/components/icons/BrandChrome.vue'
import type { DlIcon } from '~/utils/site'

const ICON: Record<DlIcon, Component> = { desktop: PhDesktop, web: BrandChrome, mobile: PhDeviceMobile }
const CYCLE = 2.2

const root = ref<HTMLElement | null>(null)
const live = ref(-1)

const local = (href: string) => href.startsWith('/')
const label = (o: { label: string, href: string }) => `nTrader for ${o.label}${local(o.href) ? '' : ' (opens in a new tab)'}`

useMotion(root, ({ reduce, fine }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  gsap.from(q('[data-up]'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  gsap.from(q('.p-card'), { y: 80, autoAlpha: 0, duration: 1.2, scrollTrigger: { trigger: q('.p-card')[0], start: 'top 88%', once: true } })
  gsap.from(q('.p-opt'), { y: 40, autoAlpha: 0, stagger: 0.07, duration: 1, scrollTrigger: { trigger: q('.p-card')[0], start: 'top 70%', once: true } })
  gsap.fromTo(q('[data-ghost]'), { xPercent: 8 }, { xPercent: -8, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })

  let loop: gsap.core.Tween | undefined
  const next = () => {
    live.value = (live.value + 1) % NTRADER.opts.length
    loop = gsap.delayedCall(CYCLE, next)
  }
  const run = (on: boolean) => {
    loop?.kill()
    live.value = -1
    if (on) loop = gsap.delayedCall(0.6, next)
  }
  const auto = fine ? undefined : ScrollTrigger.create({ trigger: q('.p-card')[0], start: 'top 70%', end: 'bottom 30%', onToggle: s => run(s.isActive) })
  return () => { loop?.kill(); auto?.kill(); live.value = -1 }
})
</script>

<template>
  <section id="platform" ref="root" data-scene="4" class="relative isolate overflow-hidden py-24 md:py-36" aria-labelledby="pf-h">
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="grid-lines absolute inset-0" />
      <div data-ghost class="absolute inset-x-0 top-[42%] grid justify-items-center">
        <span class="display whitespace-nowrap text-[clamp(7rem,26vw,24rem)] leading-none text-fg/[0.05]">nTrader</span>
      </div>
    </div>
    <SideLabel n="03" text="Platforms" />

    <div class="wrap flex flex-col items-center text-center">
      <p data-up class="eyebrow flex items-center gap-3">
        <span class="size-1.5 rounded-full bg-gold" />nTrader<span class="size-1.5 rounded-full bg-gold" />
      </p>
      <h2 id="pf-h" data-up class="display mt-4 max-w-[16ch] text-[length:var(--text-h2)]">Built for precision, speed and <em class="text-red-2">simplicity</em></h2>
      <p data-up class="mt-6 max-w-2xl text-mute">Trade on nTrader. Get it on your device.</p>
    </div>

    <div class="wrap mt-8 md:mt-10">
      <div class="p-card relative isolate w-full overflow-hidden rounded-[2rem] border border-line bg-ink p-5 text-fg sm:p-8 lg:p-12">
        <ClientOnly><PlatformField /></ClientOnly>
        <span class="p-shade pointer-events-none absolute inset-0 -z-[5]" aria-hidden="true" />

        <div class="flex flex-col items-center gap-5 text-center lg:flex-row lg:text-left">
          <BrandNtrader :size="72" class="block shrink-0" aria-hidden="true" />
          <div>
            <p class="display text-4xl md:text-5xl">{{ NTRADER.label }}</p>
            <p class="mt-2 max-w-md text-sm leading-relaxed text-fg/80 md:text-base">{{ NTRADER.desc }}</p>
          </div>
        </div>

        <div class="my-8 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent lg:my-10" />

        <ul class="grid w-full gap-2.5 sm:grid-cols-3 sm:gap-3">
          <li v-for="(o, i) in NTRADER.opts" :key="o.id" class="p-opt min-w-0">
            <a
              :href="o.href"
              v-bind="local(o.href) ? {} : { target: '_blank', rel: 'noopener noreferrer' }"
              class="dl relative isolate flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-line-strong bg-ink/80 p-4 text-left sm:min-h-[14rem] sm:flex-col sm:items-start sm:justify-between sm:p-6"
              :data-live="live === i || undefined"
              :aria-label="label(o)"
            >
              <span class="dl-glow pointer-events-none absolute inset-0 -z-[1]" aria-hidden="true" />
              <component :is="ICON[o.icon]" :size="170" weight="thin" class="dl-ghost pointer-events-none absolute -bottom-10 -right-10 -z-[1] max-sm:-bottom-8 max-sm:size-28" aria-hidden="true" />
              <span class="dl-ico relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-line-strong bg-ink-2 text-gold-2 sm:size-14">
                <component :is="ICON[o.icon]" :size="24" weight="duotone" class="dl-i1" aria-hidden="true" />
                <component :is="ICON[o.icon]" :size="24" weight="fill" class="dl-i2 absolute" aria-hidden="true" />
              </span>
              <span class="min-w-0 flex-1 sm:flex-none">
                <span class="block font-mono text-[0.65rem] tracking-[0.16em] text-fg/60 uppercase max-sm:hidden">Open</span>
                <span class="block font-semibold sm:mt-1 sm:font-[family-name:var(--font-display)] sm:text-3xl sm:font-normal sm:leading-none sm:tracking-[-0.02em]">{{ o.label }}</span>
                <span class="mt-0.5 block truncate text-xs text-fg/75 sm:text-sm">{{ o.title }}</span>
              </span>
              <span class="dl-arrow grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-fg/80 sm:absolute sm:right-5 sm:top-5" aria-hidden="true">
                <PhArrowUpRight :size="16" weight="bold" />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid-lines {
  background-image: linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 75% 70% at 50% 40%, #000 30%, transparent 85%);
}
.p-shade { background: linear-gradient(180deg, color-mix(in oklab, var(--color-ink) 70%, transparent), color-mix(in oklab, var(--color-ink) 15%, transparent) 55%, color-mix(in oklab, var(--color-ink) 55%, transparent)); }

.dl { transition: border-color 260ms ease, translate 360ms var(--ease-out-expo), scale 160ms var(--ease-out-quart); }
.dl:active { scale: 0.98; }
.dl-glow { opacity: 0; background: radial-gradient(120% 90% at 50% 100%, color-mix(in oklab, var(--color-gold) 18%, transparent), transparent 60%); transition: opacity 360ms ease; }
.dl-ghost { opacity: 0.08; transition: opacity 500ms ease, rotate 700ms var(--ease-out-expo), scale 700ms var(--ease-out-expo), translate 700ms var(--ease-out-expo); }
.dl-ico, .dl-arrow { transition: background-color 240ms ease, border-color 240ms ease, color 240ms ease, rotate 420ms var(--ease-out-expo), translate 360ms var(--ease-out-expo), scale 420ms var(--ease-out-expo); }
.dl-i1, .dl-i2 { transition: translate 420ms var(--ease-out-expo), opacity 240ms ease; }
.dl-i2 { translate: 0 140%; opacity: 0; }

.dl[data-live] { border-color: color-mix(in oklab, var(--color-gold) 60%, transparent); translate: 0 -3px; }
.dl[data-live] .dl-glow { opacity: 1; }
.dl[data-live] .dl-ghost { opacity: 0.22; rotate: -10deg; scale: 1.08; translate: -6px -6px; }
.dl[data-live] .dl-ico { background: var(--color-gold); border-color: var(--color-gold); color: var(--color-on-gold); rotate: -6deg; scale: 1.06; }
.dl[data-live] .dl-i1 { translate: 0 -140%; opacity: 0; }
.dl[data-live] .dl-i2 { translate: 0 0; opacity: 1; }
.dl[data-live] .dl-arrow { background: var(--color-gold); border-color: var(--color-gold); color: var(--color-on-gold); translate: 0 2px; }

@media (hover: hover) and (pointer: fine) {
  .dl:hover { border-color: color-mix(in oklab, var(--color-gold) 60%, transparent); translate: 0 -3px; }
  .dl:hover .dl-glow { opacity: 1; }
  .dl:hover .dl-ghost { opacity: 0.22; rotate: -10deg; scale: 1.08; translate: -6px -6px; }
  .dl:hover .dl-ico { background: var(--color-gold); border-color: var(--color-gold); color: var(--color-on-gold); rotate: -6deg; scale: 1.06; }
  .dl:hover .dl-i1 { translate: 0 -140%; opacity: 0; }
  .dl:hover .dl-i2 { translate: 0 0; opacity: 1; }
  .dl:hover .dl-arrow { background: var(--color-gold); border-color: var(--color-gold); color: var(--color-on-gold); translate: 0 2px; }
}

@media (prefers-reduced-motion: reduce) {
  .dl, .dl-ghost, .dl-ico, .dl-arrow, .dl-i1, .dl-i2 { transition-property: opacity, background-color, border-color, color; }
  .dl:hover, .dl:active, .dl:hover .dl-ghost, .dl:hover .dl-ico, .dl:hover .dl-arrow { translate: none; rotate: none; scale: none; }
  .dl:hover .dl-i1, .dl:hover .dl-i2 { translate: 0 0; }
}
</style>

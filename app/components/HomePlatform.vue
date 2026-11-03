<script setup lang="ts">
import type { Component } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PhArrowUpRight, PhDownloadSimple, PhDesktop, PhDeviceMobile } from '@phosphor-icons/vue'
import BrandMetaTrader from '~/components/icons/BrandMetaTrader.vue'
import BrandNtrader from '~/components/icons/BrandNtrader.vue'
import BrandWindows from '~/components/icons/BrandWindows.vue'
import BrandApple from '~/components/icons/BrandApple.vue'
import BrandAndroid from '~/components/icons/BrandAndroid.vue'
import BrandPlay from '~/components/icons/BrandPlay.vue'
import BrandChrome from '~/components/icons/BrandChrome.vue'
import type { DlIcon } from '~/utils/site'

const ICON: Record<DlIcon, Component> = { desktop: PhDesktop, web: BrandChrome, mobile: PhDeviceMobile, windows: BrandWindows, ios: BrandApple, android: BrandAndroid, play: BrandPlay }
const LOGO = { ntrader: BrandNtrader, mt5: BrandMetaTrader }
const CYCLE = 2.2

const root = ref<HTMLElement | null>(null)
const idx = ref(0)
const live = ref(-1)
const tab = computed(() => DOWNLOADS[idx.value] ?? DOWNLOADS[0]!)

const onKey = (e: KeyboardEvent) => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return
  e.preventDefault()
  const last = DOWNLOADS.length - 1
  idx.value = e.key === 'ArrowRight' ? Math.min(last, idx.value + 1) : e.key === 'ArrowLeft' ? Math.max(0, idx.value - 1) : e.key === 'Home' ? 0 : last
  nextTick(() => root.value?.querySelector<HTMLButtonElement>(`#ptab-${tab.value.id}`)?.focus())
}
const local = (href: string) => href.startsWith(ORIGIN)
const label = (o: { id: string, label: string, href: string }) =>
  `${tab.value.id === 'mt5' ? (o.id === 'web' ? 'Open MetaTrader 5 for' : 'Download MetaTrader 5 for') : 'nTrader for'} ${o.label}${local(o.href) ? '' : ' (opens in a new tab)'}`

useMotion(root, ({ reduce, fine }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  gsap.fromTo(q('[data-device]'), { rotateX: 28, yPercent: 10, scale: 0.86 }, {
    rotateX: 0, yPercent: 0, scale: 1, ease: 'none',
    scrollTrigger: { trigger: q('[data-stage]')[0], start: 'top 95%', end: 'center 55%', scrub: 0.6 }
  })
  gsap.to(q('[data-shine]'), { xPercent: 220, ease: 'none', scrollTrigger: { trigger: q('[data-stage]')[0], start: 'top 80%', end: 'bottom 20%', scrub: true } })
  gsap.from(q('[data-up]'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  gsap.from(q('.p-card'), { y: 60, scale: 0.96, autoAlpha: 0, duration: 1.2, scrollTrigger: { trigger: q('.p-card')[0], start: 'top 85%', once: true } })

  let loop: gsap.core.Tween | undefined
  const next = () => {
    live.value = (live.value + 1) % tab.value.opts.length
    loop = gsap.delayedCall(CYCLE, next)
  }
  const run = (on: boolean) => {
    loop?.kill()
    live.value = -1
    if (on) loop = gsap.delayedCall(0.6, next)
  }
  const auto = fine ? undefined : ScrollTrigger.create({ trigger: q('.p-card')[0], start: 'top 70%', end: 'bottom 30%', onToggle: s => run(s.isActive) })
  const stop = watch(idx, () => nextTick(() => {
    if (auto?.isActive) run(true)
    gsap.fromTo(q('.p-logo, .p-desc'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' })
    gsap.fromTo(q('.p-opt'), { autoAlpha: 0, y: 16, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
  }))
  return () => { stop(); loop?.kill(); auto?.kill(); live.value = -1 }
})
</script>

<template>
  <section id="platform" ref="root" data-scene="4" class="relative overflow-hidden py-24 md:py-36" aria-labelledby="pf-h">
    <SideLabel n="03" text="Platforms" />
    <div class="wrap text-center">
      <p data-up class="eyebrow">nTrader and MetaTrader 5</p>
      <h2 id="pf-h" data-up class="display mx-auto mt-4 max-w-[16ch] text-[length:var(--text-h2)]">Built for precision, speed and <em class="text-red-2">simplicity</em></h2>
      <p data-up class="mx-auto mt-6 max-w-2xl text-mute">Trade on nTrader or MetaTrader 5. Pick a platform to get it on your device.</p>
    </div>

    <div class="wrap mt-14 grid items-center gap-6 md:mt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
    <div data-stage class="stage relative">
      <div class="stage-glow pointer-events-none absolute inset-x-[10%] top-[20%] -z-10 h-2/3 rounded-full" />
      <div data-device class="relative origin-bottom">
        <img src="/img/ntrader-laptop.webp" alt="nTrader trading platform on a laptop" width="1000" height="666" loading="lazy" decoding="async" class="mx-auto h-auto w-full max-w-5xl select-none" draggable="false">
        <div class="pointer-events-none absolute inset-0 overflow-hidden [mask-image:url(/img/ntrader-laptop.webp)] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat]">
          <div data-shine class="shine absolute inset-y-0 -left-1/2 w-1/3" />
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center">
      <div class="mb-10 h-16 w-px bg-gradient-to-b from-transparent to-gold lg:hidden" />
      <div class="p-card relative isolate w-full overflow-hidden rounded-[1.25rem] border border-line bg-ink-2/90 p-5 text-center sm:p-8 xl:p-10">
        <span class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_50%_0%,color-mix(in_oklab,var(--color-gold)_12%,transparent),transparent_70%)]" aria-hidden="true" />

        <div
          class="relative mx-auto grid w-full max-w-md grid-cols-2 rounded-full border border-line bg-ink p-1"
          role="tablist"
          aria-label="Trading platform"
          @keydown="onKey"
        >
          <span class="p-pill pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-gold" :style="{ translate: `${idx * 100}% 0` }" aria-hidden="true" />
          <button
            v-for="(t, i) in DOWNLOADS"
            :id="`ptab-${t.id}`"
            :key="t.id"
            type="button"
            role="tab"
            class="p-tab relative z-[1] flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 text-sm font-semibold"
            :class="idx === i ? 'text-on-gold' : 'text-mute'"
            :aria-selected="idx === i"
            :aria-controls="`ppanel-${t.id}`"
            :tabindex="idx === i ? 0 : -1"
            @click="idx = i"
          >
            <component :is="LOGO[t.id]" :size="24" aria-hidden="true" />
            {{ t.label }}
          </button>
        </div>

        <div :id="`ppanel-${tab.id}`" class="mt-8 flex flex-col items-center" role="tabpanel" :aria-labelledby="`ptab-${tab.id}`">
          <component :is="LOGO[tab.id]" :size="88" class="p-logo mb-6 block" aria-hidden="true" />
          <p class="p-desc max-w-xl text-sm leading-relaxed text-mute md:text-base">{{ tab.desc }}</p>

          <ul :key="tab.id" class="mt-8 grid w-full gap-2.5 text-left sm:gap-3" :class="tab.opts.length > 3 ? 'sm:grid-cols-2 lg:grid-cols-1' : 'sm:grid-cols-3 lg:grid-cols-1'">
            <li v-for="(o, i) in tab.opts" :key="o.id" class="p-opt min-w-0">
              <a
                :href="o.href"
                v-bind="local(o.href) ? {} : { target: '_blank', rel: 'noopener noreferrer' }"
                class="dl relative isolate flex h-full items-center gap-4 overflow-hidden rounded-xl border border-line bg-ink p-4 sm:flex-col sm:p-6 sm:text-center lg:flex-row lg:p-4 lg:text-left"
                :data-live="live === i || undefined"
                :aria-label="label(o)"
              >
                <span class="dl-glow pointer-events-none absolute inset-0 -z-[1]" aria-hidden="true" />
                <component :is="ICON[o.icon]" :size="160" weight="thin" class="dl-ghost pointer-events-none absolute -bottom-10 -right-8 -z-[1] max-sm:-bottom-8 max-sm:size-28 lg:size-24 lg:-bottom-6" aria-hidden="true" />
                <span class="dl-ico relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg border border-line-strong bg-ink-2 text-gold-2 sm:size-12">
                  <component :is="ICON[o.icon]" :size="22" weight="duotone" class="dl-i1" aria-hidden="true" />
                  <component :is="ICON[o.icon]" :size="22" weight="fill" class="dl-i2 absolute" aria-hidden="true" />
                </span>
                <span class="min-w-0 flex-1 sm:mt-6 lg:mt-0">
                  <span class="block font-semibold sm:text-xl sm:tracking-tight">{{ o.label }}</span>
                  <span class="mt-0.5 block truncate text-xs text-mute sm:text-sm">{{ o.title }}</span>
                </span>
                <span class="dl-arrow grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-mute sm:mt-6 lg:mt-0" aria-hidden="true">
                  <PhDownloadSimple v-if="tab.id === 'mt5' && o.id !== 'web'" :size="15" weight="bold" />
                  <PhArrowUpRight v-else :size="15" weight="bold" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  </section>
</template>

<style scoped>
.stage { perspective: 1400px; }
.stage-glow { background: radial-gradient(closest-side, color-mix(in oklab, var(--color-gold) 18%, transparent), transparent); }
.shine { background: linear-gradient(100deg, transparent, rgb(255 255 255 / 0.07), transparent); transform: skewX(-12deg); }

.p-pill { transition: translate 420ms var(--ease-out-expo); }
.p-tab { transition: color 220ms ease, scale 160ms var(--ease-out-quart); }
.p-tab:active { scale: 0.97; }

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
  .p-tab[aria-selected="false"]:hover { color: var(--color-fg); }
  .dl:hover { border-color: color-mix(in oklab, var(--color-gold) 60%, transparent); translate: 0 -3px; }
  .dl:hover .dl-glow { opacity: 1; }
  .dl:hover .dl-ghost { opacity: 0.22; rotate: -10deg; scale: 1.08; translate: -6px -6px; }
  .dl:hover .dl-ico { background: var(--color-gold); border-color: var(--color-gold); color: var(--color-on-gold); rotate: -6deg; scale: 1.06; }
  .dl:hover .dl-i1 { translate: 0 -140%; opacity: 0; }
  .dl:hover .dl-i2 { translate: 0 0; opacity: 1; }
  .dl:hover .dl-arrow { background: var(--color-gold); border-color: var(--color-gold); color: var(--color-on-gold); translate: 0 2px; }
}

@media (prefers-reduced-motion: reduce) {
  .p-pill { transition: none; }
  .p-tab, .dl, .dl-ghost, .dl-ico, .dl-arrow, .dl-i1, .dl-i2 { transition-property: opacity, background-color, border-color, color; }
  .p-tab:active, .dl:hover, .dl:active, .dl:hover .dl-ghost, .dl:hover .dl-ico, .dl:hover .dl-arrow { translate: none; rotate: none; scale: none; }
  .dl:hover .dl-i1, .dl:hover .dl-i2 { translate: 0 0; }
}
</style>

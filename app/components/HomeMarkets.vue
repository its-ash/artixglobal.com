<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PhCoins, PhCurrencyDollar, PhDrop, PhBuildings, PhChartLineUp, PhCurrencyBtc, PhArrowUpRight } from '@phosphor-icons/vue'

const ICONS = { metals: PhCoins, forex: PhCurrencyDollar, commodities: PhDrop, stocks: PhBuildings, indices: PhChartLineUp, crypto: PhCurrencyBtc } as const

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const { $lenis } = useNuxtApp()
const seen = ref<Set<number>>(new Set())
let io: IntersectionObserver | null = null

onMounted(() => {
  if (!track.value) return
  io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      const i = Number((e.target as HTMLElement).dataset.i)
      if (e.isIntersecting) seen.value = new Set(seen.value).add(i)
    })
  }, { threshold: 0.3 })
  track.value.querySelectorAll('[data-i]').forEach(c => io!.observe(c))
})
onBeforeUnmount(() => io?.disconnect())

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const t = track.value!
  const dist = () => t.scrollWidth - t.clientWidth
  const tw = gsap.to(t, {
    x: () => -dist(), ease: 'none',
    scrollTrigger: { trigger: el, start: 'top top', end: () => `+=${dist() * 1.1}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
      onUpdate: s => el.style.setProperty('--p', s.progress.toFixed(3)) }
  })
  t.querySelectorAll<HTMLElement>('[data-i]').forEach((c) => {
    gsap.timeline({ scrollTrigger: { trigger: c, containerAnimation: tw, start: 'left right', end: 'right left', scrub: true } })
      .fromTo(c, { scale: 0.86, opacity: 0.4 }, { scale: 1, opacity: 1, ease: 'power1.out' })
      .to(c, { scale: 0.86, opacity: 0.4, ease: 'power1.in' })
      .fromTo(c.querySelector('[data-icon]'), { rotate: -90 }, { rotate: 90, ease: 'none', duration: 2 }, 0)
  })
  gsap.from(el.querySelectorAll('[data-head] > *'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })

  const st = tw.scrollTrigger!
  const inside = () => scrollY >= st.start - 2 && scrollY <= st.end + 2
  const move = (dy: number, glide = false) => {
    const y = Math.max(0, Math.min(ScrollTrigger.maxScroll(window), scrollY + dy))
    if ($lenis) $lenis.scrollTo(y, glide ? { duration: 0.9 } : { immediate: true })
    else scrollTo(0, y)
  }
  const wheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || !inside()) return
    e.preventDefault()
    move(e.deltaX * 1.2)
  }

  let sx = 0
  let sy = 0
  let lx = 0
  let lt = 0
  let vx = 0
  let axis = ''
  const start = (e: TouchEvent) => {
    const p = e.touches[0]!
    sx = lx = p.clientX
    sy = p.clientY
    lt = performance.now()
    vx = 0
    axis = ''
  }
  const drag = (e: TouchEvent) => {
    const p = e.touches[0]!
    if (!axis) {
      const dx = Math.abs(p.clientX - sx)
      const dy = Math.abs(p.clientY - sy)
      if (dx < 6 && dy < 6) return
      axis = dx > dy ? 'x' : 'y'
    }
    if (axis !== 'x') return
    if (e.cancelable) e.preventDefault()
    const now = performance.now()
    const d = lx - p.clientX
    vx = d / Math.max(1, now - lt)
    lx = p.clientX
    lt = now
    move(d * 1.6)
  }
  const end = () => {
    if (axis === 'x' && Math.abs(vx) > 0.2) move(vx * 420, true)
    axis = ''
  }
  el.addEventListener('wheel', wheel, { passive: false })
  t.addEventListener('touchstart', start, { passive: true })
  t.addEventListener('touchmove', drag, { passive: false })
  t.addEventListener('touchend', end, { passive: true })
  t.addEventListener('touchcancel', end, { passive: true })
  return () => {
    el.removeEventListener('wheel', wheel)
    t.removeEventListener('touchstart', start)
    t.removeEventListener('touchmove', drag)
    t.removeEventListener('touchend', end)
    t.removeEventListener('touchcancel', end)
  }
})
</script>

<template>
  <section ref="root" data-scene="2" data-spin="1" class="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-16 text-center motion-safe:h-[100svh] motion-safe:py-0" aria-labelledby="mk-h">
    <SideLabel n="02" text="Markets" />
    <SideLabel text="Scroll or swipe" side="end" />
    <div data-head class="wrap flex flex-col items-center">
      <p class="eyebrow">Global markets access</p>
      <h2 id="mk-h" class="display mt-4 max-w-[16ch] text-[clamp(2.1rem,1.4rem+3vw,4.5rem)]">Join a platform of <em class="text-red-2">elite traders</em></h2>
      <p class="mt-4 hidden max-w-xl text-mute sm:block">Trading is the art and science of buying and selling financial instruments such as stocks, currencies, commodities and crypto.</p>
    </div>

    <div class="mt-8 text-left lg:mt-12">
      <ul
        ref="track"
        class="track flex snap-x snap-mandatory gap-4 overflow-x-auto px-[calc(50vw-min(39vw,12rem))] pb-2 lg:gap-6 lg:px-[calc(50vw-13.5rem)] motion-safe:snap-none motion-safe:overflow-visible motion-safe:touch-pan-y"
        aria-label="Markets"
      >
        <li v-for="(m, i) in MARKETS" :key="m.key" :data-i="i" class="w-[78vw] max-w-[24rem] shrink-0 snap-center lg:w-[27rem] lg:max-w-none">
          <a v-spot v-tilt="4" :href="m.href" class="card spot group flex h-[min(27rem,58svh)] flex-col p-6 transition-colors duration-300 hover:border-line-strong lg:h-[min(31rem,56svh)] lg:p-8" :class="{ on: seen.has(i) }">
            <div class="halo pointer-events-none absolute -right-24 -top-24 size-72 rounded-full" />
            <div class="relative flex items-start justify-between">
              <span class="num font-mono text-xs text-dim">0{{ i + 1 }} / 0{{ MARKETS.length }}</span>
              <span data-icon class="grid size-12 place-items-center rounded-full border border-line-strong text-gold">
                <component :is="ICONS[m.key as keyof typeof ICONS]" :size="22" />
              </span>
            </div>
            <h3 class="display relative mt-8 text-[2.6rem] lg:text-5xl">{{ m.name }}</h3>
            <p class="relative mt-3 text-[0.95rem] text-mute">{{ m.desc }}</p>
            <svg viewBox="0 0 280 64" class="spark relative mt-auto h-16 w-full overflow-visible" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient :id="`sg-${m.key}`" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stop-color="var(--color-gold)" stop-opacity=".25" />
                  <stop offset="1" stop-color="var(--color-gold)" stop-opacity="0" />
                </linearGradient>
              </defs>
              <path class="area" :d="`${sparkPath(m.seed, 280, 64)} L280 64 L0 64 Z`" :fill="`url(#sg-${m.key})`" />
              <path class="line" :d="sparkPath(m.seed, 280, 64)" pathLength="1" fill="none" stroke="var(--color-gold)" stroke-width="1.5" vector-effect="non-scaling-stroke" />
            </svg>
            <div class="relative mt-5 flex items-end justify-between border-t border-line pt-5">
              <div>
                <p class="num display text-4xl text-gold-2">{{ m.stat }}</p>
                <p class="mt-1 text-xs text-dim">{{ m.statLabel }}</p>
              </div>
              <div class="flex flex-wrap justify-end gap-1.5">
                <span v-for="s in m.symbols.slice(0, 2)" :key="s" class="rounded-full border border-line px-2.5 py-1 font-mono text-[0.68rem] text-mute">{{ s }}</span>
              </div>
            </div>
            <PhArrowUpRight :size="18" class="absolute bottom-6 right-6 text-gold opacity-0 transition duration-300 group-hover:opacity-100 lg:bottom-8 lg:right-8" aria-hidden="true" />
          </a>
        </li>
        <li class="w-px shrink-0" aria-hidden="true" />
      </ul>
    </div>

    <div class="mx-auto mt-8 flex w-[min(20rem,70vw)] items-center gap-4 font-mono text-xs text-dim motion-reduce:hidden">
      <span class="num">01</span>
      <div class="h-px flex-1 bg-line"><div class="bar h-full origin-center bg-gold" /></div>
      <span class="num">0{{ MARKETS.length }}</span>
    </div>
  </section>
</template>

<style scoped>
.track { scrollbar-width: none; overscroll-behavior-x: contain; }
.track::-webkit-scrollbar { display: none; }
.halo { background: radial-gradient(closest-side, color-mix(in oklab, var(--color-gold) 14%, transparent), transparent); }
.spark .line { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 1.6s var(--ease-out-quart); }
.spark .area { opacity: 0; transition: opacity 1s 0.6s; }
.on .spark .line { stroke-dashoffset: 0; }
.on .spark .area { opacity: 1; }
.bar { transform: scaleX(var(--p, 0)); }
@media (prefers-reduced-motion: reduce) {
  .spark .line { stroke-dashoffset: 0; transition: none; }
  .spark .area { opacity: 1; transition: none; }
}
</style>

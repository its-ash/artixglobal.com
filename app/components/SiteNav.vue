<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PhArrowUpRight, PhCaretDown } from '@phosphor-icons/vue'

const bar = ref<HTMLElement | null>(null)
const sheet = ref<HTMLElement | null>(null)
const open = ref(-1)
const menu = ref(false)
const sub = ref(-1)
const { $lenis } = useNuxtApp()
let st: ScrollTrigger | null = null
let close: ReturnType<typeof setTimeout> | undefined

const enter = (i: number) => { clearTimeout(close); open.value = i }
const leave = () => { close = setTimeout(() => { open.value = -1 }, 140) }
const onKey = (e: KeyboardEvent) => {
  if (e.key !== 'Escape') return
  open.value = -1
  menu.value = false
}

watch(menu, async (v) => {
  document.documentElement.classList.toggle('menu-open', v)
  v ? $lenis?.stop() : $lenis?.start()
  if (!v) { sub.value = -1; return }
  await nextTick()
  if (!sheet.value || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const q = gsap.utils.selector(sheet.value)
  gsap.fromTo(q('[data-m]'), { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.7, stagger: 0.045, ease: 'expo.out', delay: 0.1 })
})

onMounted(() => {
  addEventListener('keydown', onKey)
  st = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (s) => {
      const el = bar.value
      if (!el) return
      el.classList.toggle('solid', s.scroll() > 24)
      el.classList.toggle('tuck', s.direction === 1 && s.scroll() > 320 && open.value < 0 && !menu.value)
    }
  })
})
onBeforeUnmount(() => {
  removeEventListener('keydown', onKey)
  st?.kill()
  document.documentElement.classList.remove('menu-open')
})
</script>

<template>
  <div>
  <header ref="bar" class="bar fixed inset-x-0 top-0 z-50 border-b border-transparent" @mouseleave="leave">
    <a href="#main" class="sr-only z-50 bg-gold px-4 py-3 text-on-gold focus:not-sr-only focus:absolute focus:left-4 focus:top-3">Skip to content</a>
    <div class="wrap flex h-16 items-center gap-6 md:h-[4.5rem]">
      <NuxtLink to="/" class="-ml-1 flex h-11 items-center px-1" aria-label="Artix Global home">
        <BrandLogo class="h-9 md:h-10" />
      </NuxtLink>

      <nav class="ml-6 hidden h-full items-stretch lg:flex" aria-label="Main">
        <div v-for="(g, i) in NAV" :key="g.label" class="relative flex" @mouseenter="enter(i)">
          <button
            class="flex items-center gap-1.5 px-3.5 text-[0.9rem] transition-colors"
            :class="open === i ? 'text-fg' : 'text-mute hover:text-fg'"
            :aria-expanded="open === i"
            :aria-controls="`dd-${i}`"
            @click="open = open === i ? -1 : i"
            @focus="enter(i)"
          >
            {{ g.label }}
            <PhCaretDown :size="12" weight="bold" class="transition-transform duration-200" :class="{ 'rotate-180': open === i }" />
          </button>
          <Transition name="dd">
            <div v-show="open === i" :id="`dd-${i}`" class="absolute left-0 top-full pt-2" @mouseenter="enter(i)">
              <ul class="card grid min-w-[19rem] gap-0.5 p-2 shadow-2xl shadow-black/50" :class="{ 'min-w-[34rem] grid-cols-2': g.links.length > 4 }">
                <li v-for="l in g.links" :key="l.href">
                  <a :href="l.href" class="group flex min-h-11 flex-col justify-center rounded-xl px-3.5 py-2.5 transition-colors hover:bg-ink-3" @click="open = -1">
                    <span class="flex items-center gap-1.5 text-[0.92rem] text-fg">
                      {{ l.label }}
                      <PhArrowUpRight :size="12" class="-translate-x-1 text-gold opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                    </span>
                    <span v-if="l.note" class="text-[0.8rem] text-dim">{{ l.note }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </nav>

      <div class="ml-auto flex items-center gap-2">
        <a :href="LOGIN" class="hidden min-h-11 items-center px-3 text-[0.9rem] text-mute transition-colors hover:text-fg sm:flex">Login</a>
        <a v-magnetic="0.25" :href="SIGNUP" class="btn btn-gold hidden !min-h-10 !px-5 text-[0.9rem] sm:inline-flex">Open Account</a>
        <button
          class="relative grid size-11 place-items-center rounded-full border border-line-strong lg:hidden"
          :aria-expanded="menu"
          aria-controls="mnav"
          :aria-label="menu ? 'Close menu' : 'Open menu'"
          @click="menu = !menu"
        >
          <span class="burger" :class="{ x: menu }"><i /><i /></span>
        </button>
      </div>
    </div>
  </header>

    <Transition name="sheet">
      <div v-if="menu" id="mnav" ref="sheet" class="fixed inset-x-0 bottom-0 top-16 z-40 md:top-[4.5rem] flex flex-col overflow-y-auto overscroll-contain bg-ink lg:hidden" data-lenis-prevent>
        <nav class="wrap flex-1 py-4" aria-label="Mobile">
          <div v-for="(g, i) in NAV" :key="g.label" class="split-line border-b border-line">
            <div data-m>
              <button class="flex min-h-16 w-full items-center justify-between text-left" :aria-expanded="sub === i" @click="sub = sub === i ? -1 : i">
                <span class="display text-[2.1rem]">{{ g.label }}</span>
                <PhCaretDown :size="18" class="text-gold transition-transform duration-300" :class="{ 'rotate-180': sub === i }" />
              </button>
              <div class="acc" :class="{ on: sub === i }">
                <ul class="min-h-0 overflow-hidden">
                  <li v-for="l in g.links" :key="l.href">
                    <a :href="l.href" class="flex min-h-12 items-center justify-between pr-1 text-mute active:text-gold" @click="menu = false">
                      {{ l.label }}
                      <PhArrowUpRight :size="16" />
                    </a>
                  </li>
                  <li class="h-3" />
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div class="wrap sticky bottom-0 grid grid-cols-2 gap-3 border-t border-line bg-ink py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a :href="LOGIN" class="btn btn-ghost">Login</a>
          <a :href="SIGNUP" class="btn btn-gold">Open Account</a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.bar { transition: transform 450ms var(--ease-out-expo), background-color 300ms, border-color 300ms; }
.bar.solid, :global(.menu-open) .bar { background: rgb(10 11 13 / 0.82); backdrop-filter: blur(16px) saturate(1.4); border-color: var(--color-line); }
.bar.tuck { transform: translateY(-100%); }
@media (prefers-reduced-transparency: reduce) { .bar.solid { background: var(--color-ink); backdrop-filter: none; } }

.burger { position: relative; width: 18px; height: 10px; }
.burger i { position: absolute; left: 0; width: 100%; height: 1.5px; background: currentColor; border-radius: 2px; transition: transform 300ms var(--ease-out-expo); }
.burger i:first-child { top: 0; }
.burger i:last-child { bottom: 0; }
.burger.x i:first-child { transform: translateY(4.25px) rotate(45deg); }
.burger.x i:last-child { transform: translateY(-4.25px) rotate(-45deg); }

.acc { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 320ms var(--ease-out-quart); }
.acc.on { grid-template-rows: 1fr; }

.dd-enter-active, .dd-leave-active { transition: opacity 180ms var(--ease-out-quart), transform 220ms var(--ease-out-expo); }
.dd-enter-from, .dd-leave-to { opacity: 0; transform: translateY(-6px) scale(0.98); }
.sheet-enter-active, .sheet-leave-active { transition: opacity 260ms var(--ease-out-quart), transform 260ms var(--ease-out-quart); }
.sheet-enter-from, .sheet-leave-to { opacity: 0; transform: translateY(-12px); }
</style>

<script setup lang="ts">
import gsap from 'gsap'
import { PhEnvelopeSimple, PhMapPin, PhFilePdf } from '@phosphor-icons/vue'

const WORD = 'Artix'.split('')
// Same lockup drawn three times: sharp on top, then softer and softer copies
// masked to the lower part, so the letters dissolve into the glow at the bottom.
const LAYERS = ['sharp', 'soft', 'deep'] as const

const root = ref<HTMLElement | null>(null)
const year = new Date().getFullYear()

useMotion(root, ({ reduce, fine }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  const lock = q('[data-lock]')[0] as HTMLElement
  const glow = q('[data-glow]')[0] as HTMLElement
  const st = { trigger: lock, start: 'top 92%', once: true }
  const per = WORD.length + 1
  // Letters rise up out of the blur into focus, mark first.
  gsap.from(q('[data-ch]'), { yPercent: 75, autoAlpha: 0, duration: 1.6, ease: 'expo.out', stagger: i => (i % per) * 0.07, scrollTrigger: st })
  gsap.from(glow, { autoAlpha: 0, scale: 0.6, transformOrigin: '50% 100%', duration: 2.2, ease: 'power2.out', scrollTrigger: st })
  // Slow breathing, only while the footer is on screen.
  gsap.to(q('[data-blob]'), {
    scale: 1.15, autoAlpha: 0.7, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 1.7,
    scrollTrigger: { trigger: lock, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' }
  })
  if (!fine) return
  const xTo = gsap.quickTo(glow, 'x', { duration: 1.4, ease: 'power3' })
  const move = (e: PointerEvent) => xTo((e.clientX / innerWidth - 0.5) * lock.clientWidth * 0.45)
  el.addEventListener('pointermove', move, { passive: true })
  return () => el.removeEventListener('pointermove', move)
})
const markets = NAV.find(g => g.label === 'Markets')!.links
const company = NAV.find(g => g.label === 'Company')!.links
</script>

<template>
  <footer ref="root" class="relative overflow-hidden border-t border-line bg-ink-2/50 pb-28 pt-20 lg:pb-12">
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
        <p>Saturn textures: <a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noopener noreferrer" class="hover:text-mute hover:underline">Solar System Scope</a>, <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" class="hover:text-mute hover:underline">CC BY 4.0</a></p>
        <a :href="SIGNUP" class="text-gold-2 hover:underline">Open an account</a>
      </div>
    </div>

    <div data-lock class="lock wrap pointer-events-none relative mt-14 select-none" aria-hidden="true">
      <div data-glow class="glow absolute inset-x-0 bottom-0">
        <span data-blob class="blob blob-g" />
        <span data-blob class="blob blob-r" />
      </div>
      <div class="size">
        <div v-for="l in LAYERS" :key="l" class="layer" :class="l">
          <span data-ch class="ch"><BrandLogo mark class="x" /></span>
          <span v-for="(c, i) in WORD" :key="i" data-ch class="ch">{{ c }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Giant lockup: sized from the content width (container units), bottom bleeds off the footer. */
.lock { container-type: inline-size; }
.size {
  position: relative;
  font-size: 34.4cqw;
  margin-bottom: calc(-0.03em - 7rem);
}
@media (min-width: 1024px) { .size { margin-bottom: calc(-0.03em - 3rem); } }
.layer {
  display: flex; align-items: baseline; padding-top: 0.12em;
  font-family: var(--font-sans); font-weight: 600; letter-spacing: -0.06em; line-height: 0.82;
  color: var(--color-fg);
}
.layer + .layer { position: absolute; inset: 0; }
.ch { display: inline-block; }
.ch:last-child { letter-spacing: 0; }
.x { display: block; height: 0.72em; width: auto; aspect-ratio: 252 / 326; margin-right: 0.12em; }
.sharp {
  mask-image: linear-gradient(to bottom, #000 56%, transparent 84%);
}
.soft {
  filter: blur(5px);
  mask-image: linear-gradient(to bottom, transparent 50%, #000 72%, transparent 94%);
}
.deep {
  filter: blur(16px); opacity: 0.9;
  mask-image: linear-gradient(to bottom, transparent 70%, #000 92%);
}
.glow { height: 120%; }
.blob { position: absolute; bottom: -35%; border-radius: 50%; }
.blob-g {
  left: 4%; right: 4%; height: 105%;
  background: radial-gradient(closest-side, color-mix(in oklab, var(--color-gold) 55%, transparent), transparent);
}
.blob-r {
  left: 52%; right: -6%; height: 60%;
  background: radial-gradient(closest-side, color-mix(in oklab, var(--color-red) 26%, transparent), transparent);
}
</style>

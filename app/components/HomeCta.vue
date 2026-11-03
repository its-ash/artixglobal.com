<script setup lang="ts">
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { PhArrowRight } from '@phosphor-icons/vue'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }, el) => {
  if (reduce) return
  const q = gsap.utils.selector(el)
  const split = SplitText.create(q('[data-h]'), { type: 'lines,words', mask: 'lines', linesClass: 'pb-[0.06em]' })
  gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 65%', once: true } })
    .from(split.words, { yPercent: 115, duration: 1.2, stagger: 0.05, ease: 'expo.out' })
    .from(q('[data-r]'), { y: 24, autoAlpha: 0, stagger: 0.08, duration: 1 }, 0.4)
  gsap.fromTo(q('[data-frame]'), { scale: 0.92 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 30%', scrub: true } })
  return () => split.revert()
})
</script>

<template>
  <section ref="root" data-scene="4" class="wrap pb-24 md:pb-32" aria-labelledby="cta-h">
    <div data-frame class="relative isolate overflow-hidden rounded-[2rem] border border-line">
      <ClientOnly><GoldField /></ClientOnly>
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(10_11_13/.55),rgb(10_11_13/.2)_70%)]" />
      <div class="relative flex min-h-[32rem] flex-col items-center justify-center px-6 py-20 text-center md:min-h-[38rem]">
        <p data-r class="eyebrow">Start with $50</p>
        <h2 id="cta-h" data-h class="display mt-5 max-w-[13ch] text-[length:var(--text-h2)]">Get instant access to <em class="text-red-2">global markets</em></h2>
        <p data-r class="mt-6 max-w-xl text-fg/80">Deposit from $50. Low spreads, leverage up to 1:200* and institutional-grade tools.</p>
        <div data-r class="mt-9 flex flex-wrap justify-center gap-3">
          <a v-magnetic :href="SIGNUP" class="btn btn-gold btn-lg">Open Account <PhArrowRight :size="18" /></a>
          <a :href="SIGNUP" class="btn btn-ghost btn-lg bg-ink/40">Try Demo Account</a>
        </div>
        <p data-r class="mt-8 text-xs text-fg/60">*Leverage depends on account type and instrument.</p>
      </div>
    </div>
  </section>
</template>

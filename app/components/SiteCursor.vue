<script setup lang="ts">
import gsap from 'gsap'

const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)
const on = ref(false)
let off = () => {}

onMounted(() => {
  if (!matchMedia('(pointer: fine) and (hover: hover)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  on.value = true
  nextTick(() => {
    const d = dot.value!
    const r = ring.value!
    const dx = gsap.quickTo(d, 'x', { duration: 0.12, ease: 'power3.out' })
    const dy = gsap.quickTo(d, 'y', { duration: 0.12, ease: 'power3.out' })
    const rx = gsap.quickTo(r, 'x', { duration: 0.5, ease: 'power3.out' })
    const ry = gsap.quickTo(r, 'y', { duration: 0.5, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY)
      const t = e.target as Element | null
      const hot = !!t?.closest('a, button, [role="tab"]')
      const grab = !!t?.closest('.moon canvas')
      r.classList.toggle('hot', hot)
      r.classList.toggle('grab', grab)
      document.documentElement.classList.add('has-cursor')
    }
    const leave = () => document.documentElement.classList.remove('has-cursor')
    addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    off = () => {
      removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      leave()
    }
  })
})
onBeforeUnmount(() => off())
</script>

<template>
  <div v-if="on" class="cursor pointer-events-none fixed left-0 top-0 z-[95]" aria-hidden="true">
    <div ref="ring" class="ring-el absolute -left-5 -top-5 grid size-10 place-items-center rounded-full border border-gold/60">
      <span class="lbl font-mono text-[0.55rem] tracking-widest text-on-gold uppercase">Drag</span>
    </div>
    <div ref="dot" class="absolute -left-[3px] -top-[3px] size-1.5 rounded-full bg-gold" />
  </div>
</template>

<style scoped>
.cursor { opacity: 0; transition: opacity 200ms; }
:global(.has-cursor) .cursor { opacity: 1; }
.ring-el { transition: scale 300ms var(--ease-out-expo), background-color 200ms, border-color 200ms; }
.ring-el.hot { scale: 1.6; background: color-mix(in oklab, var(--color-gold) 10%, transparent); border-color: transparent; }
.ring-el.grab { scale: 1.8; background: var(--color-gold); border-color: transparent; }
.lbl { opacity: 0; transition: opacity 200ms; scale: 0.56; }
.grab .lbl { opacity: 1; }
</style>

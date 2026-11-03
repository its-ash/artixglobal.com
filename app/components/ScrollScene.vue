<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NEON, NEON_RED } from '~/utils/site'

const SHAPES = 5
const host = ref<HTMLElement | null>(null)
const nuxt = useNuxtApp()
let stop = () => {}

const build = (n: number) => {
  const out = Array.from({ length: SHAPES }, () => new Float32Array(n * 3))
  const side = Math.ceil(Math.sqrt(n))
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const k = i * 3
    const r = Math.random
    out[0]!.set([(r() - 0.5) * 16, (r() - 0.5) * 10, (r() - 0.5) * 10 - 2], k)
    const gx = (i % side) / (side - 1) - 0.5
    const gz = Math.floor(i / side) / (side - 1) - 0.5
    out[1]!.set([gx * 18, -1.8, gz * 12 - 1], k)
    const u = r() * Math.PI * 2
    const v = r() * Math.PI * 2
    const tr = 0.35 + r() * 0.35
    out[2]!.set([(3.2 + tr * Math.cos(v)) * Math.cos(u), tr * Math.sin(v), (3.2 + tr * Math.cos(v)) * Math.sin(u)], k)
    const t = (i / n) * 2 - 1
    const ph = t * Math.PI * 5 + (i % 2) * Math.PI
    const hr = 1.3 + (r() - 0.5) * 0.25
    out[3]!.set([t * 8, Math.cos(ph) * hr, Math.sin(ph) * hr], k)
    const y = 1 - (i / (n - 1)) * 2
    const sr = Math.sqrt(1 - y * y) * 2.8
    out[4]!.set([Math.cos(golden * i) * sr, y * 2.8, Math.sin(golden * i) * sr], k)
  }
  return out
}

onMounted(async () => {
  const el = host.value
  if (!el) return
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const small = matchMedia('(max-width: 767px), (pointer: coarse)').matches
  const THREE = await import('three')
  let renderer: InstanceType<typeof THREE.WebGLRenderer>
  try {
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' })
  } catch {
    return
  }
  const dpr = Math.min(devicePixelRatio || 1, small ? 1.25 : 1.5)
  renderer.setPixelRatio(dpr)
  el.appendChild(renderer.domElement)

  const N = small ? 2600 : 6500
  const shapes = build(N)
  const geo = new THREE.BufferGeometry()
  shapes.forEach((s, i) => geo.setAttribute(i ? `a${i}` : 'position', new THREE.BufferAttribute(s, 3)))
  geo.setAttribute('aR', new THREE.BufferAttribute(Float32Array.from({ length: N }, Math.random), 1))

  const u = {
    uTime: { value: 0 }, uFrom: { value: 0 }, uTo: { value: 0 }, uMix: { value: 1 }, uVel: { value: 0 },
    uSize: { value: (small ? 54 : 44) * dpr },
    uNeon: { value: new THREE.Color(NEON) }, uRed: { value: new THREE.Color(NEON_RED) }
  }
  const mat = new THREE.ShaderMaterial({
    uniforms: u,
    vertexShader: `
      uniform float uTime, uFrom, uTo, uMix, uVel, uSize;
      attribute vec3 a1, a2, a3, a4; attribute float aR;
      uniform vec3 uNeon, uRed;
      varying float vA; varying vec3 vC;
      vec3 shape(float i){ return i < .5 ? position : i < 1.5 ? a1 : i < 2.5 ? a2 : i < 3.5 ? a3 : a4; }
      void main(){
        float k = smoothstep(aR*.45, .55 + aR*.45, uMix);
        vec3 p = mix(shape(uFrom), shape(uTo), k);
        float w = step(.5, uTo)*step(uTo, 1.5)*k + step(.5, uFrom)*step(uFrom, 1.5)*(1. - k);
        p.y += (sin(p.x*.55 + uTime*.7) + cos(p.z*.7 + uTime*.5))*.35*w;
        p += normalize(p + .001)*sin(uTime*.6 + aR*30.)*.05;
        p.z += uVel*(aR - .5)*2.2;
        vec4 mv = modelViewMatrix*vec4(p, 1.);
        vA = (.3 + .6*aR)*smoothstep(-16., -4., mv.z)*(1. - smoothstep(-3., -1., mv.z))*(.75 + .25*sin(uTime*2. + aR*90.));
        vC = (fract(aR*13.7) < .62 ? uNeon : uRed)*(.55 + .6*fract(aR*7.31));
        gl_PointSize = uSize*(.35 + aR*.65)/-mv.z;
        gl_Position = projectionMatrix*mv;
      }`,
    fragmentShader: `
      varying float vA; varying vec3 vC;
      void main(){
        float d = length(gl_PointCoord - .5);
        if(d > .5) discard;
        float core = smoothstep(.14, 0., d);
        float glow = pow(smoothstep(.5, 0., d), 2.2);
        gl_FragColor = vec4(vC*glow*1.35 + mix(vC, vec3(1.), .3)*core*.85, (glow*.85 + core)*vA);
      }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  })
  const pts = new THREE.Points(geo, mat)
  pts.frustumCulled = false
  const group = new THREE.Group()
  group.add(pts)
  const scene = new THREE.Scene()
  scene.add(group)
  const cam = new THREE.PerspectiveCamera(50, 1, 0.1, 60)
  cam.position.set(0, 0, 9)

  const resize = () => {
    renderer.setSize(innerWidth, innerHeight, false)
    cam.aspect = innerWidth / innerHeight
    cam.position.z = cam.aspect < 1 ? 12 : 9
    cam.updateProjectionMatrix()
  }
  resize()
  addEventListener('resize', resize)

  const st = { p: 0, sp: 0, spin: 0, mx: 0, my: 0 }
  const page = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => { st.p = s.progress } })
  const onMove = (e: PointerEvent) => { st.mx = e.clientX / innerWidth - 0.5; st.my = e.clientY / innerHeight - 0.5 }
  addEventListener('pointermove', onMove, { passive: true })

  let cur = 0
  let morph: gsap.core.Tween | null = null
  const go = (n: number) => {
    if (n === cur) return
    u.uFrom.value = cur
    u.uTo.value = n
    u.uMix.value = 0
    cur = n
    morph?.kill()
    morph = gsap.to(u.uMix, { value: 1, duration: reduce ? 0.01 : 2.2, ease: 'power2.inOut', onComplete: () => reduce && renderer.render(scene, cam) })
  }
  let triggers: ScrollTrigger[] = []
  const scan = () => {
    triggers.forEach(t => t.kill())
    triggers = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]')).map(s => ScrollTrigger.create({
      trigger: s, start: 'top 55%', end: 'bottom 55%',
      onToggle: x => x.isActive && go(Number(s.dataset.scene)),
      onUpdate: x => { if (s.dataset.spin) st.spin = x.progress * Math.PI * 1.2 }
    }))
    ScrollTrigger.sort()
    ScrollTrigger.refresh()
  }
  setTimeout(scan, 0)
  const unhook = nuxt.hook('page:finish', () => { setTimeout(scan, 0) })

  let prev = 0
  let t = 0
  let raf = 0
  const frame = (now: number) => {
    const dt = prev ? Math.min((now - prev) / 1000, 0.05) : 0
    prev = now
    t += dt
    st.sp += (st.p - st.sp) * 0.08
    const vel = Math.max(-1, Math.min(1, (nuxt.$lenis as { velocity?: number } | null)?.velocity ?? 0) / 40)
    u.uVel.value += (vel - u.uVel.value) * 0.1
    u.uTime.value = t
    group.rotation.y = st.sp * Math.PI * 2 + st.spin + t * 0.03 + st.mx * 0.25
    group.rotation.x = Math.sin(st.sp * Math.PI * 3) * 0.25 + st.my * 0.15
    group.position.y = Math.sin(st.sp * Math.PI * 2) * 0.6
    cam.position.y += ((-st.my * 0.6) - cam.position.y) * 0.05
    cam.lookAt(0, 0, 0)
    renderer.render(scene, cam)
    raf = requestAnimationFrame(frame)
  }
  const run = (on: boolean) => {
    if (on && !raf) { prev = 0; raf = requestAnimationFrame(frame) }
    if (!on && raf) { cancelAnimationFrame(raf); raf = 0 }
  }
  const vis = () => run(!document.hidden && !reduce)
  document.addEventListener('visibilitychange', vis)
  vis()
  renderer.render(scene, cam)
  el.classList.add('on')

  stop = () => {
    run(false)
    unhook()
    triggers.forEach(x => x.kill())
    page.kill()
    morph?.kill()
    removeEventListener('resize', resize)
    removeEventListener('pointermove', onMove)
    document.removeEventListener('visibilitychange', vis)
    geo.dispose()
    mat.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
})
onBeforeUnmount(() => stop())
</script>

<template>
  <div ref="host" class="scene pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />
</template>

<style scoped>
.scene { opacity: 0; transition: opacity 1.2s var(--ease-out-quart); }
.scene.on { opacity: 1; }
.scene :deep(canvas) { width: 100%; height: 100%; }
</style>

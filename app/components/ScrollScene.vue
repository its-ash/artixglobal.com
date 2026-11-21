<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NEON, NEON_RED } from '~/utils/site'
import { adaptiveDpr, damp } from '~/utils/gl'

const SHAPES = 5
const DEPTH = 72
const host = ref<HTMLElement | null>(null)
const nuxt = useNuxtApp()
let stop = () => {}

const buildShapes = (n: number) => {
  const out = Array.from({ length: SHAPES }, () => new Float32Array(n * 3))
  const side = Math.ceil(Math.sqrt(n))
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const k = i * 3
    const r = Math.random
    // 0: cosmic dust cluster
    const rad = 2.5 + Math.pow(r(), 0.7) * 10
    const th = r() * Math.PI * 2
    const ph0 = Math.acos(2 * r() - 1)
    out[0]!.set([rad * Math.sin(ph0) * Math.cos(th), rad * Math.cos(ph0) * 0.55, rad * Math.sin(ph0) * Math.sin(th) - 3], k)
    // 1: gravitational wave sheet
    const gx = (i % side) / (side - 1) - 0.5
    const gz = Math.floor(i / side) / (side - 1) - 0.5
    out[1]!.set([gx * 19, -2.0, gz * 14 - 2], k)
    // 2: orbital torus ring
    const u = r() * Math.PI * 2
    const v = r() * Math.PI * 2
    const tr = 0.35 + r() * 0.42
    out[2]!.set([(3.4 + tr * Math.cos(v)) * Math.cos(u), tr * Math.sin(v), (3.4 + tr * Math.cos(v)) * Math.sin(u)], k)
    // 3: double helix stream
    const t = (i / n) * 2 - 1
    const ph = t * Math.PI * 5 + (i % 2) * Math.PI
    const hr = 1.35 + (r() - 0.5) * 0.28
    out[3]!.set([t * 8.5, Math.cos(ph) * hr, Math.sin(ph) * hr], k)
    // 4: celestial sphere
    const y = 1 - (i / (n - 1)) * 2
    const sr = Math.sqrt(1 - y * y) * 2.9
    out[4]!.set([Math.cos(golden * i) * sr, y * 2.9, Math.sin(golden * i) * sr], k)
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

  const scene = new THREE.Scene()
  const cam = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  cam.position.set(0, 0, 9)

  const neonCol = new THREE.Color(NEON)
  const redCol = new THREE.Color(NEON_RED)
  const shared = {
    uTime: { value: 0 },
    uTravel: { value: 0 },
    uVel: { value: 0 },
    uDpr: { value: dpr },
    uNeon: { value: neonCol },
    uRed: { value: redCol }
  }

  // 1. Infinite flowing deep-space starfield (GPU Z-modulo corridor)
  const STAR_N = small ? 1800 : 4800
  const starPos = new Float32Array(STAR_N * 3)
  const starSeed = new Float32Array(STAR_N * 3)
  for (let i = 0; i < STAR_N; i++) {
    const k = i * 3
    // Keep a gentle clear tunnel near the exact center so stars feel truly 3D as they sweep past
    const angle = Math.random() * Math.PI * 2
    const radius = 1.4 + Math.pow(Math.random(), 0.62) * 24
    starPos[k] = Math.cos(angle) * radius
    starPos[k + 1] = Math.sin(angle) * radius * 0.72
    starPos[k + 2] = Math.random() * DEPTH
    starSeed[k] = Math.random() // size & brightness seed
    starSeed[k + 1] = Math.random() // twinkle phase
    starSeed[k + 2] = Math.random() // color class
  }
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
  starGeo.setAttribute('aSeed', new THREE.BufferAttribute(starSeed, 3))

  const starMat = new THREE.ShaderMaterial({
    uniforms: {
      ...shared,
      uDepth: { value: DEPTH }
    },
    vertexShader: /* glsl */ `
      uniform float uTime, uTravel, uVel, uDpr, uDepth;
      uniform vec3 uNeon, uRed;
      attribute vec3 aSeed;
      varying float vA;
      varying vec3 vC;
      varying float vBright;

      void main() {
        float zWrapped = mod(position.z + uTravel * (0.65 + aSeed.x * 0.7), uDepth);
        float z = zWrapped - (uDepth - 11.0);
        vec3 p = vec3(position.x, position.y, z);

        // Subtle cosmic drift perpendicular to flight path
        p.x += sin(uTime * 0.12 + aSeed.y * 20.0) * 0.14;
        p.y += cos(uTime * 0.10 + aSeed.y * 17.0) * 0.14;

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        float dist = max(0.8, -mv.z);

        // Fade smoothly in from deep space and out before clipping the lens
        float farFade = smoothstep(-uDepth + 12.0, -uDepth + 30.0, mv.z);
        float nearFade = 1.0 - smoothstep(-2.4, -0.6, mv.z);
        float twinkle = 0.72 + 0.28 * sin(uTime * (1.2 + aSeed.x * 2.4) + aSeed.y * 62.8);

        vBright = aSeed.x;
        vA = farFade * nearFade * twinkle * (0.28 + 0.72 * pow(aSeed.x, 1.4));

        // 90% realistic starlight dust (warm ivory / pure white / cool silver), 10% subtle brand accents
        vec3 dust = mix(vec3(0.76, 0.80, 0.86), vec3(0.96, 0.97, 0.95), aSeed.y);
        if (aSeed.z > 0.93) {
          vC = mix(dust, uNeon, 0.55);
        } else if (aSeed.z < 0.04) {
          vC = mix(dust, uRed, 0.5);
        } else {
          vC = dust;
        }

        float sizeBoost = 1.0 + abs(uVel) * 0.45;
        gl_PointSize = clamp((10.0 + pow(aSeed.x, 3.0) * 34.0) * uDpr * sizeBoost / dist, 1.0, 14.0);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vA;
      varying vec3 vC;
      varying float vBright;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        if (d > 0.5) discard;
        float core = smoothstep(0.16, 0.0, d);
        float halo = pow(smoothstep(0.5, 0.0, d), 2.8);
        // Subtle 4-point diffraction cross only on brightest foreground stars
        float crossSpikes = (exp(-abs(uv.x) * 26.0) * exp(-abs(uv.y) * 5.5) + exp(-abs(uv.y) * 26.0) * exp(-abs(uv.x) * 5.5)) * smoothstep(0.78, 1.0, vBright) * 0.35;
        vec3 col = vC * (halo * 0.9 + crossSpikes) + mix(vC, vec3(1.0), 0.65) * core;
        gl_FragColor = vec4(col, (halo * 0.7 + core + crossSpikes) * vA);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })
  const starField = new THREE.Points(starGeo, starMat)
  starField.frustumCulled = false
  scene.add(starField)

  // 2. Peripheral warp-speed starlight streaks (elongate dynamically during scroll flight)
  const STREAK_N = small ? 120 : 320
  const streakPos = new Float32Array(STREAK_N * 2 * 3)
  const streakEnd = new Float32Array(STREAK_N * 2) // 0 = head, 1 = tail
  const streakSeed = new Float32Array(STREAK_N * 2 * 2)
  for (let i = 0; i < STREAK_N; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3.2 + Math.pow(Math.random(), 0.75) * 14.5
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius * 0.75
    const z = Math.random() * DEPTH
    const s0 = Math.random()
    const s1 = Math.random()
    for (let v = 0; v < 2; v++) {
      const idx = (i * 2 + v) * 3
      streakPos[idx] = x
      streakPos[idx + 1] = y
      streakPos[idx + 2] = z
      streakEnd[i * 2 + v] = v
      const sIdx = (i * 2 + v) * 2
      streakSeed[sIdx] = s0
      streakSeed[sIdx + 1] = s1
    }
  }
  const streakGeo = new THREE.BufferGeometry()
  streakGeo.setAttribute('position', new THREE.BufferAttribute(streakPos, 3))
  streakGeo.setAttribute('aEnd', new THREE.BufferAttribute(streakEnd, 1))
  streakGeo.setAttribute('aSeed', new THREE.BufferAttribute(streakSeed, 2))

  const streakMat = new THREE.ShaderMaterial({
    uniforms: {
      ...shared,
      uDepth: { value: DEPTH }
    },
    vertexShader: /* glsl */ `
      uniform float uTravel, uVel, uDepth;
      uniform vec3 uNeon, uRed;
      attribute float aEnd;
      attribute vec2 aSeed;
      varying float vA;
      varying vec3 vC;

      void main() {
        float speedScale = 1.05 + aSeed.x * 0.9;
        float zWrapped = mod(position.z + uTravel * speedScale, uDepth);
        float z = zWrapped - (uDepth - 11.0);

        // Always a whisper-fine streak in deep-space drift; stretches dramatically on scroll warp
        float len = (0.35 + abs(uVel) * 5.6) * (0.6 + aSeed.x * 0.8);
        float dir = uVel >= -0.02 ? 1.0 : -1.0;
        vec3 p = vec3(position.x, position.y, z - aEnd * len * dir);

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        float farFade = smoothstep(-uDepth + 14.0, -uDepth + 32.0, mv.z);
        float nearFade = 1.0 - smoothstep(-2.6, -0.8, mv.z);
        float tailFade = mix(1.0, 0.0, aEnd);
        float warpVis = 0.16 + min(1.0, abs(uVel) * 1.6) * 0.52;

        vA = farFade * nearFade * tailFade * warpVis;
        vec3 base = vec3(0.84, 0.88, 0.92);
        vC = aSeed.y > 0.78 ? mix(base, uNeon, 0.55) : (aSeed.y < 0.12 ? mix(base, uRed, 0.5) : base);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vA;
      varying vec3 vC;
      void main() {
        gl_FragColor = vec4(vC, vA);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })
  const warpStreaks = new THREE.LineSegments(streakGeo, streakMat)
  warpStreaks.frustumCulled = false
  scene.add(warpStreaks)

  // 3. Soft cosmic dust / nebula volume puffs drifting past in deep parallax
  const NEB_N = small ? 24 : 52
  const nebPos = new Float32Array(NEB_N * 3)
  const nebSeed = new Float32Array(NEB_N * 3)
  for (let i = 0; i < NEB_N; i++) {
    const k = i * 3
    const angle = Math.random() * Math.PI * 2
    const radius = 3.5 + Math.random() * 14
    nebPos[k] = Math.cos(angle) * radius
    nebPos[k + 1] = Math.sin(angle) * radius * 0.6
    nebPos[k + 2] = Math.random() * DEPTH
    nebSeed[k] = 0.6 + Math.random() * 1.4
    nebSeed[k + 1] = Math.random()
    nebSeed[k + 2] = Math.random()
  }
  const nebGeo = new THREE.BufferGeometry()
  nebGeo.setAttribute('position', new THREE.BufferAttribute(nebPos, 3))
  nebGeo.setAttribute('aSeed', new THREE.BufferAttribute(nebSeed, 3))

  const nebMat = new THREE.ShaderMaterial({
    uniforms: {
      ...shared,
      uDepth: { value: DEPTH }
    },
    vertexShader: /* glsl */ `
      uniform float uTravel, uDpr, uDepth;
      uniform vec3 uNeon, uRed;
      attribute vec3 aSeed;
      varying float vA;
      varying vec3 vC;
      void main() {
        float zWrapped = mod(position.z + uTravel * 0.35, uDepth);
        float z = zWrapped - (uDepth - 8.0);
        vec4 mv = modelViewMatrix * vec4(position.x, position.y, z, 1.0);
        float dist = max(2.0, -mv.z);
        float farFade = smoothstep(-uDepth + 10.0, -uDepth + 32.0, mv.z);
        float nearFade = 1.0 - smoothstep(-9.0, -2.5, mv.z);
        vA = farFade * nearFade * 0.042;
        vec3 dust = vec3(0.32, 0.36, 0.40);
        vC = aSeed.y > 0.52 ? mix(dust, uNeon, 0.38) : (aSeed.y < 0.24 ? mix(dust, uRed, 0.34) : dust);
        gl_PointSize = clamp(240.0 * aSeed.x * uDpr / dist, 16.0, 220.0);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vA;
      varying vec3 vC;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float wisp = pow(smoothstep(0.5, 0.0, d), 2.4);
        gl_FragColor = vec4(vC, wisp * vA);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })
  const nebula = new THREE.Points(nebGeo, nebMat)
  nebula.frustumCulled = false
  scene.add(nebula)

  // 4. Section-morphing cosmic formations (data-scene="0-4", data-spin)
  const N = small ? 1800 : 4200
  const shapes = buildShapes(N)
  const geo = new THREE.BufferGeometry()
  shapes.forEach((s, i) => geo.setAttribute(i ? `a${i}` : 'position', new THREE.BufferAttribute(s, 3)))
  geo.setAttribute('aR', new THREE.BufferAttribute(Float32Array.from({ length: N }, Math.random), 1))

  const SIZE = small ? 42 : 34
  const u = {
    uTime: shared.uTime,
    uFrom: { value: 0 },
    uTo: { value: 0 },
    uMix: { value: 1 },
    uVel: shared.uVel,
    uSize: { value: SIZE * dpr },
    uNeon: shared.uNeon,
    uRed: shared.uRed
  }
  const mat = new THREE.ShaderMaterial({
    uniforms: u,
    vertexShader: /* glsl */ `
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
        p += normalize(p + .001)*sin(uTime*.6 + aR*30.)*.045;
        p.z += uVel*(aR - .5)*2.6;
        vec4 mv = modelViewMatrix*vec4(p, 1.);
        vA = (.24 + .52*aR)*smoothstep(-18., -4., mv.z)*(1. - smoothstep(-3., -1., mv.z))*(.78 + .22*sin(uTime*2. + aR*90.));
        vec3 dust = vec3(0.84, 0.88, 0.86);
        float f = fract(aR*13.7);
        vC = f < .54 ? mix(dust, uNeon, .75) : (f < .78 ? mix(dust, uRed, .72) : dust);
        vC *= (.55 + .55*fract(aR*7.31));
        gl_PointSize = uSize*(.32 + aR*.68)/max(1.2, -mv.z);
        gl_Position = projectionMatrix*mv;
      }`,
    fragmentShader: /* glsl */ `
      varying float vA; varying vec3 vC;
      void main(){
        float d = length(gl_PointCoord - .5);
        if(d > .5) discard;
        float core = smoothstep(.14, 0., d);
        float glow = pow(smoothstep(.5, 0., d), 2.4);
        gl_FragColor = vec4(vC*glow*1.15 + mix(vC, vec3(1.), .45)*core*.85, (glow*.78 + core)*vA);
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })
  const pts = new THREE.Points(geo, mat)
  pts.frustumCulled = false
  const group = new THREE.Group()
  group.add(pts)
  scene.add(group)

  let lastW = 0
  let lastH = 0
  let baseZ = 9
  const resize = () => {
    const w = el.clientWidth || innerWidth
    const h = el.clientHeight || innerHeight
    if (w === lastW && h === lastH) return
    lastW = w
    lastH = h
    renderer.setSize(w, h, false)
    cam.aspect = w / h
    baseZ = cam.aspect < 1 ? 12 : 9
    cam.position.z = baseZ
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

  const quality = adaptiveDpr(dpr, 0.75, (d) => {
    renderer.setPixelRatio(d)
    shared.uDpr.value = d
    u.uSize.value = SIZE * d
  })

  let t = 0
  let travel = 0
  let fresh = true
  let curFov = 50
  const sm = { x: 0, y: 0 }
  const frame = (_time: number, deltaMs: number) => {
    const raw = fresh ? 0 : deltaMs / 1000
    fresh = false
    const dt = Math.min(raw, 0.05)
    quality(raw)
    t += dt
    st.sp = damp(st.sp, st.p, 5, dt)
    sm.x = damp(sm.x, st.mx, 3, dt)
    sm.y = damp(sm.y, st.my, 3, dt)

    const rawVel = ((nuxt.$lenis as { velocity?: number } | null)?.velocity ?? 0) / 36
    const vel = Math.max(-1.4, Math.min(1.4, rawVel))
    shared.uVel.value = damp(shared.uVel.value, vel, 5.5, dt)
    shared.uTime.value = t

    // Continuous calm forward spaceflight + smooth surge when scrolling
    travel += dt * (1.85 + shared.uVel.value * 13.5)
    shared.uTravel.value = travel

    // Gentle camera banking & dynamic warp FOV so flight feels physical
    const targetFov = 50 + Math.min(7, Math.abs(shared.uVel.value) * 5.2)
    curFov = damp(curFov, targetFov, 4, dt)
    if (Math.abs(cam.fov - curFov) > 0.02) {
      cam.fov = curFov
      cam.updateProjectionMatrix()
    }
    cam.position.x = damp(cam.position.x, sm.x * 1.15 + Math.sin(t * 0.18) * 0.22, 2.5, dt)
    cam.position.y = damp(cam.position.y, -sm.y * 0.85 + Math.cos(t * 0.14) * 0.16, 2.5, dt)
    cam.position.z = baseZ
    cam.lookAt(sm.x * 0.35, -sm.y * 0.25, -18)
    cam.rotation.z += -sm.x * 0.045

    // Morphing formation glides gently in the space corridor
    group.rotation.y = st.sp * Math.PI * 2 + st.spin + t * 0.03 + sm.x * 0.22
    group.rotation.x = Math.sin(st.sp * Math.PI * 3) * 0.22 + sm.y * 0.14
    group.position.y = Math.sin(st.sp * Math.PI * 2) * 0.55

    renderer.render(scene, cam)
  }

  let running = false
  const run = (on: boolean) => {
    if (on === running) return
    running = on
    if (on) { fresh = true; gsap.ticker.add(frame) } else gsap.ticker.remove(frame)
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
    starGeo.dispose()
    starMat.dispose()
    streakGeo.dispose()
    streakMat.dispose()
    nebGeo.dispose()
    nebMat.dispose()
    geo.dispose()
    mat.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
})
onBeforeUnmount(() => stop())
</script>

<template>
  <div ref="host" class="scene pointer-events-none fixed top-0 left-0 -z-10 h-lvh w-full" aria-hidden="true" />
</template>

<style scoped>
.scene { opacity: 0; transition: opacity 1.2s var(--ease-out-quart); }
.scene.on { opacity: 1; }
.scene :deep(canvas) { width: 100%; height: 100%; }
</style>

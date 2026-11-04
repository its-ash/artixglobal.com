<script setup lang="ts">
import { NEON, NEON_RED } from '~/utils/site'

const TILT_X = 0.42
const TILT_Z = -0.22
const R_IN = 1.24
const R_OUT = 2.33
const RING_SPIN = 6.4
const MAP = { lo: '/img/saturn-1k.webp', hi: '/img/saturn-2k.webp', ring: '/img/saturn-ring.webp' }

const host = ref<HTMLElement | null>(null)
const failed = ref(false)
const ready = ref(false)
const visible = useInView(host, { rootMargin: '0px' })
let stop = () => {}
let setRun = (_: boolean) => {}

const SHADOW = `
  float shadow(vec3 wp, vec3 L){
    float along = dot(wp, L);
    float d = length(wp - along*L);
    return along < 0. ? mix(.06, 1., smoothstep(.94, 1.06, d)) : 1.;
  }`

onMounted(async () => {
  const el = host.value
  if (!el) return
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const small = matchMedia('(max-width: 767px), (pointer: coarse)').matches
  const FIT = small ? 1.3 : 0.9

  const THREE = await import('three')
  let renderer: InstanceType<typeof THREE.WebGLRenderer>
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  } catch {
    failed.value = true
    return
  }
  const dpr = Math.min(devicePixelRatio || 1, small ? 1.5 : 2)
  renderer.setPixelRatio(dpr)
  renderer.setClearColor(0x000000, 0)
  el.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60)
  const world = new THREE.Group()
  const saturn = new THREE.Group()
  world.add(saturn)
  scene.add(world)
  saturn.rotation.set(TILT_X, 0, TILT_Z)

  const loader = new THREE.TextureLoader()
  const load = (url: string) => new Promise<InstanceType<typeof THREE.Texture>>((res, rej) => loader.load(url, res, undefined, rej))
  let map: InstanceType<typeof THREE.Texture>
  let ringMap: InstanceType<typeof THREE.Texture>
  try {
    [map, ringMap] = await Promise.all([load(small ? MAP.lo : MAP.hi), load(MAP.ring)])
  } catch {
    renderer.dispose()
    renderer.domElement.remove()
    failed.value = true
    return
  }
  map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
  ringMap.wrapS = ringMap.wrapT = THREE.ClampToEdgeWrapping

  const light = new THREE.Vector3(-0.62, 0.38, 0.68).normalize()
  const u = {
    uMap: { value: map }, uRing: { value: ringMap }, uLl: { value: light.clone() },
    uTime: { value: 0 }, uIntro: { value: reduce ? 1 : 0 }, uL: { value: light },
    uG: { value: new THREE.Color(NEON) },
    uIn: { value: R_IN }, uOut: { value: R_OUT }
  }

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(1, 128, 128),
    new THREE.ShaderMaterial({
      uniforms: u,
      vertexShader: `
        varying vec3 vW; varying vec3 vP; varying vec3 vV; varying vec2 vUv;
        void main(){
          vP = position;
          vUv = uv;
          vW = normalize((modelMatrix*vec4(normal, 0.)).xyz);
          vV = normalize(normalMatrix*normal);
          gl_Position = projectionMatrix*modelViewMatrix*vec4(position, 1.);
        }`,
      fragmentShader: `
        uniform vec3 uG, uL, uLl; uniform float uTime, uIn, uOut; uniform sampler2D uMap, uRing;
        varying vec3 vW; varying vec3 vP; varying vec3 vV; varying vec2 vUv;
        void main(){
          float lat = vP.y;
          vec3 tex = texture2D(uMap, vUv).rgb;
          vec3 base = mix(vec3(dot(tex, vec3(.299, .587, .114))), tex, .7)*.78;
          float ndl = dot(vW, uL);
          vec3 n = normalize(vP);
          float s = -n.y/(abs(uLl.y) < 1e-4 ? 1e-4 : uLl.y);
          vec3 hit = n + uLl*s;
          float rr = length(hit.xz);
          float rt = (rr - uIn)/(uOut - uIn);
          float ringA = s > 0. && rt > 0. && rt < 1. ? texture2D(uRing, vec2(rt, .5)).a : 0.;
          base *= 1. - ringA*.75;
          float day = smoothstep(-.08, .55, ndl);
          float limb = .55 + .45*max(dot(vV, vec3(0., 0., 1.)), 0.);
          vec3 c = base*day*limb + base*.012;
          float scan = smoothstep(.012, 0., abs(lat - sin(uTime*.35)*.96))*.55;
          c += uG*scan*(.25 + .75*day);
          gl_FragColor = vec4(c, 1.);
        }`
    })
  )
  planet.renderOrder = 0
  saturn.add(planet)

  const atmo = new THREE.Mesh(
    new THREE.SphereGeometry(1.025, 96, 96),
    new THREE.ShaderMaterial({
      uniforms: u,
      vertexShader: 'varying vec3 vV; varying vec3 vW; void main(){ vV = normalize(normalMatrix*normal); vW = normalize((modelMatrix*vec4(normal, 0.)).xyz); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }',
      fragmentShader: `
        uniform vec3 uG, uL; uniform float uIntro; varying vec3 vV; varying vec3 vW;
        void main(){
          float fres = pow(1. - max(dot(vV, vec3(0., 0., 1.)), 0.), 5.);
          float lit = smoothstep(-.25, .5, dot(vW, uL));
          gl_FragColor = vec4(mix(uG, vec3(.85, 1., .9), .35), fres*lit*.85*uIntro);
        }`,
      blending: THREE.AdditiveBlending, transparent: true, depthWrite: false
    })
  )
  atmo.renderOrder = 4
  saturn.add(atmo)

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(R_IN, R_OUT, 512, 1),
    new THREE.ShaderMaterial({
      uniforms: u,
      vertexShader: `
        varying float vR; varying float vA; varying vec3 vWp;
        void main(){
          vR = length(position.xy);
          vA = atan(position.y, position.x);
          vWp = (modelMatrix*vec4(position, 1.)).xyz;
          gl_Position = projectionMatrix*modelViewMatrix*vec4(position, 1.);
        }`,
      fragmentShader: `
        uniform vec3 uL; uniform float uIn, uOut, uTime; uniform sampler2D uRing;
        varying float vR; varying float vA; varying vec3 vWp;
        ${SHADOW}
        void main(){
          float t = clamp((vR - uIn)/(uOut - uIn), 0., 1.);
          vec4 tex = texture2D(uRing, vec2(t, .5));
          vec3 col = mix(vec3(dot(tex.rgb, vec3(.299, .587, .114))), tex.rgb, .7);
          float phi = vA + uTime*${RING_SPIN.toFixed(2)}/pow(vR, 1.5);
          float clump = sin(phi*23. + t*170.)*sin(phi*41. - t*90. + 1.3)*.5 + sin(phi*7. + t*40.)*.5;
          col *= 1. + clump*.18;
          float glint = pow(max(dot(normalize(vWp), uL), 0.), 6.)*.3;
          gl_FragColor = vec4(col*(.7 + glint), tex.a*(.9 + clump*.08)*shadow(vWp, uL));
        }`,
      side: THREE.DoubleSide, transparent: true, depthWrite: false
    })
  )
  ring.rotation.x = -Math.PI / 2
  ring.renderOrder = 1
  saturn.add(ring)

  const rockGeo = new THREE.IcosahedronGeometry(1, 1)
  const rp = rockGeo.attributes.position!
  for (let i = 0; i < rp.count; i++) {
    const x = rp.getX(i)
    const y = rp.getY(i)
    const z = rp.getZ(i)
    const k = 0.72 + 0.5 * (Math.sin(x * 12.9 + y * 78.2 + z * 37.7) * 0.5 + 0.5)
    rp.setXYZ(i, x * k, y * k, z * k)
  }
  rockGeo.computeVertexNormals()
  const ROCKS = small ? 260 : 700
  const spin = new Float32Array(ROCKS * 4)
  const tone = new Float32Array(ROCKS)
  const debris = new THREE.InstancedMesh(rockGeo, new THREE.ShaderMaterial({
    uniforms: u,
    vertexShader: `
      uniform float uTime;
      attribute vec4 aSpin; attribute float aTone;
      varying vec3 vN; varying vec3 vWp; varying float vTone;
      vec3 rot(vec3 v, vec3 k, float a){ return v*cos(a) + cross(k, v)*sin(a) + k*dot(k, v)*(1. - cos(a)); }
      void main(){
        vec3 k = normalize(aSpin.xyz);
        float a = uTime*aSpin.w;
        mat4 m = modelMatrix*instanceMatrix;
        vec4 wp = m*vec4(rot(position, k, a), 1.);
        vWp = wp.xyz;
        vN = normalize(mat3(m)*rot(normal, k, a));
        vTone = aTone;
        gl_Position = projectionMatrix*viewMatrix*wp;
      }`,
    fragmentShader: `
      uniform vec3 uL;
      varying vec3 vN; varying vec3 vWp; varying float vTone;
      ${SHADOW}
      void main(){
        vec3 base = mix(vec3(.12, .115, .11), vec3(.36, .33, .3), vTone);
        float d = max(dot(normalize(vN), uL), 0.);
        gl_FragColor = vec4(base*(.06 + .94*d*shadow(vWp, uL)), 1.);
      }`
  }), ROCKS)
  const dummy = new THREE.Object3D()
  const BANDS: [number, number][] = [[0.3, 0.62], [0.69, 0.95]]
  for (let i = 0; i < ROCKS; i++) {
    const [a, b] = BANDS[Math.random() < 0.55 ? 0 : 1]!
    const r = R_IN + (a + Math.random() * (b - a)) * (R_OUT - R_IN)
    const th = Math.random() * Math.PI * 2
    const s = Math.random() < 0.06 ? 0.022 + Math.random() * 0.014 : 0.005 + Math.random() ** 2 * 0.014
    dummy.position.set(Math.cos(th) * r, (Math.random() - 0.5) * 0.03, Math.sin(th) * r)
    dummy.rotation.set(Math.random() * 6.3, Math.random() * 6.3, Math.random() * 6.3)
    dummy.scale.set(s, s * (0.6 + Math.random() * 0.4), s * (0.7 + Math.random() * 0.3))
    dummy.updateMatrix()
    debris.setMatrixAt(i, dummy.matrix)
    spin.set([Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5, (Math.random() - 0.5) * 1.6], i * 4)
    tone[i] = Math.random()
  }
  rockGeo.setAttribute('aSpin', new THREE.InstancedBufferAttribute(spin, 4))
  rockGeo.setAttribute('aTone', new THREE.InstancedBufferAttribute(tone, 1))
  debris.frustumCulled = false
  saturn.add(debris)

  const SEG = 360
  const orbit = (rad: number, tiltX: number, tiltZ: number, speed: number, red: boolean) => {
    const pts = Array.from({ length: SEG + 1 }, (_, i) => {
      const a = (i / SEG) * Math.PI * 2
      return new THREE.Vector3(Math.cos(a) * rad, 0, Math.sin(a) * rad)
    })
    const g = new THREE.BufferGeometry().setFromPoints(pts)
    g.setAttribute('aT', new THREE.Float32BufferAttribute(Array.from({ length: SEG + 1 }, (_, i) => i / SEG), 1))
    const m = new THREE.ShaderMaterial({
      uniforms: { ...u, uC: { value: new THREE.Color(red ? NEON_RED : NEON) }, uSpeed: { value: speed } },
      vertexShader: 'attribute float aT; varying float vT; varying float vZ; void main(){ vT = aT; vec4 mv = modelViewMatrix*vec4(position,1.); vZ = mv.z; gl_Position = projectionMatrix*mv; }',
      fragmentShader: `
        uniform vec3 uC; uniform float uTime, uSpeed, uIntro; varying float vT; varying float vZ;
        void main(){
          float dash = step(.5, fract(vT*140.));
          float head = fract(uTime*uSpeed);
          float dd = fract(vT - head + 1.);
          float trail = smoothstep(.22, 0., dd);
          gl_FragColor = vec4(uC, (dash*.07 + trail*.75)*uIntro);
        }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    })
    const line = new THREE.Line(g, m)
    line.rotation.set(tiltX, 0, tiltZ)
    line.renderOrder = 5
    return line
  }
  const orbits = [orbit(3.25, 0.32, 0.1, 0.05, false), orbit(3.75, 0.55, -0.35, -0.035, true)]
  orbits.forEach(o => world.add(o))

  const resize = () => {
    const w = el.clientWidth
    const h = el.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    renderer.domElement.style.width = `${w}px`
    renderer.domElement.style.height = `${h}px`
    camera.aspect = w / h
    const visW = (R_OUT * 2.3) / FIT
    camera.position.z = Math.max(visW / (2 * Math.tan((camera.fov * Math.PI) / 360) * camera.aspect), 5)
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(el)
  resize()

  let drag = false
  let lastX = 0
  let lastY = 0
  let dx = 0
  let dy = 0
  let tx = 0
  let ty = 0
  const cv = renderer.domElement
  cv.style.touchAction = 'pan-y'
  const down = (e: PointerEvent) => { drag = true; lastX = e.clientX; lastY = e.clientY; cv.setPointerCapture(e.pointerId) }
  const move = (e: PointerEvent) => {
    if (drag) {
      dx = Math.max(-0.6, Math.min(0.6, dx + (e.clientX - lastX) * 0.004))
      dy = Math.max(-0.35, Math.min(0.35, dy + (e.clientY - lastY) * 0.003))
      lastX = e.clientX
      lastY = e.clientY
    }
    if (e.pointerType === 'mouse') {
      tx = (e.clientY / innerHeight - 0.5) * 0.14
      ty = (e.clientX / innerWidth - 0.5) * 0.2
    }
  }
  const up = () => { drag = false }
  cv.addEventListener('pointerdown', down)
  cv.addEventListener('pointermove', move)
  cv.addEventListener('pointerup', up)
  cv.addEventListener('pointercancel', up)

  const q = new THREE.Quaternion()
  let prev = 0
  let t = 0
  const frame = () => {
    const now = performance.now()
    const dt = prev ? Math.min((now - prev) / 1000, 0.05) : 0
    prev = now
    t += dt
    if (u.uIntro.value < 1) u.uIntro.value = Math.min(1, u.uIntro.value + dt / 2.8)
    u.uTime.value = t
    if (!drag) { dx *= 0.93; dy *= 0.93 }
    planet.rotation.y += dt * 0.06
    debris.rotation.y -= dt * RING_SPIN * 0.3
    world.rotation.x += (tx + dy - world.rotation.x) * 0.06
    world.rotation.y += (ty + dx - world.rotation.y) * 0.06
    u.uLl.value.copy(light).applyQuaternion(planet.getWorldQuaternion(q).invert())
    world.scale.setScalar(0.86 + 0.14 * (1 - Math.pow(1 - u.uIntro.value, 3)))
    renderer.render(scene, camera)
  }

  let running = false
  setRun = (on: boolean) => {
    if (on === running) return
    running = on
    if (on) prev = 0
    renderer.setAnimationLoop(on ? frame : null)
  }
  const vis = () => setRun(!document.hidden && visible.value)
  document.addEventListener('visibilitychange', vis)

  if (reduce) {
    frame()
    setRun = () => {}
  } else vis()
  ready.value = true

  stop = () => {
    renderer.setAnimationLoop(null)
    document.removeEventListener('visibilitychange', vis)
    ro.disconnect()
    scene.traverse((o) => {
      const m = o as unknown as { geometry?: { dispose: () => void }, material?: { dispose: () => void } }
      m.geometry?.dispose()
      m.material?.dispose()
    })
    renderer.dispose()
    renderer.domElement.remove()
  }
})

watch(visible, v => setRun(v && !document.hidden))
onBeforeUnmount(() => stop())
</script>

<template>
  <div ref="host" class="saturn relative h-full w-full" :class="{ ready }" aria-hidden="true">
    <div v-if="failed" class="absolute inset-0 m-auto aspect-square w-[34%] rounded-full bg-[radial-gradient(circle_at_30%_30%,#1d2a22,#07090a_70%)]" />
  </div>
</template>

<style scoped>
.saturn :deep(canvas) { position: absolute; inset: 0; opacity: 0; transition: opacity 900ms var(--ease-out-quart); cursor: grab; }
.saturn :deep(canvas:active) { cursor: grabbing; }
.saturn.ready :deep(canvas) { opacity: 1; }
</style>

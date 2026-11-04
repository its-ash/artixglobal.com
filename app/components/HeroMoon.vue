<script setup lang="ts">
import { NEON, NEON_RED } from '~/utils/site'

const TILT = 0.12
const SPIN = 0.035
const SUN_FROM = new Float32Array([1.2, 0.2, -1])
const SUN_TO = new Float32Array([-0.75, 0.35, 0.7])

const host = ref<HTMLElement | null>(null)
const failed = ref(false)
const ready = ref(false)
const visible = useInView(host, { rootMargin: '0px' })
let stop = () => {}
let setRun = (_: boolean) => {}

onMounted(async () => {
  const el = host.value
  if (!el) return
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const small = matchMedia('(max-width: 767px), (pointer: coarse)').matches
  const FILL_H = small ? 0.62 : 0.66
  const FILL_W = small ? 0.95 : 0.5

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
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05

  const loader = new THREE.TextureLoader()
  const load = (url: string) => new Promise<InstanceType<typeof THREE.Texture>>((res, rej) => loader.load(url, res, undefined, rej))
  let map: InstanceType<typeof THREE.Texture>
  let bump: InstanceType<typeof THREE.Texture>
  try {
    [map, bump] = await Promise.all([load(small ? '/img/moon-color-1k.webp' : '/img/moon-color-2k.webp'), load('/img/moon-bump.webp')])
  } catch {
    renderer.dispose()
    failed.value = true
    return
  }
  map.colorSpace = THREE.SRGBColorSpace
  map.anisotropy = bump.anisotropy = renderer.capabilities.getMaxAnisotropy()
  el.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60)
  const world = new THREE.Group()
  scene.add(world)

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(1, small ? 96 : 160, small ? 64 : 120),
    new THREE.MeshStandardMaterial({ map, bumpMap: bump, bumpScale: small ? 2.2 : 3, roughness: 1, metalness: 0 })
  )
  moon.rotation.set(TILT, -1.6, 0)
  world.add(moon)

  const sun = new THREE.DirectionalLight(0xfff6ec, 3.1)
  sun.position.fromArray(reduce ? SUN_TO : SUN_FROM)
  scene.add(sun)
  scene.add(new THREE.HemisphereLight(0x9fb3c8, 0x000000, 0.06))

  const SEG = 360
  const orbit = (rad: number, tiltX: number, tiltZ: number, speed: number, color: string) => {
    const pts = Array.from({ length: SEG + 1 }, (_, i) => {
      const a = (i / SEG) * Math.PI * 2
      return new THREE.Vector3(Math.cos(a) * rad, 0, Math.sin(a) * rad)
    })
    const g = new THREE.BufferGeometry().setFromPoints(pts)
    g.setAttribute('aT', new THREE.Float32BufferAttribute(Array.from({ length: SEG + 1 }, (_, i) => i / SEG), 1))
    const m = new THREE.ShaderMaterial({
      uniforms: { uC: { value: new THREE.Color(color) }, uTime: { value: 0 }, uSpeed: { value: speed }, uIntro: { value: reduce ? 1 : 0 } },
      vertexShader: 'attribute float aT; varying float vT; void main(){ vT = aT; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }',
      fragmentShader: `
        uniform vec3 uC; uniform float uTime, uSpeed, uIntro; varying float vT;
        void main(){
          float dash = step(.55, fract(vT*160.));
          float dd = fract(vT - fract(uTime*uSpeed) + 1.);
          float trail = smoothstep(.2, 0., dd);
          gl_FragColor = vec4(uC, (dash*.08 + trail*.7)*uIntro);
        }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    })
    const line = new THREE.Line(g, m)
    line.rotation.set(tiltX, 0, tiltZ)
    return { line, m }
  }
  const orbits = [orbit(1.42, 1.25, 0.18, 0.045, NEON), orbit(1.62, 1.38, -0.42, -0.032, NEON_RED)]
  orbits.forEach(o => world.add(o.line))

  const resize = () => {
    const w = el.clientWidth
    const h = el.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    renderer.domElement.style.width = `${w}px`
    renderer.domElement.style.height = `${h}px`
    camera.aspect = w / h
    const t = Math.tan((camera.fov * Math.PI) / 360)
    const zH = 2 / FILL_H / (2 * t)
    const zW = 2 / FILL_W / (2 * t * camera.aspect)
    camera.position.z = Math.max(zH, zW)
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(el)
  resize()

  let drag = false
  let lastX = 0
  let vel = 0
  let tx = 0
  let ty = 0
  const cv = renderer.domElement
  cv.style.touchAction = 'pan-y'
  const down = (e: PointerEvent) => { drag = true; lastX = e.clientX; cv.setPointerCapture(e.pointerId) }
  const move = (e: PointerEvent) => {
    if (drag) { vel = (e.clientX - lastX) * 0.005; lastX = e.clientX }
    if (e.pointerType === 'mouse') {
      tx = (e.clientY / innerHeight - 0.5) * 0.12
      ty = (e.clientX / innerWidth - 0.5) * 0.18
    }
  }
  const up = () => { drag = false }
  cv.addEventListener('pointerdown', down)
  cv.addEventListener('pointermove', move)
  cv.addEventListener('pointerup', up)
  cv.addEventListener('pointercancel', up)

  const sunFrom = new THREE.Vector3().fromArray(SUN_FROM)
  const sunTo = new THREE.Vector3().fromArray(SUN_TO)
  let intro = reduce ? 1 : 0
  let prev = 0
  let t = 0
  const frame = () => {
    const now = performance.now()
    const dt = prev ? Math.min((now - prev) / 1000, 0.05) : 0
    prev = now
    t += dt
    if (intro < 1) {
      intro = Math.min(1, intro + dt / 3.2)
      const k = 1 - Math.pow(1 - intro, 3)
      sun.position.lerpVectors(sunFrom, sunTo, k)
      world.scale.setScalar(0.9 + 0.1 * k)
    }
    moon.rotation.y += drag ? vel : SPIN * dt + vel
    if (!drag) vel *= 0.94
    world.rotation.x += (tx - world.rotation.x) * 0.05
    world.rotation.y += (ty - world.rotation.y) * 0.05
    orbits.forEach((o) => {
      o.m.uniforms.uTime!.value = t
      o.m.uniforms.uIntro!.value = Math.max(0, (intro - 0.5) / 0.5)
    })
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
    map.dispose()
    bump.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
})

watch(visible, v => setRun(v && !document.hidden))
onBeforeUnmount(() => stop())
</script>

<template>
  <div ref="host" class="moon relative h-full w-full" :class="{ ready }" aria-hidden="true">
    <img v-if="failed" src="/img/moon-color-1k.webp" alt="" class="absolute inset-0 m-auto aspect-square w-[40%] rounded-full object-cover opacity-80 [object-position:30%_50%]">
  </div>
</template>

<style scoped>
.moon :deep(canvas) { position: absolute; inset: 0; opacity: 0; transition: opacity 1200ms var(--ease-out-quart); cursor: grab; }
.moon :deep(canvas:active) { cursor: grabbing; }
.moon.ready :deep(canvas) { opacity: 1; }
</style>

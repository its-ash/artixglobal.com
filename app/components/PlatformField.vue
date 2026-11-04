<script setup lang="ts">
import { NEON, NEON_RED } from '~/utils/site'

const host = ref<HTMLElement | null>(null)
const visible = useInView(host, { rootMargin: '100px' })
let run = (_: boolean) => {}
let stop = () => {}

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
  renderer.setClearColor(0x000000, 0)
  el.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const cam = new THREE.PerspectiveCamera(42, 1, 0.1, 60)
  cam.position.set(0, 3.4, 9)
  cam.lookAt(0, 0, -2)

  const [sx, sz] = small ? [90, 46] : [170, 80]
  const geo = new THREE.PlaneGeometry(26, 14, sx, sz)
  geo.rotateX(-Math.PI / 2)
  const u = {
    uTime: { value: 0 }, uM: { value: new THREE.Vector2() },
    uSize: { value: (small ? 2.6 : 2.2) * dpr },
    uNeon: { value: new THREE.Color(NEON) }, uRed: { value: new THREE.Color(NEON_RED) }
  }
  const mat = new THREE.ShaderMaterial({
    uniforms: u,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      uniform float uTime, uSize; uniform vec2 uM;
      uniform vec3 uNeon, uRed;
      varying vec3 vC; varying float vA;
      float wave(vec2 p, float t){
        return sin(p.x*.45 + t*.8)*.55 + sin(p.x*1.1 - p.y*.6 + t*1.3)*.22
          + cos(p.y*.8 + t*.6)*.3 + sin(length(p - vec2(uM.x*6., 2.))*1.4 - t*2.)*.12;
      }
      void main(){
        vec3 p = position;
        float h = wave(p.xz, uTime);
        p.y = h - 1.2;
        vec4 mv = modelViewMatrix*vec4(p, 1.);
        float k = smoothstep(-.7, .9, h);
        vC = mix(uRed, uNeon, k);
        vA = (.25 + .75*k)*smoothstep(-22., -6., mv.z)*(1. - smoothstep(-4., -2., mv.z));
        gl_PointSize = uSize*(7./-mv.z);
        gl_Position = projectionMatrix*mv;
      }`,
    fragmentShader: `
      varying vec3 vC; varying float vA;
      void main(){
        float d = length(gl_PointCoord - .5);
        if (d > .5) discard;
        gl_FragColor = vec4(vC, vA*smoothstep(.5, .1, d)*.85);
      }`
  })
  const pts = new THREE.Points(geo, mat)
  scene.add(pts)

  const m = { x: 0, y: 0, tx: 0, ty: 0 }
  const onMove = (e: PointerEvent) => { m.tx = e.clientX / innerWidth - 0.5; m.ty = e.clientY / innerHeight - 0.5 }
  const resize = () => {
    const w = Math.max(1, el.clientWidth)
    const h = Math.max(1, el.clientHeight)
    renderer.setSize(w, h, false)
    cam.aspect = w / h
    cam.updateProjectionMatrix()
    if (!raf) renderer.render(scene, cam)
  }

  let raf = 0
  let prev = 0
  let t = 4
  const frame = (now: number) => {
    t += Math.min(now - (prev || now), 50) / 1000
    prev = now
    m.x += (m.tx - m.x) * 0.04
    m.y += (m.ty - m.y) * 0.04
    u.uTime.value = t
    u.uM.value.set(m.x, m.y)
    pts.rotation.y = m.x * 0.18
    cam.position.y = 3.4 - m.y * 0.8
    cam.lookAt(0, 0, -2)
    renderer.render(scene, cam)
    raf = requestAnimationFrame(frame)
  }
  const ro = new ResizeObserver(resize)
  ro.observe(el)
  resize()
  addEventListener('pointermove', onMove, { passive: true })

  run = (on: boolean) => {
    if (reduce) return
    if (on && !raf) { prev = 0; raf = requestAnimationFrame(frame) }
    if (!on && raf) { cancelAnimationFrame(raf); raf = 0 }
  }
  const vis = () => run(!document.hidden && visible.value)
  document.addEventListener('visibilitychange', vis)
  vis()
  renderer.render(scene, cam)
  el.classList.add('on')

  stop = () => {
    run(false)
    ro.disconnect()
    removeEventListener('pointermove', onMove)
    document.removeEventListener('visibilitychange', vis)
    geo.dispose()
    mat.dispose()
    renderer.dispose()
    renderer.forceContextLoss()
    renderer.domElement.remove()
  }
})

watch(visible, v => run(v && !document.hidden))
onBeforeUnmount(() => stop())
</script>

<template>
  <div ref="host" class="pf absolute inset-0 -z-10 [&>canvas]:size-full" aria-hidden="true" />
</template>

<style scoped>
.pf { opacity: 0; transition: opacity 900ms var(--ease-out-quart); }
.pf.on { opacity: 1; }
</style>

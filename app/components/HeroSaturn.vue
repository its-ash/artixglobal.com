<script setup lang="ts">
import { NEON, NEON_RED } from '~/utils/site'

const TILT_X = 0.42
const TILT_Z = -0.22
const R_IN = 1.32
const R_OUT = 2.6

const host = ref<HTMLElement | null>(null)
const failed = ref(false)
const ready = ref(false)
const visible = useInView(host, { rootMargin: '0px' })
let stop = () => {}
let setRun = (_: boolean) => {}

const NOISE = `
  float h3(vec3 p){ p = fract(p*.3183099 + .1); p *= 17.; return fract(p.x*p.y*p.z*(p.x + p.y + p.z)); }
  float n3(vec3 x){
    vec3 i = floor(x), f = fract(x); f = f*f*(3. - 2.*f);
    return mix(mix(mix(h3(i), h3(i + vec3(1,0,0)), f.x), mix(h3(i + vec3(0,1,0)), h3(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(h3(i + vec3(0,0,1)), h3(i + vec3(1,0,1)), f.x), mix(h3(i + vec3(0,1,1)), h3(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  float fbm3(vec3 p){ float v = 0., a = .5; for(int i = 0; i < 4; i++){ v += a*n3(p); p *= 2.03; a *= .5; } return v; }
  float h1(float x){ return fract(sin(x*127.1)*43758.5453); }
  float n1(float x){ float i = floor(x), f = fract(x); return mix(h1(i), h1(i + 1.), f*f*(3. - 2.*f)); }`

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
  const lowCpu = (navigator.hardwareConcurrency ?? 8) <= 4
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

  const light = new THREE.Vector3(-0.62, 0.38, 0.68).normalize()
  const u = {
    uTime: { value: 0 }, uIntro: { value: reduce ? 1 : 0 }, uL: { value: light },
    uG: { value: new THREE.Color(NEON) }, uR: { value: new THREE.Color(NEON_RED) },
    uIn: { value: R_IN }, uOut: { value: R_OUT }, uSize: { value: (small ? 30 : 26) * dpr }
  }

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(1, 128, 128),
    new THREE.ShaderMaterial({
      uniforms: u,
      vertexShader: `
        varying vec3 vW; varying vec3 vP; varying vec3 vV;
        void main(){
          vP = position;
          vW = normalize((modelMatrix*vec4(normal, 0.)).xyz);
          vV = normalize(normalMatrix*normal);
          gl_Position = projectionMatrix*modelViewMatrix*vec4(position, 1.);
        }`,
      fragmentShader: `
        uniform vec3 uG, uR, uL; uniform float uTime;
        varying vec3 vW; varying vec3 vP; varying vec3 vV;
        ${NOISE}
        void main(){
          float lat = vP.y;
          float turb = fbm3(vec3(vP.x*3., lat*14., vP.z*3.) + vec3(uTime*.04, 0., 0.));
          float y = lat + (turb - .5)*.07;
          float bands = n1(y*9.)*.55 + n1(y*23. + 4.)*.3 + n1(y*61. + 9.)*.15;
          float storm = smoothstep(.06, 0., length(vec2(atan(vP.z, vP.x)*.3 - uTime*.02, lat + .32) - vec2(.4, 0.)))*.6;
          vec3 cold = vec3(.05, .09, .07);
          vec3 warm = mix(uG*.42, vec3(.72, .8, .7), .35);
          vec3 base = mix(cold, warm, smoothstep(.2, .85, bands));
          base = mix(base, uR*.55, storm);
          float ndl = dot(vW, uL);
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
        varying float vR; varying vec3 vWp;
        void main(){
          vR = length(position.xy);
          vWp = (modelMatrix*vec4(position, 1.)).xyz;
          gl_Position = projectionMatrix*modelViewMatrix*vec4(position, 1.);
        }`,
      fragmentShader: `
        uniform vec3 uG, uR, uL; uniform float uIn, uOut, uIntro;
        varying float vR; varying vec3 vWp;
        ${NOISE}
        ${SHADOW}
        void main(){
          float t = (vR - uIn)/(uOut - uIn);
          float dens = n1(t*90.)*.45 + n1(t*260. + 3.)*.35 + n1(t*700. + 7.)*.2;
          float cRing = smoothstep(.0, .08, t)*(1. - smoothstep(.16, .3, t))*.35;
          float bRing = smoothstep(.22, .3, t)*(1. - smoothstep(.6, .62, t));
          float aRing = smoothstep(.665, .69, t)*(1. - smoothstep(.95, 1., t))*(1. - smoothstep(.0, .006, .006 - abs(t - .87))*.85);
          float body = cRing + bRing*1.15 + aRing*.85;
          float a = body*(.25 + .75*dens);
          float reveal = smoothstep(uIntro*1.3 - .3, uIntro*1.3, 1. - t);
          vec3 dust = mix(vec3(.82, .86, .8), uG, .28);
          vec3 col = mix(mix(uR, dust, .55), dust, smoothstep(.12, .35, t));
          col = mix(col, uG*1.1, smoothstep(.85, 1., t)*.5);
          float glint = pow(max(dot(normalize(vWp), uL), 0.), 6.)*.35;
          gl_FragColor = vec4(col*(.55 + .5*dens + glint), a*.8*reveal*shadow(vWp, uL));
        }`,
      side: THREE.DoubleSide, transparent: true, depthWrite: false
    })
  )
  ring.rotation.x = -Math.PI / 2
  ring.renderOrder = 1
  saturn.add(ring)

  const N = small || lowCpu ? 1600 : 4200
  const pos = new Float32Array(N * 3)
  const rnd = new Float32Array(N)
  for (let i = 0; i < N; i++) {
    let r = R_IN + 0.3 + Math.random() * (R_OUT - R_IN - 0.3)
    if (Math.abs((r - R_IN) / (R_OUT - R_IN) - 0.64) < 0.03) r += 0.1
    pos.set([r, Math.random() * Math.PI * 2, (Math.random() - 0.5) * 0.03], i * 3)
    rnd[i] = Math.random()
  }
  const dustGeo = new THREE.BufferGeometry()
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  dustGeo.setAttribute('aR', new THREE.BufferAttribute(rnd, 1))
  const dust = new THREE.Points(dustGeo, new THREE.ShaderMaterial({
    uniforms: u,
    vertexShader: `
      uniform float uTime, uIntro, uSize; uniform vec3 uL; uniform vec3 uG; uniform vec3 uR;
      attribute float aR;
      varying float vA; varying vec3 vC;
      ${SHADOW}
      void main(){
        float r = position.x;
        float k = clamp(uIntro*1.6 - aR*.6, 0., 1.);
        k = 1. - pow(1. - k, 3.);
        float th = position.y + uTime*.5/pow(r, 1.5) + (1. - k)*2.;
        vec3 p = vec3(cos(th)*r, position.z, sin(th)*r);
        vec4 wp = modelMatrix*vec4(p, 1.);
        vec4 mv = viewMatrix*wp;
        vC = mix(mix(uR, vec3(1.), .4), mix(uG, vec3(1.), .45), smoothstep(${R_IN.toFixed(2)} + .4, ${R_OUT.toFixed(2)} - .4, r));
        vA = (.35 + .65*aR)*k*shadow(wp.xyz, uL)*(.6 + .4*sin(uTime*3. + aR*80.));
        gl_PointSize = uSize*(.15 + aR*.25)/-mv.z;
        gl_Position = projectionMatrix*mv;
      }`,
    fragmentShader: `
      varying float vA; varying vec3 vC;
      void main(){
        float d = length(gl_PointCoord - .5);
        if(d > .5) discard;
        gl_FragColor = vec4(vC, smoothstep(.5, .05, d)*vA);
      }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  }))
  dust.renderOrder = 3
  dust.frustumCulled = false
  saturn.add(dust)

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
    world.rotation.x += (tx + dy - world.rotation.x) * 0.06
    world.rotation.y += (ty + dx - world.rotation.y) * 0.06
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

<script setup lang="ts">
const SCALE = 0.5

const host = ref<HTMLCanvasElement | null>(null)
const visible = useInView(host as Ref<HTMLElement | null>, { rootMargin: '100px' })
let run = (_: boolean) => {}
let stop = () => {}

const VS = 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }'
const FS = `
precision mediump float;
uniform vec2 uRes; uniform float uT; uniform vec2 uM;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7)))*43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3. - 2.*f);
  return mix(mix(h(i), h(i + vec2(1., 0.)), f.x), mix(h(i + vec2(0., 1.)), h(i + vec2(1.)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; for(int i = 0; i < 5; i++){ v += a*n(p); p = p*2.02 + 1.7; a *= .5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy/uRes;
  vec2 p = (gl_FragCoord.xy - .5*uRes)/uRes.y;
  float t = uT*.06;
  vec2 q = vec2(fbm(p*1.6 + t), fbm(p*1.6 - t + 4.3));
  vec2 r = vec2(fbm(p*2. + q*2.2 + vec2(1.7, 9.2) + t*1.4 + uM*.4), fbm(p*2. + q*2.2 + vec2(8.3, 2.8) - t));
  float f = fbm(p*1.8 + r*2.4);
  float ridge = pow(1. - abs(f*2. - 1.), 6.);
  vec3 ink = vec3(.039, .043, .051);
  vec3 deep = vec3(.04, .2, .1);
  vec3 green = vec3(.24, 1., .48);
  vec3 red = vec3(1., .18, .3);
  vec3 gold = mix(green, red, smoothstep(.38, .62, q.x));
  vec3 c = mix(ink, deep, smoothstep(.3, .8, f));
  c = mix(c, gold, ridge*.75);
  c += mix(gold, vec3(1.), .4)*pow(ridge, 3.)*.35;
  float v = smoothstep(1.15, .25, length((uv - .5)*vec2(1.25, 1.6)));
  gl_FragColor = vec4(mix(ink, c, v*.9), 1.);
}`

onMounted(() => {
  const cv = host.value
  if (!cv) return
  const gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
  if (!gl) return
  const sh = (type: number, src: string) => {
    const s = gl.createShader(type)!
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return s
  }
  const pr = gl.createProgram()!
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS))
  gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS))
  gl.linkProgram(pr)
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return
  gl.useProgram(pr)
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(pr, 'p')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  const uRes = gl.getUniformLocation(pr, 'uRes')
  const uT = gl.getUniformLocation(pr, 'uT')
  const uM = gl.getUniformLocation(pr, 'uM')

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const m = { x: 0, y: 0, tx: 0, ty: 0 }
  const resize = () => {
    cv.width = Math.max(1, Math.round(cv.clientWidth * SCALE))
    cv.height = Math.max(1, Math.round(cv.clientHeight * SCALE))
    gl.viewport(0, 0, cv.width, cv.height)
    gl.uniform2f(uRes, cv.width, cv.height)
    if (!raf) draw(time)
  }
  const onMove = (e: PointerEvent) => { m.tx = e.clientX / innerWidth - 0.5; m.ty = e.clientY / innerHeight - 0.5 }
  let time = 12
  let raf = 0
  let last = 0
  const draw = (t: number) => {
    m.x += (m.tx - m.x) * 0.04
    m.y += (m.ty - m.y) * 0.04
    gl.uniform1f(uT, t)
    gl.uniform2f(uM, m.x, -m.y)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
  const loop = (now: number) => {
    time += Math.min(now - (last || now), 50) / 1000
    last = now
    draw(time)
    raf = requestAnimationFrame(loop)
  }
  const ro = new ResizeObserver(resize)
  ro.observe(cv)
  addEventListener('pointermove', onMove, { passive: true })

  run = (on: boolean) => {
    if (reduce) return
    if (on && !raf) { last = 0; raf = requestAnimationFrame(loop) }
    if (!on && raf) { cancelAnimationFrame(raf); raf = 0 }
  }
  const vis = () => run(!document.hidden && visible.value)
  document.addEventListener('visibilitychange', vis)
  vis()
  stop = () => {
    run(false)
    ro.disconnect()
    removeEventListener('pointermove', onMove)
    document.removeEventListener('visibilitychange', vis)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
})

watch(visible, v => run(v && !document.hidden))
onBeforeUnmount(() => stop())
</script>

<template>
  <canvas ref="host" class="absolute inset-0 size-full" aria-hidden="true" />
</template>

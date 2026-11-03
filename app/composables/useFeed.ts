export interface Quote { sym: string, px: number, chg: number, dir: 1 | -1 | 0, dp: number }

const BASE: [string, number, number][] = [
  ['XAU/USD', 2386.4, 2], ['XAG/USD', 28.62, 3], ['EUR/USD', 1.0842, 5], ['GBP/USD', 1.2715, 5],
  ['USD/JPY', 151.38, 3], ['US500', 5248.1, 1], ['UK100', 8143.6, 1], ['BTC/USD', 67420, 0],
  ['ETH/USD', 3478.2, 1], ['WTI', 81.24, 2], ['BRENT', 85.67, 2], ['AAPL', 189.84, 2], ['TSLA', 178.21, 2]
]

const quotes = ref<Quote[]>(BASE.map(([sym, px, dp]) => ({ sym, px, chg: 0, dir: 0, dp })))
let timer: ReturnType<typeof setInterval> | null = null
let users = 0

const tick = () => {
  quotes.value = quotes.value.map((q, i) => {
    const open = BASE[i]![1]
    if (Math.random() > 0.45) return { ...q, dir: 0 }
    const px = Math.max(open * 0.9, q.px * (1 + (Math.random() - 0.5) * 0.0016))
    return { ...q, px, chg: ((px - open) / open) * 100, dir: px >= q.px ? 1 : -1 }
  })
}

export const useFeed = () => {
  onMounted(() => {
    users++
    if (!timer && !matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => document.hidden || tick(), 1600)
  })
  onBeforeUnmount(() => {
    if (--users === 0 && timer) { clearInterval(timer); timer = null }
  })
  return quotes
}

export const sparkPath = (seed: number, w = 120, h = 40, n = 32) => {
  let s = seed * 9301 + 49297
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  let v = 0.5
  const pts = Array.from({ length: n }, (_, i) => {
    v = Math.min(0.95, Math.max(0.05, v + (rnd() - 0.46) * 0.18))
    return [(i / (n - 1)) * w, h - v * h] as const
  })
  return pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
}

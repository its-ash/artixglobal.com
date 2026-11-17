// Shared helpers for the WebGL canvases.

/** Frame-rate independent ease toward `to` (same feel at 60, 120 or 144 Hz). */
export const damp = (from: number, to: number, lambda: number, dt: number) =>
  from + (to - from) * (1 - Math.exp(-lambda * dt))

/**
 * Lowers the pixel ratio in steps when frames run slow, so weak GPUs keep a
 * smooth frame rate instead of dropping frames at full resolution.
 * Call the returned function once per frame with the raw frame time in seconds.
 */
export const adaptiveDpr = (start: number, min: number, apply: (dpr: number) => void) => {
  let dpr = start
  let skip = 90
  let n = 0
  let sum = 0
  return (dt: number) => {
    if (dpr <= min || dt <= 0 || dt > 0.25) return
    if (skip > 0) { skip--; return }
    sum += dt
    if (++n < 45) return
    if (sum / n > 1 / 48) {
      dpr = Math.max(min, dpr - 0.25)
      apply(dpr)
      skip = 30
    }
    n = 0
    sum = 0
  }
}

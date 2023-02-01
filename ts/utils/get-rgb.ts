import type { Hex, HSL } from "./types"

const getRGB = {
  fromHSL(HSL: HSL) {
    const { h, s, l } = HSL

    const s1 = s / 100
    const l1 = l / 100
    const k = (n: number) => (n + h / 30) % 12
    const a = s1 * Math.min(l1, 1 - l1)
    const f = (n: number) =>
      l1 - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))

    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4)),
    }
  },

  fromHex(hex: Hex) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    return { r, g, b }
  }
}

export default getRGB

import type { Hex, RGB } from "./types"

const getHSL = {
  fromHex(hex: Hex) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    return getHSL.fromRGB({ r, g, b })
  },

  fromRGB({ r, g, b }: RGB) {
    const r1 = r / 255
    const g1 = g / 255
    const b1 = b / 255
    const maxColor = Math.max(r1, g1, b1)
    const minColor = Math.min(r1, g1, b1)
    let l = (maxColor + minColor) / 2
    let s = 0
    let h = 0
    if (maxColor !== minColor)
      if (l < 0.5) s = (maxColor - minColor) / (maxColor + minColor)
      else s = (maxColor - minColor) / (2.0 - maxColor - minColor)
    if (r1 === maxColor) h = (g1 - b1) / (maxColor - minColor)
    else if (g1 === maxColor) h = 2.0 + (b1 - r1) / (maxColor - minColor)
    else h = 4.0 + (r1 - g1) / (maxColor - minColor)
    l = l * 100
    s = s * 100
    h = h * 60
    if (h < 0) h += 360
    h = Math.round(h)
    s = Math.round(s)
    l = Math.round(l)

    return { h, s, l }
  },
}

export default getHSL

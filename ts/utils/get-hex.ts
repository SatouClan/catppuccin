import getRGB from "./get-rgb"
import type { Hex, HSL, RGB } from "./types"

const getHex = {
  /** get hex from rgb */
  fromRGB(RGB: RGB) {
    const { r, g, b } = RGB
    const r1 = r.toString(16).padStart(2, "0")
    const g1 = g.toString(16).padStart(2, "0")
    const b1 = b.toString(16).padStart(2, "0")

    return `#${r1}${g1}${b1}`
  },

  /** get hex from hsl */
  fromHSL(HSL: HSL): Hex {
    const RGB = getRGB.fromHSL(HSL)
    return getHex.fromRGB(RGB) as Hex
  },
}

export default getHex

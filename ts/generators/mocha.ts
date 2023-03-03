import generateCSS from "../utils/generate-css"
import modify from "../utils/modify"
import { ACCENT, MOCHA } from "../colors/base"

const MOD = {
  accent_saturation: 4,
  background_saturation: -1,
  accent_brightness: 0,
  background_brightness: -1,
  red: 1,
  blue: 3,
}

const moddedMocha = modify(MOCHA, {
  HSLTransformer(prop, HSL) {
    return {
      h: HSL.h,
      s: Math.min(
        100,
        HSL.s +
          (ACCENT.includes(prop as any)
            ? MOD.accent_saturation
            : MOD.background_saturation)
      ),
      l: Math.min(
        100,
        HSL.l +
          (ACCENT.includes(prop as any)
            ? MOD.accent_brightness
            : MOD.background_brightness)
      ),
    }
  },

  RGBTransformer(_prop, RGB) {
    return {
      r: Math.min(255, RGB.r + MOD.red),
      g: RGB.g,
      b: Math.min(255, RGB.b + MOD.blue),
    }
  },
})

const CSS: string = generateCSS("mocha", moddedMocha)

console.log(JSON.stringify(moddedMocha, null, 2))
console.log("\n\n")
console.log(CSS)

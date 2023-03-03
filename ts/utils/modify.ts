import getHex from "./get-hex"
import getHSL from "./get-hsl"
import getRGB from "./get-rgb"
import type { ColorSet, ModifyOptions } from "./types"

const generateModifiedColorPalette = function (
  colorSet: ColorSet,
  {
    RGBTransformer = (_prop, RGB) => RGB,
    HSLTransformer = (_prop, HSL) => HSL,
  }: ModifyOptions
) {
  let newColorSet: ColorSet = colorSet

  for (const [prop, hex] of Object.entries(colorSet)) {
    newColorSet[prop as keyof typeof newColorSet] = getHex.fromHSL(
      HSLTransformer(
        prop as any,
        getHSL.fromRGB(RGBTransformer(prop as any, getRGB.fromHex(hex)))
      )
    )
  }

  return newColorSet
}

export default generateModifiedColorPalette

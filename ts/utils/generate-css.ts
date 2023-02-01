import type { ColorSet, ColorSetName } from "./types"

const generateCSS = function (name: ColorSetName, colorSet: ColorSet) {
  let CSS = ""

  for (const [prop, hex] of Object.entries(colorSet))
    CSS += `--${name}-${prop}: ${hex};\n`

  return CSS
}

export default generateCSS

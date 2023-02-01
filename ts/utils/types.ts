export type HSL = { h: number; s: number; l: number }
export type Hex = `#${string}`
export type RGB = { r: number; g: number; b: number }

type RGBTransformer = (prop: ColorSetProp, RGB: RGB) => RGB
type HSLTransformer = (prop: ColorSetProp, HSL: HSL) => HSL
export type ModifyOptions = {
  RGBTransformer?: RGBTransformer
  HSLTransformer?: HSLTransformer
}

export type ColorSetName = "mocha" | "macchiato" | "frappe" | "latte"
export type ColorSet = Record<
  | "rosewater"
  | "flamingo"
  | "pink"
  | "mauve"
  | "red"
  | "maroon"
  | "peach"
  | "yellow"
  | "green"
  | "teal"
  | "sky"
  | "sapphire"
  | "blue"
  | "lavender"
  | "text"
  | "subtext1"
  | "subtext0"
  | "overlay2"
  | "overlay1"
  | "overlay0"
  | "surface2"
  | "surface1"
  | "surface0"
  | "base"
  | "mantle"
  | "crust",
  Hex
>
export type ColorSetProp = keyof ColorSet

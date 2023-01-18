const MINUS_SATURATION = 3
const ADD_SATURATION = 3

const CLASSIC_MOCHA = {
  rosewater: "#f5e0dc",
  flamingo: "#f2cdcd",
  pink: "#f5c2e7",
  mauve: "#cba6f7",
  red: "#f38ba8",
  maroon: "#eba0ac",
  peach: "#fab387",
  yellow: "#f9e2af",
  green: "#a6e3a1",
  teal: "#94e2d5",
  sky: "#89dceb",
  sapphire: "#74c7ec",
  blue: "#89b4fa",
  lavender: "#b4befe",
  text: "#cdd6f4",
  subtext1: "#bac2de",
  subtext0: "#a6adc8", // stop increase at subtext0 => COUNT = 17
  overlay2: "#9399b2",
  overlay1: "#7f849c",
  overlay0: "#6c7086",
  surface2: "#585b70",
  surface1: "#45475a",
  surface0: "#313244",
  base: "#1e1e2e",
  mantle: "#181825",
  crust: "#11111b",
} satisfies Record<string, `#${string}`>

const INCREASE = [
  "rosewater",
  "flamingo",
  "pink",
  "mauve",
  "red",
  "maroon",
  "peach",
  "yellow",
  "green",
  "teal",
  "sky",
  "sapphire",
  "blue",
  "lavender",
  "text",
  "subtext1",
  "subtext0",
]

const hexToRGB = function (hex: `#${string}`) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  return { r, g, b }
}

const RGBToHSL = function (RGB: { r: number; g: number; b: number }) {
  const { r, g, b } = RGB
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
}

const HSLToRGB = function (HSL: { h: number; s: number; l: number }) {
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
}

const RGBToHex = function (RGB: { r: number; g: number; b: number }) {
  const { r, g, b } = RGB
  const r1 = r.toString(16).padStart(2, "0")
  const g1 = g.toString(16).padStart(2, "0")
  const b1 = b.toString(16).padStart(2, "0")

  return `#${r1}${g1}${b1}`
}

const modHSL = function (
  HSL: { h: number; s: number; l: number },
  name: typeof INCREASE[number]
) {
  const { h, s, l } = HSL

  if (INCREASE.includes(name)) return { h, s: s + ADD_SATURATION, l }

  return { h, s: s - MINUS_SATURATION, l }
}

const capitalize = function (str: string) {
  return str[0].toUpperCase() + str.slice(1)
}

const generateCSS = function () {
  let CSS = ""

  for (const [name, hex] of Object.entries(CLASSIC_MOCHA)) {
    const classicHSL = RGBToHSL(hexToRGB(hex))
    const moddedHSL = modHSL(classicHSL, name)
    CSS += `--mocha-${name}: ${RGBToHex(HSLToRGB(moddedHSL))};\n`
  }

  return CSS
}

const RGBToString = function (RGB: { r: number; g: number; b: number }) {
  const { r, g, b } = RGB
  return `rgb(${r}, ${g}, ${b})`
}

const HSLToString = function (HSL: { h: number; s: number; l: number }) {
  const { h, s, l } = HSL
  return `hsl(${h}, ${s}%, ${l}%)`
}

const generateHTML = function () {
  let HTML = ''

  for (const [name, hex] of Object.entries(CLASSIC_MOCHA)) {
    const classicHSL = RGBToHSL(hexToRGB(hex))

    const moddedHSL = modHSL(classicHSL, name)
    const moddedRGB = HSLToRGB(moddedHSL)
    const moddedHex = RGBToHex(moddedRGB)

    HTML += `
    <tr>
      <td>
        <div
          style="
            background-color: ${moddedHex};
            width: 23px;
            height: 23px;
            border-radius: 50px;
          "
        ></div>
      </td>
      <td>${capitalize(name)}</td>
      <td><code>${moddedHex}</code></td>
      <td><code>${RGBToString(moddedRGB)}</code></td>
      <td><code>${HSLToString(moddedHSL)}</code></td>
    </tr>
    `
  }

  return HTML
}

console.log(generateCSS())
console.log(generateHTML())

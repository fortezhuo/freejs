import tailwindStyles from "./styles.json"
import matchAll from "match-all"

const useVariables = (object) => {
  const newObject = {}

  for (const [key, value] of Object.entries(object)) {
    if (!key.startsWith("--")) {
      if (typeof value === "string") {
        newObject[key] = value.replace(/var\(([a-zA-Z-]+)\)/, (_, name) => {
          return object[name]
        })
      } else {
        newObject[key] = value
      }
    }
  }

  return newObject
}

const FONT_VARIANT_REGEX = /(oldstyle-nums|lining-nums|tabular-nums|proportional-nums)/g

const addFontVariant = (style, classNames) => {
  const matches = matchAll(classNames, FONT_VARIANT_REGEX).toArray()

  if (matches.length > 0) {
    style.fontVariant = matches
  }
}

const FONT_SIZE_REGEX = /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)/
const LETTER_SPACING_REGEX = /(tracking-[a-z]+)/

const addLetterSpacing = (tailwindStyles, style, classNames) => {
  const letterSpacingMatches = LETTER_SPACING_REGEX.exec(classNames)

  if (!letterSpacingMatches) {
    return
  }

  const fontSizeMatches = FONT_SIZE_REGEX.exec(classNames)

  if (!fontSizeMatches) {
    throw new Error(
      "Font size is required when applying letter spacing, e.g. 'text-lg tracking-tighter'" // eslint-disable-line quotes
    )
  }

  const letterSpacingClass = letterSpacingMatches[0]
  const { letterSpacing } = tailwindStyles[letterSpacingClass]
  const fontSizeClass = fontSizeMatches[0]
  const { fontSize } = tailwindStyles[fontSizeClass]

  style.letterSpacing = Number.parseFloat(letterSpacing) * fontSize
}

export const tw: any = (classNames, adhoc) => {
  const style = {}

  if (!classNames) {
    return style
  }

  addFontVariant(style, classNames)
  addLetterSpacing(tailwindStyles, style, classNames)

  const separateClassNames = classNames
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter((className) => !className.startsWith("tracking-"))

  for (const className of separateClassNames) {
    if (tailwindStyles[className]) {
      Object.assign(style, tailwindStyles[className])
    } else {
      console.warn(`Unsupported Tailwind class: "${className}"`)
    }
  }

  return adhoc ? { ...useVariables(style), ...adhoc } : useVariables(style)
}

export const color: any = (name) => {
  const obj = tw(name)
  return obj.backgroundColor || obj.color
}

export const border: any = (twColor) => {
  return twColor.replace("bg-", "border-")
}

export const text: any = (twColor) => {
  return twColor.replace("bg-", "text-")
}

import path from "path"
import fs from "fs"
import css from "css"
import cssToReactNative from "css-to-react-native"
import pkgJson from "tailwindcss/package.json"

console.log(`Build style.json from tailwind ${pkgJson.version}`)

const pkgPath = require.resolve("tailwindcss").replace(pkgJson.main, "")
const source = fs.readFileSync(path.join(pkgPath, pkgJson.style), "utf8")
const shadowSource = fs.readFileSync(
  path.join(__dirname, "shadow.css"),
  "utf-8"
)

const { stylesheet } = css.parse(source)
const remToPx = (value) => `${parseFloat(value) * 16}px`
const translateValues = (value) => {
  let translatedValue = value

  if (translatedValue === "transparent") {
    return "rgba(0,0,0,0)"
  }

  if (typeof translatedValue !== "string") {
    return translatedValue
  }

  if (value.search(/^-?[0-9]+$/) !== -1) {
    return parseInt(translatedValue)
  }

  if (value.search(/-?\.[0-9]+$/) !== -1) {
    return parseFloat(translatedValue)
  }

  if (value.search(/^[0-9]+$/) !== -1) {
    return parseInt(translatedValue)
  }

  return translatedValue
}

const convertShadow = (rule) => {
  if (rule.declarations.length > 1) {
    throw new Error(
      "tailwind-rn assums shadows are a box-shadow with a single shorthand value, something more complex was found"
    )
  }

  let results, color, elevation

  if (
    rule.declarations[0].value === "none" ||
    rule.declarations[0].value.search(/inset/) !== -1
  ) {
    return {
      shadowColor: "rgba(0, 0, 0, 0)",
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 0,
      shadowOpacity: 0,
      elevation: 0,
    }
  }

  results = rule.declarations[0].value.match(
    /^([0-9]+)p?x?\s([0-9]+)p?x?\s([0-9]+)p?x?\s(-?[0-9]+)?p?x?\s?(rgba?\(.+?\))?(#[a-zA-Z0-9]{3,8})?/
  )

  elevation = rule.declarations[0].value.match(/,(?:\s+)?(-?[0-9]+)$/)

  color = results[5]

  elevation = elevation
    ? translateValues(elevation[1])
    : translateValues(results[3]) / 2

  if (typeof color === "undefined") {
    color = results[6]
  }

  return {
    shadowColor: color,
    shadowOffset: {
      width: translateValues(results[1]),
      height: translateValues(results[2]),
    },
    shadowRadius: translateValues(results[3]),
    shadowOpacity: 1,
    elevation: Math.round(elevation),
  }
}

const getStyles = (rule) => {
  const styles = rule.declarations
    .filter(({ property, value }) => {
      if (property === "line-height" && !value.endsWith("rem")) {
        return false
      }

      return true
    })
    .map(({ property, value }) => {
      if (value.endsWith("rem")) {
        return [property, remToPx(value)]
      }

      return [property, value]
    })

  return cssToReactNative(styles)
}

const unsupportedProperties = new Set([
  "box-sizing",
  "box-shadow",
  "float",
  "clear",
  "object-fit",
  "object-position",
  "overflow-x",
  "overflow-y",
  "-webkit-overflow-scrolling",
  "overscroll-behavior",
  "overscroll-behavior-x",
  "overscroll-behavior-y",
  "visibility",
  "order",
  "grid-template-columns",
  "grid-column",
  "grid-column-start",
  "grid-column-end",
  "grid-template-rows",
  "grid-row",
  "grid-row-start",
  "grid-row-end",
  "grid-auto-flow",
  "grid-auto-columns",
  "grid-auto-rows",
  "gap",
  "column-gap",
  "row-gap",
  "justify-items",
  "justify-self",
  "place-content",
  "place-items",
  "place-self",
  "font-family",
  "list-style-type",
  "list-style-position",
  "text-decoration",
  "vertical-align",
  "white-space",
  "word-break",
  "background-attachment",
  "background-clip",
  "background-position",
  "background-repeat",
  "background-size",
  "background-image",
  "border-collapse",
  "table-layout",
  "transition-property",
  "transition-duration",
  "transition-timing-function",
  "transition-delay",
  "animation",
  "transform",
  "transform-origin",
  "appearance",
  "cursor",
  "outline",
  "resize",
  "user-select",
  "fill",
  "stroke",
  "stroke-width",
])

const isUtilitySupported = (utility, rule) => {
  if (utility.includes(":")) {
    return false
  }

  if (
    [
      "clearfix",
      "antialiased",
      "subpixel-antialiased",
      "sr-only",
      "not-sr-only",
    ].includes(utility) ||
    /^(space|placeholder|from|via|to|divide)-/.test(utility) ||
    /^-?(scale|rotate|translate|skew)-/.test(utility)
  ) {
    return false
  }

  // Skip utilities with unsupported properties
  for (const { property, value } of rule.declarations) {
    if (!property && !value) {
      return false
    }

    if (unsupportedProperties.has(property)) {
      return false
    }

    if (property === "display" && !["flex", "none"].includes(value)) {
      return false
    }

    if (
      property === "overflow" &&
      !["visible", "hidden", "scroll"].includes(value)
    ) {
      return false
    }

    if (property === "position" && !["absolute", "relative"].includes(value)) {
      return false
    }

    if (property === "line-height" && !value.endsWith("rem")) {
      return false
    }

    if (
      value === "auto" ||
      value.endsWith("vw") ||
      value.endsWith("vh") ||
      value === "currentColor"
    ) {
      return false
    }
  }

  return true
}

// Mapping of Tailwind class names to React Native styles
const styles: any = {}

for (const rule of stylesheet.rules) {
  if (rule.type === "rule") {
    for (const selector of rule.selectors) {
      const utility = selector.replace(/^\./, "").replace("\\", "")

      if (isUtilitySupported(utility, rule)) {
        styles[utility] = getStyles(rule)
      }
    }
  }
}

const shadow = css.parse(shadowSource).stylesheet
// Shadow Patch
for (const rule of shadow.rules) {
  if (rule.type === "rule") {
    for (const selector of rule.selectors) {
      const utility = selector.replace(/^\./, "").replace("\\", "")
      if (/^shadow-/.test(utility)) {
        styles[utility] = convertShadow(rule)
      }
    }
  }
}

// Additional styles that we're not able to parse correctly automatically
styles.underline = { textDecorationLine: "underline" }
styles["line-through"] = { textDecorationLine: "line-through" }
styles["no-underline"] = { textDecorationLine: "none" }

// Additional styles that we're not able to parse correctly automatically
styles.underline = { textDecorationLine: "underline" }
styles["line-through"] = { textDecorationLine: "line-through" }
styles["no-underline"] = { textDecorationLine: "none" }

fs.writeFileSync(
  path.join(__dirname, "styles.json"),
  JSON.stringify(styles, null, "\t")
)

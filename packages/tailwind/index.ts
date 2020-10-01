import styles from "./styles.json"

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

export const tw: any = (classNames, adhoc) => {
  const obj = {}

  if (!classNames) {
    return obj
  }

  for (const className of classNames.replace(/\s\s+/g, " ").trim().split(" ")) {
    if (styles[className]) {
      Object.assign(obj, styles[className])
    } else {
      console.warn(
        `Unsupported Tailwind class: "${className}" on "${classNames}"`
      )
    }
  }

  return adhoc ? { ...useVariables(obj), ...adhoc } : useVariables(obj)
}

export const color: any = (name) => {
  const obj = tw(name)
  return obj.backgroundColor || obj.color
}

export const adjust: any = (twColor, n) => {
  const intensity = twColor.split("-").pop()
  const prefix = twColor.replace(intensity, "")
  return `${prefix}${(+(intensity / 100) + n) * 100}`
}

export const border: any = (twColor) => {
  return twColor.replace("bg-", "border-")
}

export const text: any = (twColor) => {
  return twColor.replace("bg-", "text-")
}

export const replaceKey = (key, twClass) => {
  return { [key]: Object.values(tw(twClass))[0] }
}

import { isOption } from "./isOption"

export function getDisplayValue(value: any, keyLabel: string) {
  if (Array.isArray(value)) {
    return value.map((o) => isOption(o) && o[keyLabel]).join(", ")
  }

  return isOption(value) ? value[keyLabel] : ""
}

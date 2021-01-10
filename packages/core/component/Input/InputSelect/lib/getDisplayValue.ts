import { isOption } from "./isOption"

export function getDisplayValue(value: any, keyLabel: string) {
  if (Array.isArray(value)) {
    return value.map((o) => isOption(o, keyLabel) && o[keyLabel])
  }

  return isOption(value, keyLabel) ? value[keyLabel] : ""
}

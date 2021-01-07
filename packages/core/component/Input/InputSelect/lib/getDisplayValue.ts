import { isOption } from "./isOption"

export function getDisplayValue(value: any) {
  if (Array.isArray(value)) {
    return value.map((o) => isOption(o) && o.name).join(", ")
  }

  return isOption(value) ? value.name : ""
}

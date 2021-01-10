import { isOption } from "./isOption"
import { valueToArray } from "./valuteToArray"

export function getDisplayValue(
  value: any,
  keyLabel: string,
  multiple: boolean
) {
  if (multiple) {
    return valueToArray(value).map((o) => isOption(o, keyLabel) && o[keyLabel])
  }

  return isOption(value, keyLabel) ? value[keyLabel] : ""
}

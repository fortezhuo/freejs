import { isOption } from "./isOption"

export function getValue(option: JSONObject | null, keyValue: string) {
  if (!option) {
    return null
  }

  return isOption(option) ? option[keyValue] : null
}

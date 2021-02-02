import { isOption } from "./isOption"

export function getValue(option: JSONObject | undefined, keyValue: string) {
  if (!option) {
    return null
  }

  return isOption(option, keyValue) ? option[keyValue] : null
}

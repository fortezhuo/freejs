import { isOption } from "./isOption"

export function getValue(option?: JSONObject | null) {
  if (!option) {
    return null
  }

  return isOption(option) ? option.value : null
}

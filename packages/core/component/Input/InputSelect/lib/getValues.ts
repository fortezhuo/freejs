import { getValue } from "./getValue"
import { valueToArray } from "./valueToArray"

export function getValues(
  options: JSONObject[] | null,
  keyValue: string,
  multiple: boolean
) {
  if (multiple) {
    return valueToArray(options)
      .map((o) => getValue(o, keyValue))
      .filter((o) => o != null)
  } else {
    return getValue(options, keyValue)
  }
}

import { getValue } from "./getValue"

export function getValues(
  options: JSONObject[] | null,
  keyValue: string,
  multiple: boolean
) {
  if (multiple) {
    return (options ? (Array.isArray(options) ? options : [options]) : [])
      .map((o) => getValue(o, keyValue))
      .filter((v) => v !== null)
  } else {
    return getValue(options, keyValue)
  }
}

import { getValue } from "./getValue"

export function getValues(options: JSONObject[] | null, keyValue: string) {
  if (Array.isArray(options)) {
    return options.map((o) => getValue(o, keyValue)).filter((v) => v !== null)
  }

  return getValue(options, keyValue)
}

import { getValue } from "./getValue"

export function getValues(options?: JSONObject[] | null) {
  if (Array.isArray(options)) {
    return options.map((o) => getValue(o)).filter((v) => v !== null)
  }

  return getValue(options)
}

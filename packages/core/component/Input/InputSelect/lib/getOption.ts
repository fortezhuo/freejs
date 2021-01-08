import { isOption } from "./isOption"

export function getOption(value: any, options: JSONObject[], keyValue: string) {
  if (isOption(value)) {
    return value
  }

  const newValue =
    value === null && options.length ? options[0][keyValue] : value
  return options.find((o) => o[keyValue] == newValue)
}

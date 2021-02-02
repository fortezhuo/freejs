import { isOption } from "./isOption"

export function getOption(
  value: any,
  options: JSONObject[],
  keyValue: string,
  keyLabel?: string
) {
  if (isOption(value, keyValue)) {
    return value
  }

  const newValue =
    value === null && options.length ? options[0][keyValue] : value
  const option = options.find((o) => o[keyValue] == newValue)
  return option || (keyLabel && { [keyValue]: value, [keyLabel]: value })
}

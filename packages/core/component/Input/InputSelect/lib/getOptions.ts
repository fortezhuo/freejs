import { getOption } from "./getOption"

export function getOptions(
  value: any,
  oldValue: any,
  options: any,
  multiple: boolean,
  keyValue: string
) {
  const selected = !Array.isArray(value)
    ? getOption(value, options, keyValue)
    : value.map((v) => getOption(v, options, keyValue))
  if (!multiple) {
    return selected || oldValue
  }
  return (oldValue || []).concat(selected || [])
}

import { getOption } from "./getOption"

export function getOptions(
  value: any,
  oldValue: any,
  options: any,
  multiple: boolean,
  keyValue: string,
  keyLabel?: string
) {
  if (value) {
    const selected = !Array.isArray(value)
      ? getOption(value, options, keyValue)
      : value.map((v) => getOption(v, options, keyValue, keyLabel))
    if (!multiple) {
      return selected || oldValue
    }
    return (oldValue || []).concat(selected || [])
  } else {
    if (multiple && (oldValue || []).length) {
      return oldValue.slice(0, -1)
    }
  }
}

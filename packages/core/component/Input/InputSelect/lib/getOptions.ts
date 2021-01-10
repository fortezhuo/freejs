import { valueToArray } from "./valuteToArray"
import { getOption } from "./getOption"

export function getOptions(
  value: any,
  oldValue: any,
  options: any,
  multiple: boolean,
  keyValue: string
) {
  const newOption = getOption(value, options, keyValue)

  if (!multiple) {
    return newOption || oldValue
  }

  const newOptions = valueToArray(oldValue)
    .map((o) => getOption(o, options, keyValue))
    .filter((o) => o != null)

  if (!newOption) {
    return newOptions
  }

  const optionIndex = newOptions.findIndex(
    (o) => o[keyValue] == newOption[keyValue]
  )

  if (optionIndex >= 0) {
    newOptions.splice(optionIndex, 1)
  } else {
    newOptions.push(newOption)
  }

  return newOptions
}

export function getDefaultOptions(
  value: any,
  options: any,
  multiple: boolean,
  keyValue: string
) {
  if (!multiple) {
    return getOption(value, options, keyValue)
  }

  const aValue = value == null ? [] : Array.isArray(value) ? value : [value]

  return (options || []).filter(
    (o: JSONObject) => aValue.indexOf(o[keyValue]) >= 0
  )
}

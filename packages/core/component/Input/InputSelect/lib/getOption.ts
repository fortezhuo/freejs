import { isOption } from "./isOption"

export function getOption(value: any, options: JSONObject[]) {
  if (isOption(value)) {
    return value
  }

  const newValue = value === null && options.length ? options[0].value : value
  // eslint-disable-next-line eqeqeq
  return options.find((o) => o.value == newValue)
}

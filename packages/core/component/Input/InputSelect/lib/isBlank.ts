export function isBlank(value: string[] | string | undefined) {
  return !Array.isArray(value)
    ? value === "" || value == undefined
    : value.length == 0
}

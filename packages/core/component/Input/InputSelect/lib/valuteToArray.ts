export function valueToArray(value: any) {
  return !Array.isArray(value) ? [value] : value
}

export function valueToArray(value: any) {
  return !!value ? (!Array.isArray(value) ? [value] : value) : []
}

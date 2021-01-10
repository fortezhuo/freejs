export function isOption(option: JSONObject, key: string) {
  return option !== null && typeof option === "object" && `${key}` in option
}

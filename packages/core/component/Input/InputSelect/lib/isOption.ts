export function isOption(option?: JSONObject) {
  return (
    option !== null &&
    typeof option === "object" &&
    "value" in option &&
    "name" in option
  )
}

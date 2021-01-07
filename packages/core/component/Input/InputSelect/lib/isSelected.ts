export function isSelected(itemValue: JSONObject, selectedValue: JSONObject) {
  if (!selectedValue) {
    return false
  }

  return Array.isArray(selectedValue)
    ? // eslint-disable-next-line eqeqeq
      selectedValue.findIndex((item) => item.value == itemValue.value) >= 0
    : // eslint-disable-next-line eqeqeq
      selectedValue.value == itemValue.value
}

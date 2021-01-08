export function isSelected(
  itemValue: JSONObject,
  selectedValue: JSONObject,
  keyValue: string
) {
  if (!selectedValue) {
    return false
  }

  return Array.isArray(selectedValue)
    ? selectedValue.findIndex(
        (item) => item[keyValue] == itemValue[keyValue]
      ) >= 0
    : selectedValue[keyValue] == itemValue[keyValue]
}

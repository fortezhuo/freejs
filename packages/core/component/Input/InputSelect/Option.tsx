import React from "react"
import { TouchableOpacity, View, StyleSheet } from "react-native"
import { theme } from "../../../config/theme"
import { Text } from "../../Text"
import { tw } from "@free/tailwind"

interface Item {
  highlighted: boolean
  children?: string
}

interface Option extends Item {
  onSelect: VoidFunction
  keyValue: string
  keyLabel: string
  option: JSONObject
}

export const Item: React.FC<Item> = React.memo(({ highlighted, children }) => {
  return (
    <View style={[s.viewItem, highlighted ? s.viewHiglighted : {}]}>
      <Text style={s.textItem}>{children}</Text>
    </View>
  )
})

export const Option: React.FC<Option> = React.memo(
  ({ onSelect, highlighted, keyValue, keyLabel, option }) => {
    return (
      <TouchableOpacity
        disabled={option.disabled}
        onPress={() => onSelect(option[keyValue])}
      >
        <Item highlighted={highlighted}>{option[keyLabel]}</Item>
      </TouchableOpacity>
    )
  }
)

const s = StyleSheet.create({
  viewItem: tw(`flex-1 flex-row p-2`),
  viewHiglighted: tw("bg-gray-200"),
  textItem: tw(`${theme.default_text} leading-5 mx-2`),
})

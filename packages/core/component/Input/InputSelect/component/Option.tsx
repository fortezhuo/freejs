import React from "react"
import { TouchableOpacity, View, StyleSheet } from "react-native"
import { theme } from "../../../../config/theme"
import { Text } from "../../../Text"
import { tw } from "@free/tailwind"

export const Option: React.FC<any> = React.memo(
  ({ onSelectOption, highlighted, keyValue, keyLabel, selected, option }) => {
    return (
      <TouchableOpacity
        disabled={option.disabled}
        onPress={() => onSelectOption(option[keyValue])}
      >
        <View
          style={[
            s.viewItem,
            highlighted ? s.viewHiglighted : selected ? s.viewSelected : {},
          ]}
        >
          <Text style={s.textItem}> {option[keyLabel]}</Text>
        </View>
      </TouchableOpacity>
    )
  }
)

const s = StyleSheet.create({
  viewItem: tw(`flex-1 flex-row p-2`),
  viewHiglighted: tw("bg-black-200"),
  viewSelected: tw("bg-black-100"),
  textItem: tw(`${theme.default_text} leading-5 mx-2`),
})

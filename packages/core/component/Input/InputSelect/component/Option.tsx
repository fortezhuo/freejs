import React from "react"
import { View } from "react-native"
import { MenuItem } from "../../../Menu"

// <View dataSet={{ index: option.index, value: escape(option.value) }}>

export const Option: React.FC<any> = React.memo(
  ({ onSelectOption, highlighted, selected, option }) => {
    return (
      <MenuItem
        active={selected}
        disabled={option.disabled}
        onPress={() => onSelectOption(option.value)}
      >
        {option.name}
      </MenuItem>
    )
  }
)

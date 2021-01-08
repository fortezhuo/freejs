import React from "react"
import { View } from "react-native"
import { MenuItem } from "../../../Menu"

// <View dataSet={{ index: option.index, value: escape(option,value) }}>

export const Option: React.FC<any> = React.memo(
  ({ onSelectOption, highlighted, keyValue, keyLabel, selected, option }) => {
    return (
      <MenuItem
        active={selected}
        disabled={option.disabled}
        onPress={() => onSelectOption(option[keyValue])}
      >
        {option[keyLabel]}
      </MenuItem>
    )
  }
)

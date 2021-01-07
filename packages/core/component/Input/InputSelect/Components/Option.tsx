import React from "react"
import { MenuItem } from "../../../Menu"

export const Option: React.FC<any> = React.memo(
  ({ onSelectOption, highlighted, selected, option }) => {
    return (
      <MenuItem
        dataSet={{ index: option.index, value: escape(option.value) }}
        active={selected}
        disabled={option.disabled}
        onPress={() => onSelectOption(option.value)}
      >
        {option.name}
      </MenuItem>
    )
  }
)

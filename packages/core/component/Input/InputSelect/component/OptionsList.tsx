import React from "react"
import { FlatList } from "react-native"
import { Option } from "./Option"
import { isSelected } from "../lib/isSelected"

export const OptionsList: React.FC<any> = React.memo(
  ({ keyValue, keyLabel, options, onSelectOption, snapshot }) => {
    return (
      <FlatList
        data={options}
        keyExtractor={(opt: JSONObject) => opt[keyValue]}
        renderItem={({ item, index }: any) => (
          <Option
            keyValue={keyValue}
            keyLabel={keyLabel}
            selected={isSelected(item, snapshot.option, keyValue)}
            highlighted={snapshot.highlighted === index}
            option={item}
            onSelectOption={onSelectOption}
          />
        )}
      />
    )
  }
)

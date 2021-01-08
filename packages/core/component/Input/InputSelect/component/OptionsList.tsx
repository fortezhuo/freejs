import React from "react"
import { FlatList } from "react-native"
import { Option } from "./Option"
import { isSelected } from "../lib/isSelected"

export const OptionsList: React.FC<any> = React.memo(
  ({ options, onSelectOption, snapshot }) => (
    <FlatList
      data={options}
      keyExtractor={(opt: JSONObject) => opt[snapshot.keyValue]}
      renderItem={({ item, index }: any) => (
        <Option
          keyValue={snapshot.keyValue}
          keyLabel={snapshot.keyLabel}
          selected={isSelected(item, snapshot.option, snapshot.keyValue)}
          highlighted={snapshot.highlighted === index}
          option={item}
          onSelectOption={onSelectOption}
        />
      )}
    />
  )
)

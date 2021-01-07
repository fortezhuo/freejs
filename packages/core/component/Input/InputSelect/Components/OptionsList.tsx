import React from "react"
import { FlatList } from "react-native"
import { Option } from "./Option"
import { isSelected } from "../lib/isSelected"

export const OptionsList: React.FC<any> = React.memo(
  ({ options, onSelectOption, snapshot }) => (
    <FlatList
      data={options}
      keyExtractor={(opt: JSONObject) => opt.value}
      renderItem={({ item, index }: any) => (
        <Option
          selected={isSelected(item, snapshot.option)}
          highlighted={snapshot.highlighted === index}
          option={item}
          onSelectOption={onSelectOption}
        />
      )}
    />
  )
)

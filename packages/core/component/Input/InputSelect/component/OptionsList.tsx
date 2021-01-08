import React from "react"
import { FlatList } from "react-native"
import { Option } from "./Option"
import { isSelected } from "../lib/isSelected"

const ITEM_HEIGHT = 36
export const OptionsList: React.FC<any> = React.forwardRef(
  ({ keyValue, keyLabel, options, onSelectOption, snapshot }, ref: any) => {
    return (
      <FlatList
        ref={ref}
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
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
    )
  }
)

/*

      */

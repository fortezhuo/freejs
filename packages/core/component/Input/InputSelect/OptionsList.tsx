import React from "react"
import { FlatList } from "react-native"
import { Option } from "./Option"

const ITEM_HEIGHT = 36

interface OptionsList {
  ref: React.Ref<FlatList>
  keyValue: string
  keyLabel: string
  options: JSONObject[]
  onSelect: VoidFunction
  snapshot: JSONObject
}

export const OptionsList: React.FC<OptionsList> = React.forwardRef(
  (
    { keyValue, keyLabel, options, onSelect, snapshot },
    ref: React.Ref<FlatList>
  ) => {
    return (
      <FlatList
        keyboardDismissMode={"interactive"}
        keyboardShouldPersistTaps={"handled"}
        ref={ref}
        data={options}
        keyExtractor={(opt: JSONObject) => opt[keyValue]}
        renderItem={({ item, index }: any) => (
          <Option
            keyValue={keyValue}
            keyLabel={keyLabel}
            highlighted={snapshot.highlighted === index}
            option={item}
            onSelect={onSelect}
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

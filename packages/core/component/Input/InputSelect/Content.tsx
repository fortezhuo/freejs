import React from "react"
import { View, FlatList, TextInput, StyleSheet } from "react-native"
import { OptionsList } from "./OptionsList"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"
import { Item } from "./Option"

interface Content {
  options: JSONObject[]
  snapshot: JSONObject
  onSelect: VoidFunction
  emptyMessage: string
  search: boolean
  searchProps: JSONObject
}

export const Content: React.FC<Content> = React.memo(
  ({ options, snapshot, onSelect, emptyMessage, search, searchProps }) => {
    const refFlatList = React.useRef<FlatList>(null)
    const { value, highlighted } = snapshot

    React.useEffect(() => {
      if (refFlatList.current && !!highlighted) {
        refFlatList.current.scrollToIndex({ index: highlighted })
      }
    }, [value, highlighted, refFlatList])

    return (
      <View style={s.viewWrapper}>
        {search && <TextInput {...searchProps} style={s.inputText} />}

        {options.length ? (
          <OptionsList
            ref={refFlatList}
            keyLabel={snapshot.keyLabel}
            keyValue={snapshot.keyValue}
            onSelect={onSelect}
            snapshot={snapshot}
            options={options}
          />
        ) : (
          <Item highlighted={false}>{emptyMessage}</Item>
        )}
      </View>
    )
  }
)

const s = StyleSheet.create({
  viewWrapper: tw(`${theme.default_bg} ${theme.input_border}`, {
    paddingTop: 3,
    maxHeight: 185,
  }),
  inputText: tw(
    `w-full ${theme.default_bg} p-2 px-3 ${theme.default_border} border-b`,
    { height: 36 }
  ),
})

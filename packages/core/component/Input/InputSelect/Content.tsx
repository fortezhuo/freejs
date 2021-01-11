import React from "react"
import { View, FlatList, TextInput, StyleSheet } from "react-native"
import { OptionsList } from "./OptionsList"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"
import { Item } from "./Option"

export const Content: React.FC<any> = React.memo(
  ({ options, snapshot, onSelect, emptyMessage, searchProps }) => {
    const refFlatList = React.useRef<FlatList>(null)
    const { value, highlighted } = snapshot

    React.useEffect(() => {
      if (refFlatList.current && !!highlighted) {
        refFlatList.current.scrollToIndex({ index: highlighted })
      }
    }, [value, highlighted, refFlatList])

    return (
      <View style={s.viewWrapper}>
        <TextInput {...searchProps} style={s.inputText} />

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
          <Item>{emptyMessage}</Item>
        )}
      </View>
    )
  }
)

const s = StyleSheet.create({
  viewWrapper: tw(`${theme.default_bg} ${theme.input_border}`, {
    paddingTop: 3,
  }),
  inputText: tw(
    `w-full ${theme.default_bg} p-2 px-3 ${theme.default_border} border-b`
  ),
})

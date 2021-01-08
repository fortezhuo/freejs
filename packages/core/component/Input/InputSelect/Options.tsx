import React from "react"
import { View, FlatList, Text, TextInput, StyleSheet } from "react-native"
import { OptionsList } from "./OptionsList"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"

export const Options: React.FC<any> = React.memo(
  ({ options, snapshot, onSelectOption, emptyMessage, inputProps }) => {
    const refFlatList = React.useRef<FlatList>(null)
    const { value, highlighted } = snapshot
    const renderEmptyMessage = React.useCallback(() => {
      if (emptyMessage === null) {
        return null
      }

      return (
        <Text>
          {typeof emptyMessage === "function" ? emptyMessage() : emptyMessage}
        </Text>
      )
    }, [emptyMessage])

    React.useEffect(() => {
      if (refFlatList.current && !!highlighted && highlighted > 0) {
        refFlatList.current.scrollToIndex({ index: highlighted })
      }
    }, [value, highlighted, refFlatList])

    return (
      <View style={{ maxHeight: 200, backgroundColor: "white" }}>
        <TextInput
          {...inputProps}
          style={{ padding: 3, backgroundColor: "white" }}
        />

        {options.length ? (
          <OptionsList
            ref={refFlatList}
            keyLabel={snapshot.keyLabel}
            keyValue={snapshot.keyValue}
            onSelectOption={onSelectOption}
            snapshot={snapshot}
            options={options}
          />
        ) : (
          renderEmptyMessage()
        )}
      </View>
    )
  }
)

const s = StyleSheet.create({
  inputText: tw(
    `w-full ${theme.default_bg} p-2 px-3 ${theme.default_border} border-b`
  ),
})

import React from "react"
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { OptionsList } from "./OptionsList"
import { Icon } from "../../Icon"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"
import { Item } from "./Option"
import { H4 } from "../../Text"

interface Content {
  placeholder?: string
  options: JSONObject[]
  snapshot: JSONObject
  onSelect: VoidFunction
  onHide?: VoidFunction
  emptyMessage: string
  search: boolean
  searchProps: JSONObject
}

interface Placeholder {
  onPress: VoidFunction
  children: string
}

const Placeholder: React.FC<Placeholder> = React.memo(
  ({ onPress, children }) => {
    return (
      <View style={s.viewPlaceholder}>
        <H4 style={s.textPlaceholder}>{children}</H4>
        <TouchableOpacity onPress={onPress}>
          <Icon name="x" color={"black"} />
        </TouchableOpacity>
      </View>
    )
  }
)

export const Content: React.FC<Content> = React.memo(
  ({
    options,
    snapshot,
    onSelect,
    onHide,
    emptyMessage,
    search,
    placeholder,
    searchProps,
  }) => {
    const refFlatList = React.useRef<FlatList>(null)
    const { value, highlighted } = snapshot

    React.useEffect(() => {
      if (refFlatList.current && !!highlighted) {
        refFlatList.current.scrollToIndex({ index: highlighted })
      }
    }, [value, highlighted, refFlatList])

    return (
      <>
        {placeholder && !!onHide && (
          <Placeholder onPress={onHide}>{placeholder}</Placeholder>
        )}
        <View
          style={[
            s.viewWrapper,
            placeholder ? { height: 185 } : { maxHeight: 185 },
          ]}
        >
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
      </>
    )
  }
)

const s = StyleSheet.create({
  viewPlaceholder: tw("my-1 flex-row"),
  textPlaceholder: tw("flex-grow"),
  viewWrapper: tw(`${theme.default_bg} ${theme.input_border}`, {
    paddingTop: 3,
  }),
  inputText: tw(
    `w-full ${theme.default_bg} py-2 px-3 ${theme.default_border} border-b`
  ),
})

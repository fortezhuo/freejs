import React from "react"
import {
  TextInput,
  StyleSheet,
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native"
import { observer } from "mobx-react-lite"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"

export const Search: React.FC<Search> = observer(
  ({ refSearch, state, menu }) => {
    const onChange = React.useCallback((text: string) => {
      state.setIndex(0)
      state.setSearch(text)
    }, [])

    const onChangeIndex = React.useCallback((index: number) => {
      if (
        (state.index <= 0 && index === -1) ||
        (state.index >= state.options.length - 1 && index === +1)
      )
        return
      state.setIndex(state.index + index)
    }, [])

    const onEnter = React.useCallback(async () => {
      const { options, index } = state
      const option = index < options.length ? options[index] : undefined
      await state.onSelect(option)
    }, [])

    const onBackSpace = React.useCallback(async () => {
      let { value } = state
      value.pop()
      await state.onChange(value)
    }, [])

    const onKeyPress =
      Platform.OS !== "web"
        ? undefined
        : (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
            const { key } = e.nativeEvent
            if (key == "ArrowUp" || key == "ArrowDown") {
              onChangeIndex(key == "ArrowUp" ? -1 : 1)
            } else if (key == "Escape") {
              menu.hide()
            } else if (
              key == "Backspace" &&
              state.multi &&
              state.search == ""
            ) {
              onBackSpace()
            } else if (key == "Enter") {
              onEnter()
              menu.hide()
            }
          }

    return (
      <TextInput
        placeholder="Please type here ..."
        ref={refSearch}
        value={state.search}
        style={styles.inputText}
        onChangeText={onChange}
        onKeyPress={onKeyPress}
      />
    )
  }
)

const styles = StyleSheet.create({
  inputText: tw(
    `w-full ${theme.default_bg} p-2 px-3 ${theme.default_border} border-b`
  ),
})

type Search = {
  refSearch: any
  state: any
  menu: any
}

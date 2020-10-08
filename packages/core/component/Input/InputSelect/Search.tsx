import React, { FC } from "react"
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

export const Search: FC<Search> = observer(({ refSearch, state, menu }) => {
  let regex: any
  const onChange = (text: string) => {
    regex = new RegExp(text, "i")
    state.setIndex(0)
    state.setSearch(text)
    state.setOptions(state._options.filter((opt: any) => regex.test(opt.label)))
  }
  const onChangeIndex = (index: number) => {
    if (
      (state.index <= 0 && index === -1) ||
      (state.index >= state.options.length - 1 && index === +1)
    )
      return
    state.setIndex(state.index + index)
  }

  const onEnter = async () => {
    const option = state.options[state.index]
    await state.onSelect(option)
  }

  const onKeyPress =
    Platform.OS !== "web"
      ? undefined
      : (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
          const { key } = e.nativeEvent
          if (key == "ArrowUp" || key == "ArrowDown") {
            onChangeIndex(key == "ArrowUp" ? -1 : 1)
          } else if (key == "Escape") {
            menu.hide()
          } else if (key == "Backspace" && state.multi) {
          } else if (key == "Enter") {
            onEnter()
            menu.hide()
          }
        }

  return (
    <TextInput
      ref={refSearch}
      value={state.search}
      style={styles.inputText}
      onChangeText={onChange}
      onKeyPress={onKeyPress}
    />
  )
})

const styles = StyleSheet.create({
  inputText: tw(`w-full ${theme.input_bg} p-2 px-3`),
})

type Search = {
  refSearch: any
  state: any
  menu: any
}

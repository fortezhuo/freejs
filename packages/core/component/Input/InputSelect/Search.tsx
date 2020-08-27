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

export const Search: FC<any> = observer(({ refSearch, state, menu }) => {
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

  const onEnter = () => {
    const option = state.options[state.index]
    const options = state.multi ? state.value().push(option) : option
    state.onChange(options)
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
      style={state.multi ? {} : styles.rootTextInput}
      onChangeText={onChange}
      onKeyPress={onKeyPress}
    />
  )
})

const styles = StyleSheet.create({
  rootTextInput: tw("w-full bg-white p-2"),
})

import React, { FC, useRef } from "react"
import { View, TextInput, StyleSheet, Platform } from "react-native"
import { tw } from "@free/tailwind"
import { useOptions } from "./Options"
import { store, view } from "@risingstack/react-easy-state"

export const useSelection = () => {
  const state = store({ query: "", onInputFocus: () => {} })
  const Selection: FC<any> = view((props) => {
    const refInput = useRef(null)
    const { onDismiss, parent } = props
    const { Options, onChangeActive, onEnter } = useOptions()

    state.onInputFocus = () => {
      if (refInput.current) refInput.current.focus()
    }

    const onKeyPress =
      Platform.OS == "web"
        ? ({ nativeEvent }) => {
            const { key } = nativeEvent
            if (key == "ArrowUp" || key == "ArrowDown") {
              onChangeActive(key == "ArrowUp" ? -1 : 1)
            } else if (key == "Escape") {
              onDismiss()
            } else if (key == "Backspace") {
              if (state.query === "") {
                if (parent.multi) {
                  parent.value = parent.value.slice(0, -1)
                }
              }
            } else if (key == "Enter") {
              onEnter()
            }
          }
        : null

    return (
      <View style={styles.rootSelection}>
        <TextInput
          ref={refInput}
          value={state.query}
          placeholder="Search ..."
          style={styles.inputSearch}
          onKeyPress={onKeyPress}
          onChangeText={(text) => (state.query = text)}
        />
        <Options input={state} parent={parent} />
      </View>
    )
  })

  return { Selection, onInputFocus: () => state.onInputFocus() }
}

const styles = StyleSheet.create({
  rootSelection: tw("w-full bg-white border-gray-300 border"),
  inputSearch: tw("p-2"),
})

import React, { FC } from "react"
import { Display } from "./Display"
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"

export const Anchor: FC<Anchor> = observer(({ state, menu }) => {
  return (
    <TouchableWithoutFeedback disabled={state.disabled} onPress={menu.show}>
      <View
        style={StyleSheet.flatten([
          styles.rootAnchor,
          state.disabled ? styles.inputDisabled : {},
        ])}
      >
        <Display state={state} />
      </View>
    </TouchableWithoutFeedback>
  )
})

const styles = StyleSheet.create({
  rootAnchor: tw("bg-white border border-gray-300 rounded p-2 w-full flex-row"),
  inputDisabled: tw("bg-gray-400"),
})

type Anchor = {
  state?: any
  menu?: any
}

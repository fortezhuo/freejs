import React, { FC } from "react"
import { Display } from "./Display"
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { theme } from "../../../config/theme"

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
  rootAnchor: tw(`${theme.borderInput} ${theme.bgInput} p-3 w-full flex-row`),
  inputDisabled: tw(theme.bgDisabled),
})

type Anchor = {
  state?: any
  menu?: any
}

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
          styles.viewAnchor,
          state.disabled ? styles.viewDisabled : {},
        ])}
      >
        <Display state={state} />
      </View>
    </TouchableWithoutFeedback>
  )
})

const styles = StyleSheet.create({
  viewAnchor: tw(`${theme.input_border} ${theme.input_bg} p-3 w-full flex-row`),
  viewDisabled: tw(theme.input_disabled_bg),
})

type Anchor = {
  state?: any
  menu?: any
}

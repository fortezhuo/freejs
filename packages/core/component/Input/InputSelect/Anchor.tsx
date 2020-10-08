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
          state.multi ? styles.viewMulti : {},
          state.disabled ? styles.viewDisabled : {},
        ])}
      >
        <Display state={state} />
      </View>
    </TouchableWithoutFeedback>
  )
})

const styles = StyleSheet.create({
  viewAnchor: tw(
    `${theme.input_border} ${theme.default_bg} p-3 w-full flex-row`,
    { minHeight: 43 }
  ),
  viewMulti: tw("pt-1 pl-1 pb-1"),
  viewDisabled: tw(theme.disabled_bg),
})

type Anchor = {
  state?: any
  menu?: any
}

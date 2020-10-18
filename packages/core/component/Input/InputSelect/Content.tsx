import React, { FC, useCallback } from "react"
import { Button, H4 } from "../.."
import { Display } from "./Display"
import { View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { theme } from "../../../config/theme"
import { tw } from "@free/tailwind"

export const Content: FC<any> = observer(({ state, children, menu }) => {
  const onCancel = useCallback(() => {
    state.set({ _isMobileShow: false })
    menu.hide()
  }, [])

  const onCommit = useCallback(() => {
    state.onChange(state._temp)
    onCancel()
  }, [])

  return (
    <View
      style={
        state._isMobileShow ? styles.viewMenuMobile : styles.viewMenuDesktop
      }
    >
      {state._isMobileShow && (
        <>
          <H4>{state.placeholder}</H4>
          <Display state={state} />
        </>
      )}
      <View style={styles.viewWrapper}>{children}</View>
      {state._isMobileShow && (
        <View style={styles.viewButton}>
          <Button onPress={onCommit}>OK</Button>
          <Button onPress={onCancel}>Cancel</Button>
        </View>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  viewButton: tw("flex-row"),
  viewMenuDesktop: {
    marginTop: 1,
    height: 181,
  },
  viewMenuMobile: tw("bg-white p-6 rounded-lg shadow-lg"),
  viewWrapper: tw(`${theme.default_bg} ${theme.input_border}`, {
    paddingTop: 3,
  }),
})

import React from "react"
import { Button, H4 } from "../.."
import { Display } from "./Display"
import { View, StyleSheet, Platform } from "react-native"
import { observer } from "mobx-react-lite"
import { theme } from "../../../config/theme"
import { tw } from "@free/tailwind"

export const Content: React.FC<any> = observer(({ state, children, menu }) => {
  const placeholder = `${
    state.placeholder.toLowerCase().indexOf("select") >= 0 ? "" : "Select "
  }${state.placeholder}`
  const onCancel = React.useCallback(() => {
    state.set({ _isMobileShow: false })
    menu.hide()
  }, [])

  const onCommit = React.useCallback(() => {
    state.onChange(state._temp)
    onCancel()
  }, [])

  return (
    <View
      style={state.isMobile ? styles.viewMenuMobile : styles.viewMenuDesktop}
    >
      {state.isMobile && (
        <>
          <H4>{placeholder}</H4>
          <View style={styles.viewInput}>
            <Display state={state} />
          </View>
        </>
      )}
      <View
        style={StyleSheet.flatten([
          styles.viewWrapper,
          state.isMobile ? styles.viewWrapperMobile : {},
        ])}
      >
        {children}
      </View>
      {state.isMobile && (
        <View style={styles.viewButton}>
          <Button type={"primary_1_bg"} icon="check" onPress={onCommit}>
            OK
          </Button>
          <Button type={"danger_bg"} icon="x" onPress={onCancel}>
            Cancel
          </Button>
        </View>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  viewButton: tw("flex-row justify-evenly self-end", { width: 200 }),
  viewMenuDesktop: {
    marginTop: 1,
    height: 181,
  },
  viewMenuMobile: tw("bg-white p-3 rounded-lg shadow-lg"),
  viewInput: tw(
    `${theme.default_bg} ${theme.input_border} w-full h-10 flex-row my-2`
  ),
  viewWrapper: tw(`${theme.default_bg} ${theme.input_border}`, {
    paddingTop: 3,
  }),
  viewWrapperMobile: tw("mb-2", { height: 181 }),
})

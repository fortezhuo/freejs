import React from "react"
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native"
import { Modal, MenuItem, Col } from "../"
import { observer, useLocalObservable } from "mobx-react-lite"
import { tw } from "@free/tailwind"
import { MenuItemProps, DialogProps } from "@free/core"

const { color: iconColor } = tw("text-gray-700")
const noop = () => {}

export const useDialog = () => {
  const refContainer = React.useRef<View>(null)
  const state = useLocalObservable(() => ({
    isOpen: false,
    setOpen(isOpen: boolean) {
      state.isOpen = isOpen
    },
  }))

  const show = React.useCallback(() => {
    state.setOpen(true)
  }, [])

  const hide = React.useCallback(() => {
    state.setOpen(false)
  }, [])

  const Dialog: React.FC<DialogProps> = observer(
    ({ testID = "Dialog", anchor, children, onShow, allowBackDrop = true }) => {
      return (
        <View testID={testID} ref={refContainer} collapsable={false}>
          {anchor}
          <Modal
            isVisible={state.isOpen}
            onShow={onShow}
            onBackdropPress={allowBackDrop ? hide : noop}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              pointerEvents="box-none"
              style={styles.viewKeyboard}
            >
              <Col sm={11} style={styles.viewChildren}>
                {children}
              </Col>
            </KeyboardAvoidingView>
          </Modal>
        </View>
      )
    }
  )

  const BindMenuItem: React.FC<MenuItemProps> = observer(
    ({
      name,
      color = iconColor,
      children,
      onPress = noop,
      styleText,
      style,
    }) => {
      return (
        <MenuItem
          onPress={() => {
            onPress()
            hide()
          }}
          styleContainer={style}
          name={name}
          color={color}
          size={18}
          styleText={styleText}
        >
          {children}
        </MenuItem>
      )
    }
  )

  return {
    show,
    hide,
    Dialog,
    MenuItem: BindMenuItem,
  }
}

const styles = StyleSheet.create({
  viewKeyboard: tw("flex-1 justify-center"),
  viewChildren: tw("self-center"),
})

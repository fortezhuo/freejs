import React from "react"
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native"
import { Modal, Col } from "../"
import { MenuItem } from "./MenuItem"
import { observer, useLocalObservable } from "mobx-react-lite"
import { tw } from "@free/tailwind"
import { MenuItemProps, DialogProps } from "@free/core"

const { color: iconColor } = tw("text-gray-700")
const noop = () => {}

export const useMenuDialog = () => {
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

  const MenuDialog: React.FC<DialogProps> = observer(
    ({ testID = "Dialog", anchor, children, onShow, allowBackDrop = true }) => {
      return (
        <View testID={testID} ref={refContainer} collapsable={false}>
          {anchor}
          <Modal
            isVisible={state.isOpen}
            onShow={onShow}
            onBackdropPress={allowBackDrop ? hide : noop}
          >
            <Col sm={11} style={s.viewChildren}>
              {children}
            </Col>
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
    MenuDialog,
    MenuItem: BindMenuItem,
  }
}

const s = StyleSheet.create({
  viewChildren: tw("self-center"),
})

import React, { FC, useRef } from "react"
import { View, StyleSheet } from "react-native"
import { Modal, MenuItem, Col } from "../"
import { observer, useLocalObservable } from "mobx-react-lite"
import { tw } from "@free/tailwind"
import { MenuItemProps, DialogProps } from "@free/core"

const { color: iconColor } = tw("text-gray-700")
const noop = () => {}

export const useDialog = () => {
  const refContainer = useRef<View>(null)
  const state = useLocalObservable(() => ({
    isOpen: false,
    setOpen(isOpen: boolean) {
      state.isOpen = isOpen
    },
  }))

  const show = () => {
    state.setOpen(true)
  }
  const hide = () => {
    state.setOpen(false)
  }

  const Dialog: FC<DialogProps> = observer(
    ({ testID = "Dialog", anchor, children, onShow, allowBackDrop = true }) => {
      return (
        <View testID={testID} ref={refContainer} collapsable={false}>
          {anchor}
          <Modal
            avoidKeyboard={true}
            backdropTransitionOutTiming={0}
            style={{ margin: 0 }}
            isVisible={state.isOpen}
            onShow={onShow}
            onBackButtonPress={allowBackDrop ? hide : noop}
            onBackdropPress={allowBackDrop ? hide : noop}
          >
            <Col sm={11} style={styles.viewChildren}>
              {children}
            </Col>
          </Modal>
        </View>
      )
    }
  )

  const BindMenuItem: FC<MenuItemProps> = observer(
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
  viewChildren: tw("self-center"),
})

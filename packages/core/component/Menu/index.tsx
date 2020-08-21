import React, { FC, useRef } from "react"
import { View, StyleSheet } from "react-native"
import { Modal } from "../Modal"
import { IconButton } from "../Icon"
import { observer, useLocalStore } from "mobx-react-lite"
import { tw } from "@free/tailwind"
import { useStore } from "../Store"
import { MenuProps, MenuItemProps } from "@free/core"

const { color: iconColor } = tw("text-gray-700")
const SCREEN_INDENT = 2
const noop = () => {}

export const useMenu = () => {
  const refContainer = useRef<View>(null)
  const state = useLocalStore(() => ({
    isOpen: false,
    measure: {
      top: 0,
      left: 0,
      menuWidth: 0,
      menuHeight: 0,
      anchorWidth: 0,
      anchorHeight: 0,
    },
    setOpen(isOpen: boolean) {
      state.isOpen = isOpen
    },
    setMeasure(measure: any) {
      state.measure = { ...state.measure, ...measure }
    },
  }))

  const onMenuLayout = (e: any) => {
    const { width, height } = e.nativeEvent.layout
    state.setMeasure({
      menuWidth: Math.max(tw("w-48").width, width),
      menuHeight: height,
    })
  }

  const show = () => {
    if (refContainer.current) {
      refContainer.current.measureInWindow(
        (
          left: number,
          top: number,
          anchorWidth: number,
          anchorHeight: number
        ) => {
          state.setMeasure({
            left,
            top,
            anchorHeight,
            anchorWidth,
          })
          state.setOpen(true)
        }
      )
    }
  }
  const hide = () => state.setOpen(false)

  const Menu: FC<MenuProps> = observer(({ anchor, style, children }) => {
    const { ui } = useStore()
    const { menuWidth, menuHeight, anchorHeight } = state.measure
    let { left, top } = state.measure

    if (left > ui.dimension.width - menuWidth - SCREEN_INDENT) {
      left = ui.dimension.width - SCREEN_INDENT - menuWidth
    } else if (left < SCREEN_INDENT) {
      left = SCREEN_INDENT
    }

    if (top > ui.dimension.height - menuHeight - SCREEN_INDENT) {
      top = ui.dimension.height - SCREEN_INDENT
      top = Math.min(ui.dimension.height - SCREEN_INDENT, top + anchorHeight)
    } else if (top < SCREEN_INDENT) {
      top = SCREEN_INDENT
    } else {
      top += anchorHeight
    }

    const menuStyle = {
      width: menuWidth,
      left,
      top,
    }

    return (
      <View ref={refContainer} collapsable={false}>
        {anchor}
        <Modal
          visible={state.isOpen}
          onRequestClose={hide}
          onBackdropPress={hide}
          transparent
        >
          <View
            style={StyleSheet.flatten([styles.rootMenu, menuStyle, style])}
            onLayout={onMenuLayout}
          >
            {children}
          </View>
        </Modal>
      </View>
    )
  })

  const MenuItem: FC<MenuItemProps> = observer(
    ({
      name,
      color = iconColor,
      children,
      onPress = noop,
      styleText,
      style,
    }) => {
      return (
        <IconButton
          onPress={() => {
            onPress()
            hide()
          }}
          styleContainer={StyleSheet.flatten([styles.rootMenuItem, style])}
          name={name}
          color={color}
          size={18}
          styleText={StyleSheet.flatten([styles.textMenuItem, styleText])}
        >
          {children}
        </IconButton>
      )
    }
  )

  return {
    show,
    hide,
    Menu,
    MenuItem,
  }
}

const styles: any = StyleSheet.create({
  rootMenu: tw("absolute bg-transparent"),
  rootMenuItem: tw("flex-1 flex-row p-3 border-solid border-t border-gray-400"),
  textMenuItem: tw("text-gray-700 leading-5 mx-2"),
})

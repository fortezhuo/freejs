import React, { FC, useRef } from "react"
import { View, StyleSheet, Platform } from "react-native"
import { Modal } from "../Modal"
import { IconButton } from "../Icon"
import { observer, useLocalObservable } from "mobx-react-lite"
import { tw } from "@free/tailwind"
import { useStore } from "../Store"
import { MenuProps, MenuItemProps } from "@free/core"
import { theme } from "../../config/theme"

const { color: iconColor } = tw("text-gray-700")
const SCREEN_INDENT = 2
const noop = () => {}

export const useMenu = () => {
  const refContainer = useRef<View>(null)
  const state = useLocalObservable(() => ({
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
      menuWidth: Math.max(tw("w-48").width, width, state.measure.anchorWidth),
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

  const Menu: FC<MenuProps> = observer(
    ({
      testID = "Menu",
      waitKeyboard = false,
      anchor,
      style,
      children,
      onShow,
    }) => {
      const { app } = useStore()
      const { menuWidth, menuHeight, anchorHeight } = state.measure
      const isShow = app.keyboard.status === "shown"
      let { left, top } = state.measure

      if (left > app.dimension.width - menuWidth - SCREEN_INDENT) {
        left = app.dimension.width - SCREEN_INDENT - menuWidth
      } else if (left < SCREEN_INDENT) {
        left = SCREEN_INDENT
      }

      if (Platform.OS === "web") {
        top += anchorHeight
      } else {
        top = app.dimension.height - menuHeight + 2
        top -= Platform.OS === "ios" ? app.keyboard.height : 0
        top += Platform.OS === "android" ? 0 : anchorHeight * 2
      }

      const menuStyle = {
        opacity: isShow || !waitKeyboard ? 1 : 0,
        width: menuWidth,
        left,
        top,
      }

      return (
        <View testID={testID} ref={refContainer} collapsable={false}>
          {anchor}
          <Modal
            visible={state.isOpen}
            onShow={onShow}
            onRequestClose={hide}
            onBackdropPress={hide}
            transparent={true}
          >
            <View
              collapsable={false}
              style={StyleSheet.flatten([
                styles.viewChildren,
                menuStyle,
                style,
              ])}
              onLayout={onMenuLayout}
            >
              {children}
            </View>
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
    Menu,
    MenuItem: BindMenuItem,
  }
}

export const MenuItem: FC<MenuItemProps> = observer(
  ({
    active,
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
        }}
        styleContainer={StyleSheet.flatten([
          styles.viewItem,
          active ? styles.viewItemActive : {},
          style,
        ])}
        name={name}
        color={color}
        size={18}
        styleText={StyleSheet.flatten([styles.textItem, styleText])}
      >
        {children}
      </IconButton>
    )
  }
)

const styles = StyleSheet.create({
  viewChildren: tw("absolute bg-transparent"),
  viewItem: tw(`flex-1 flex-row p-2`),
  viewItemActive: tw("bg-black-100"),
  textItem: tw(`${theme.input_text} leading-5 mx-2`),
})

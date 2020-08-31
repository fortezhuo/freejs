import React, { FC, useRef } from "react"
import { View, StyleSheet } from "react-native"
import { Modal } from "../Modal"
import { IconButton } from "../Icon"
import { observer, useLocalStore } from "mobx-react-lite"
import { tw, adjust } from "@free/tailwind"
import { useStore } from "../Store"
import { MenuProps, MenuItemProps } from "@free/core"
import { theme } from "../../config/theme"

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
    ({ testID = "Menu", anchor, style, children, onShow }) => {
      const { app } = useStore()
      const { menuWidth, menuHeight, anchorHeight } = state.measure
      let { left, top } = state.measure

      if (left > app.dimension.width - menuWidth - SCREEN_INDENT) {
        left = app.dimension.width - SCREEN_INDENT - menuWidth
      } else if (left < SCREEN_INDENT) {
        left = SCREEN_INDENT
      }

      if (top > app.dimension.height - menuHeight - SCREEN_INDENT) {
        top = app.dimension.height - SCREEN_INDENT
        top = Math.min(app.dimension.height - SCREEN_INDENT, top + anchorHeight)
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
        <View testID={testID} ref={refContainer} collapsable={false}>
          {anchor}
          <Modal
            visible={state.isOpen}
            onShow={onShow}
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
    }
  )

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
          styles.rootMenuItem,
          active ? styles.rootMenuActive : {},
          style,
        ])}
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

const styles: any = StyleSheet.create({
  rootMenu: tw("absolute bg-transparent"),
  rootMenuItem: tw(`flex-1 flex-row p-2 ${theme.borderMenuItem}`),
  rootMenuActive: tw(theme.bgMenuItemActive),
  textMenuItem: tw(`${theme.textMenuItem} leading-5 mx-2`),
})

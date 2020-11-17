import React from "react"
import { View, StyleSheet } from "react-native"
import { Modal, IconButton, useStore } from "../"
import { observer, useLocalObservable } from "mobx-react-lite"
import { tw } from "@free/tailwind"
import { MenuProps, MenuItemProps } from "@free/core"
import { theme } from "../../config/theme"

const { color: iconColor } = tw("text-gray-700")
const SCREEN_INDENT = 2
const noop = () => {}

export const useMenu = () => {
  const refContainer = React.useRef<View>(null)
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
  const hide = () => {
    state.setOpen(false)
  }

  const Menu: React.FC<MenuProps> = observer(
    ({
      testID = "Menu",
      anchor,
      style,
      children,
      onShow,
      allowBackDrop = true,
    }) => {
      if (!state || !state.measure) return null
      const { app } = useStore()
      const { menuWidth, anchorHeight } = state.measure
      let { left, top } = state.measure

      if (left > app.dimension.width - menuWidth - SCREEN_INDENT) {
        left = app.dimension.width - SCREEN_INDENT - menuWidth
      } else if (left < SCREEN_INDENT) {
        left = SCREEN_INDENT
      }

      top += anchorHeight

      const menuStyle = {
        width: menuWidth,
        left,
        top,
      }

      return (
        <View testID={testID} ref={refContainer} collapsable={false}>
          {anchor}
          <Modal
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropTransitionOutTiming={0}
            style={{ margin: 0 }}
            isVisible={state.isOpen}
            onModalShow={onShow}
            onBackButtonPress={allowBackDrop ? hide : noop}
            onBackdropPress={allowBackDrop ? hide : noop}
            backdropColor={"transparent"}
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
    Menu,
    MenuItem: BindMenuItem,
  }
}

export const MenuItem: React.FC<MenuItemProps> = observer(
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
  textItem: tw(`${theme.default_text} leading-5 mx-2`),
})

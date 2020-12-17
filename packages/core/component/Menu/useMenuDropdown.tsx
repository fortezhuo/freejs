import React from "react"
import { View, StyleSheet } from "react-native"
import { Modal } from "../"
import { MenuItem } from "./MenuItem"
import { tw } from "@free/tailwind"
import { MenuProps, MenuItemProps } from "@free/core"
import { useApp } from "../../state"

const { color: iconColor } = tw("text-gray-700")
const SCREEN_INDENT = 2
const noop = () => {}

export const useMenuDropdown = (isCompact: boolean = false) => {
  const [isOpen, setOpen] = React.useState(false)

  const show = React.useCallback(() => {
    setOpen(true)
  }, [])

  const hide = React.useCallback(() => {
    setOpen(false)
  }, [])

  const MenuDropdown: React.FC<MenuProps> = ({
    testID = "Menu",
    anchor,
    style,
    children,
    allowBackDrop = true,
  }) => {
    const app = useApp()
    const [layout, setLayout] = React.useState<ObjectAny>({
      width: 0,
      height: 0,
    })
    const [measure, setMeasure] = React.useState<ObjectAny>({
      top: 0,
      left: 0,
      anchorWidth: 0,
      anchorHeight: 0,
    })
    const refContainer = React.useRef<View>(null)

    const onLayout = React.useCallback((e: any) => {
      const { width, height } = e.nativeEvent.layout
      setLayout({
        width: Math.max(
          isCompact ? 0 : tw("w-48").width,
          width,
          measure.anchorWidth
        ),
        height,
      })
    }, [])

    React.useEffect(() => {
      if (isOpen) {
        refContainer.current?.measureInWindow(
          (
            left: number,
            top: number,
            anchorWidth: number,
            anchorHeight: number
          ) => {
            setMeasure({
              left,
              top,
              anchorHeight,
              anchorWidth,
            })
          }
        )
      }
    }, [app.temp.screen])

    const { width } = layout
    let { left, top, anchorHeight } = measure

    if (left > app.temp.width - width - SCREEN_INDENT) {
      left = app.temp.width - SCREEN_INDENT - width
    } else if (left < SCREEN_INDENT) {
      left = SCREEN_INDENT
    }

    top += anchorHeight

    const menuStyle = {
      width,
      left,
      top,
    }

    return (
      <View testID={testID} ref={refContainer} collapsable={false}>
        {anchor}
        <Modal
          animationType="none"
          transparent
          isVisible={isOpen}
          onBackdropPress={allowBackDrop ? hide : noop}
        >
          <View
            collapsable={false}
            style={[s.viewChildren, menuStyle, style]}
            onLayout={onLayout}
          >
            {children}
          </View>
        </Modal>
      </View>
    )
  }

  const BindMenuItem: React.FC<MenuItemProps> = ({
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

  return {
    show,
    hide,
    MenuDropdown,
    MenuItem: BindMenuItem,
  }
}

const s = StyleSheet.create({
  viewChildren: tw("absolute bg-transparent"),
})

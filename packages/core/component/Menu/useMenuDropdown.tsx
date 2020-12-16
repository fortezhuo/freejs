import React from "react"
import { View, StyleSheet } from "react-native"
import { Modal } from "../"
import { MenuItem } from "./MenuItem"
import { tw } from "@free/tailwind"
import { MenuProps, MenuItemProps } from "@free/core"
import { useApp } from "../../state/app"

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
    onShow,
    allowBackDrop = true,
  }) => {
    const app = useApp()
    const [layout, setLayout] = React.useState<ObjectAny>({
      menuWidth: 0,
      menuHeight: 0,
    })
    const [measure, setMeasure] = React.useState<ObjectAny>({
      top: 0,
      left: 0,
      anchorWidth: 0,
      anchorHeight: 0,
    })
    const refContainer = React.useRef<View>(null)

    const onMenuLayout = React.useCallback((e: any) => {
      const { width, height } = e.nativeEvent.layout
      setLayout({
        menuWidth: Math.max(
          isCompact ? 0 : tw("w-48").width,
          width,
          measure.anchorWidth
        ),
        menuHeight: height,
      })
    }, [])

    React.useEffect(() => {
      if (refContainer.current && isOpen) {
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
    }, [])

    const { anchorHeight } = measure
    let { left, top } = measure

    if (left > app.temp.width - layout.menuWidth - SCREEN_INDENT) {
      left = app.temp.width - SCREEN_INDENT - layout.menuWidth
    } else if (left < SCREEN_INDENT) {
      left = SCREEN_INDENT
    }

    top += anchorHeight

    const menuStyle = {
      width: layout.menuWidth,
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
          onShow={onShow}
          onBackdropPress={allowBackDrop ? hide : noop}
        >
          <View
            collapsable={false}
            style={[s.viewChildren, menuStyle, style]}
            onLayout={onMenuLayout}
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

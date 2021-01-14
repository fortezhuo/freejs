import React from "react"
import { View, StyleSheet } from "react-native"
import { Modal, Col } from "../"
import { tw } from "@free/tailwind"

const noop = () => {}

export interface MenuDialog {
  testID?: string
  anchor: React.ReactNode
  children: React.ReactNode
  onShow: VoidFunction
  allowBackDrop?: boolean
}

export const MenuDialog: React.FC<MenuDialog> = React.forwardRef(
  (
    { testID = "Menu", anchor, children, onShow = noop, allowBackDrop = true },
    ref
  ) => {
    const [isOpen, setOpen] = React.useState(false)

    const open = React.useCallback(() => {
      setOpen(true)
    }, [])
    const hide = React.useCallback(() => {
      setOpen(false)
    }, [])

    React.useImperativeHandle(ref, () => ({
      open,
      hide,
    }))

    const refContainer = React.useRef<View>(null)

    return (
      <View testID={testID} ref={refContainer} collapsable={false}>
        {anchor}
        <Modal
          animationType="fade"
          transparent={false}
          isVisible={isOpen}
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

const s = StyleSheet.create({
  viewChildren: tw("self-center"),
})

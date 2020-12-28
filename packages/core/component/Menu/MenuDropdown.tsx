import React from "react"
import { View, StyleSheet } from "react-native"
import { Modal } from "../"
import { tw } from "@free/tailwind"
import { useApp } from "../../state"

const SCREEN_INDENT = 2
const noop = () => {}

export const MenuDropdown: React.FC<any> = React.forwardRef(
  (
    {
      isCompact = false,
      testID = "Menu",
      anchor,
      style,
      children,
      onShow = noop,
      allowBackDrop = true,
    },
    ref
  ) => {
    const app = useApp()
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

    const onLayout = React.useCallback(
      (e: any) => {
        const { width, height } = e.nativeEvent.layout

        setLayout({
          width: Math.max(tw("w-48").width, width, measure.anchorWidth),
          height,
        })
      },
      [measure.anchorWidth]
    )

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
    }, [app.temp.screen, isOpen])

    const { width } = layout
    let { left, top, anchorHeight } = measure

    if (left > app.temp.width - width - SCREEN_INDENT) {
      left = app.temp.width - SCREEN_INDENT - width
    } else if (left < SCREEN_INDENT) {
      left = SCREEN_INDENT
    }

    top += anchorHeight

    const menuStyle = {
      width: isCompact ? undefined : width,
      left,
      top,
      opacity: top == 0 ? 0 : 1,
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
            onLayout={onLayout}
          >
            {children}
          </View>
        </Modal>
      </View>
    )
  }
)

const s = StyleSheet.create({
  viewChildren: tw("absolute bg-transparent"),
})

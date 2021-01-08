import React from "react"
import { View, StyleSheet } from "react-native"
import { useSelect } from "./hook/useSelect"
import { Options } from "./Options"
import { Modal } from "../../Modal"
import { useApp } from "../../../state"
import { Anchor } from "./Anchor"
import { tw } from "@free/tailwind"

const SCREEN_INDENT = 2
const isCompact = false
export const InputSelectRaw: React.FC<any> = React.memo(
  ({
    keyValue = "value",
    keyLabel = "name",
    value: defaultValue = null,
    disabled = false,
    placeholder = null,
    multiple = false,
    search = true,
    options: defaultOptions,
    onChange = (...args: any) => {},
    printOptions,
    closeOnSelect = true,
    getOptions = null,
    debounce,
    emptyMessage = "No match found",
  }) => {
    const app = useApp()
    const ref = React.useRef<View>(null)
    const [snapshot, anchorProps, optionsProps] = useSelect({
      keyValue,
      keyLabel,
      options: defaultOptions,
      value:
        defaultValue === null && (placeholder || multiple) ? "" : defaultValue,
      multiple,
      disabled,
      search,
      onChange,
      closeOnSelect:
        closeOnSelect &&
        (!multiple || ["on-focus", "always"].includes(printOptions)),
      getOptions,
      debounce,
    })

    const [layout, setLayout] = React.useState<JSONObject>({
      width: 0,
      height: 0,
    })
    const [measure, setMeasure] = React.useState<JSONObject>({
      top: 0,
      left: 0,
      anchorWidth: 0,
      anchorHeight: 0,
    })

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
      if (snapshot.focus) {
        ref.current?.measureInWindow(
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
    }, [app.temp.screen, snapshot.focus])

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
      <View testID={"InputSelect"} ref={ref} collapsable={false}>
        <Anchor
          displayValue={snapshot.displayValue}
          onPress={anchorProps.onShow}
        />
        <Modal
          animationType="none"
          transparent
          isVisible={snapshot.focus}
          onBackdropPress={anchorProps.onHide}
        >
          <View
            collapsable={false}
            style={[s.viewChildren, menuStyle]}
            onLayout={onLayout}
          >
            <Options
              keyValue={keyValue}
              keyLabel={keyLabel}
              options={snapshot.options}
              snapshot={snapshot}
              emptyMessage={emptyMessage}
              {...optionsProps}
            />
          </View>
        </Modal>
      </View>
    )
  }
)

const s = StyleSheet.create({
  viewChildren: tw("absolute bg-transparent"),
})

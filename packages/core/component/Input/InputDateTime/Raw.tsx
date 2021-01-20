import React from "react"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { Modal } from "../../Modal"
import { Anchor } from "./Anchor"
import { StyleSheet, View } from "react-native"
import { useDateTime } from "./hook/useDateTime"
import { useLayout } from "../shared/useLayout"
import { tw } from "@free/tailwind"

export const DateTimePicker: React.FC<JSONObject> = ({
  isLoading = false,
  isUpdating = false,
  editable = true,
  value = null,
  type: mode = "date",
  disabled = false,
  placeholder = "Select ...",
  onChange: _onChange = (...args: any) => {},
}) => {
  const ref = React.useRef<View>(null)
  const [snapshot, { onHide, onShow }] = useDateTime({
    value,
    type: mode,
    disabled,
  })

  const onChange = React.useCallback((_, v) => _onChange(v), [_onChange])

  const onClear = React.useCallback(() => _onChange(undefined), [onChange])

  const [style, onLayout]: any = useLayout(ref, snapshot.focus, true)

  return (
    <View testID={"InputDateTime"} ref={ref} collapsable={false}>
      <Anchor
        {...{
          display: snapshot.display,
          disabled: disabled || isUpdating,
          isLoading,
          editable,
          placeholder,
          onShow,
          onClear,
        }}
      />
      <Modal
        animationType="none"
        transparent
        isVisible={snapshot.focus}
        onBackdropPress={onHide}
      >
        <View
          collapsable={false}
          style={[s.viewChildren, style]}
          onLayout={onLayout}
        >
          <RNDateTimePicker
            {...{
              value: value || new Date(),
              is24Hour: true,
              display: "spinner",
              mode,
              onChange,
            }}
          />
        </View>
      </Modal>
    </View>
  )
}

const s = StyleSheet.create({
  viewChildren: tw("absolute bg-white border border-gray-300"),
})

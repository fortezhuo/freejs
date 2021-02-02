import React from "react"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { Modal } from "../../Modal"
import { Anchor } from "./Anchor"
import { StyleSheet, View, Platform } from "react-native"
import { useDateTime } from "./hook/useDateTime"
import { Col } from "../../Grid"
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
  const isAndroid = Platform.OS === "android"

  const onChange = React.useCallback(
    ({ type }, v) => {
      if (type === "dismissed") {
        return onHide()
      }
      _onChange(v)
      if (isAndroid) return onHide()
    },
    [_onChange]
  )

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
        }}
      />
      <Modal
        animationType="fade"
        isVisible={snapshot.focus}
        onBackdropPress={onHide}
      >
        <Col
          sm={11}
          md={9}
          lg={4}
          xl={4}
          style={isAndroid ? {} : s.viewChildren}
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
        </Col>
      </Modal>
    </View>
  )
}

const s = StyleSheet.create({
  viewChildren: tw("absolute bg-white border border-gray-300 self-center"),
})

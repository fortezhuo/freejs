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
  type = "date",
  disabled = false,
  placeholder = "Select ...",
  onChange = (...args: any) => {},
}) => {
  const ref = React.useRef<View>(null)
  const [snapshot, { onHide, onShow }] = useDateTime({
    value,
    type,
    disabled,
    onChange,
  })

  const [style, onLayout]: any = useLayout(ref, snapshot.focus, true)

  console.log(style)

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
        animationType="none"
        transparent
        isVisible={snapshot.focus}
        onBackdropPress={onHide}
      >
        <View
          collapsable={false}
          style={[s.viewChildren, style]}
          onLayout={onLayout}
        ></View>
      </Modal>
    </View>
  )
}

const s = StyleSheet.create({
  viewChildren: tw("absolute bg-transparent"),
})

/*
<RNDateTimePicker
            testID="dateTimePicker"
            value={value || new Date()}
            mode={type}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
          */

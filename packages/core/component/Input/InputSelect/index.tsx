import React from "react"
import { View, StyleSheet } from "react-native"
import { useSelect } from "./hook/useSelect"
import { Content } from "./Content"
import { Modal } from "../../Modal"
import { useLayout } from "./hook/useLayout"
import { Anchor } from "./Anchor"
import { DisplayError } from "../DisplayError"
import { useController } from "react-hook-form"

import { tw } from "@free/tailwind"

export const InputSelectRaw: React.FC<any> = React.memo(
  ({
    keyValue = "value",
    keyLabel = "label",
    value = null,
    options: defaultOptions,
    disabled = false,
    placeholder = null,
    multiple = false,
    search = true,
    onChange = (...args: any) => {},
    closeOnSelect = true,
    loadOptions = null,
    debounce,
    emptyMessage = "No match found",
  }) => {
    const ref = React.useRef<View>(null)
    const [snapshot, { onHide, onSelect, onShow, searchProps }] = useSelect({
      keyValue,
      keyLabel,
      options: defaultOptions,
      value,
      multiple,
      disabled,
      search,
      onChange,
      closeOnSelect,
      loadOptions,
      debounce,
    })

    const [style, onLayout]: any = useLayout(ref, snapshot.focus)

    return (
      <View testID={"InputSelect"} ref={ref} collapsable={false}>
        <Anchor
          placeholder={placeholder}
          search={search}
          display={snapshot.display}
          onPress={onShow}
          multiple={multiple}
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
            <Content
              options={snapshot.options}
              {...{
                onSelect,
                searchProps,
                keyValue,
                keyLabel,
                snapshot,
                emptyMessage,
              }}
            />
          </View>
        </Modal>
      </View>
    )
  }
)

export const InputSelect: React.FC<any> = ({
  control,
  name,
  rules,
  defaultValue,
  multi,
  ...props
}) => {
  defaultValue = defaultValue ? defaultValue : multi ? [] : ""

  const {
    field: { onChange, value },
    meta: { invalid },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  return (
    <>
      <InputSelectRaw {...{ onChange, value, multi, ...props }} />
      <DisplayError error={invalid} />
    </>
  )
}

const s = StyleSheet.create({
  viewChildren: tw("absolute bg-transparent"),
})

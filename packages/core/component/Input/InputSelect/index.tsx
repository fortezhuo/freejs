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

interface InputSelectRaw {
  isLoading?: boolean
  isUpdating?: boolean
  editable?: boolean
  disabled?: boolean
  keyValue?: string
  keyLabel?: string
  value?: string | string[]
  options?: JSONObject[]
  placeholder?: string
  multiple?: boolean
  search?: boolean
  onChange?: (...args: any) => void
  closeOnSelect?: boolean
  clear?: boolean
  loadOptions?: any
  debounce?: number
  emptyMessage?: string
  styleContainer?: JSONObject
  style?: JSONObject
}

interface InputSelect extends InputSelectRaw {
  control: any
  name: string
  rules?: any
  isEditable?: boolean
  defaultValue?: any
}

export const InputSelectRaw: React.FC<InputSelectRaw> = React.memo(
  ({
    isLoading = false,
    isUpdating = false,
    editable = true,
    keyValue = "value",
    keyLabel = "label",
    value = null,
    options: defaultOptions,
    disabled = false,
    placeholder = "Select ...",
    multiple = false,
    search = true,
    onChange = (...args: any) => {},
    closeOnSelect = true,
    clear = true,
    loadOptions = null,
    debounce,
    emptyMessage = "No match found",
  }) => {
    const ref = React.useRef<View>(null)
    const [
      snapshot,
      { onHide, onSelect, onDeselect, onClear, onShow, searchProps },
    ] = useSelect({
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

    const [style, onLayout]: any = useLayout(ref, snapshot.focus, search)

    return (
      <View testID={"InputSelect"} ref={ref} collapsable={false}>
        <Anchor
          {...{
            display: snapshot.display,
            disabled: disabled || isUpdating,
            isLoading,
            editable,
            placeholder,
            multiple,
            search,
            onShow,
            onDeselect:
              disabled || isUpdating || !editable ? undefined : onDeselect,
            onClear: clear ? onClear : undefined,
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
            <Content
              options={snapshot.options}
              {...{
                onSelect,
                search,
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
  document,
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
    control: document.control,
    rules,
    defaultValue,
  })

  console.log("invalid", invalid)

  return (
    <>
      <InputSelectRaw {...{ onChange, value, multi, ...props }} />
      {invalid && <DisplayError error={document.errors[name]} />}
    </>
  )
}

const s = StyleSheet.create({
  viewChildren: tw("absolute bg-transparent"),
})

import React from "react"
import { View, StyleSheet } from "react-native"
import { useSelect } from "./hook/useSelect"
import { Content } from "./Content"
import { Modal } from "../../Modal"
import { Col } from "../../Grid"
import { Anchor } from "./Anchor"
import { theme } from "../../../config/theme"
import { InputError } from "../Error"
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
  document: any
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
    closeOnSelect = false,
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
          animationType="fade"
          isVisible={snapshot.focus}
          onBackdropPress={onHide}
        >
          <Col sm={11} md={9} lg={4} xl={4} style={s.viewChildren}>
            <Content
              options={snapshot.options}
              {...{
                placeholder,
                onSelect,
                onHide,
                search,
                searchProps,
                keyValue,
                keyLabel,
                snapshot,
                emptyMessage,
              }}
            />
          </Col>
        </Modal>
      </View>
    )
  }
)

export const InputSelect: React.FC<InputSelect> = ({
  document,
  name,
  rules,
  defaultValue,
  isEditable,
  editable,
  multiple,
  ...props
}) => {
  defaultValue = defaultValue ? defaultValue : multiple ? [] : ""

  const {
    field: { onChange, value },
    meta: { invalid },
  } = useController({
    name,
    control: document.control,
    rules,
    defaultValue,
  })

  return (
    <>
      <InputSelectRaw
        {...{
          onChange,
          value,
          multiple,
          editable: isEditable && editable,
          ...props,
        }}
      />
      {invalid && <InputError name={name} error={document.errors} />}
    </>
  )
}

const s = StyleSheet.create({
  viewChildren: tw(
    `absolute bg-white m-2 p-2 w-full ${theme.input_border} self-center`
  ),
})

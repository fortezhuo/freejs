import React from "react"
import { TextInput, StyleSheet, TextInputProps, Platform } from "react-native"
import { Base } from "../../Base"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"
import { InputError } from "../Error"
import { useController } from "react-hook-form"
import { useFocus } from "../shared/useFocus"
import { useNumber } from "./hook/useNumber"
import NumberFormat from "react-number-format"

enum NumberType {
  "number",
  "decimal",
}

interface InputNumberRaw extends TextInputProps {
  isLoading?: boolean
  isUpdating?: boolean
  disabled?: boolean
  type?: NumberType
  allowZero?: boolean
  styleContainer?: JSONObject
  onChange?: VoidFunction
  style?: JSONObject
}

interface InputNumber extends InputNumberRaw {
  document: any
  name: string
  rules?: any
  separator?: string
  isEditable?: boolean
  defaultValue?: any
}

export const InputNumberRaw: React.FC<InputNumberRaw> = ({
  isLoading = false,
  isUpdating = false,
  disabled = false,
  editable = true,
  allowZero = false,
  type = "decimal",
  onChange,
  styleContainer,
  style,
  value,
  ...props
}) => {
  const ref = React.useRef<TextInput>(null)
  const keyboardType =
    Platform.OS === "web"
      ? undefined
      : type === "decimal"
      ? "numeric"
      : "number-pad"
  const onFocus = useFocus(ref)
  const [formattedValue, onChangeText] = useNumber({ value, onChange, type })

  return (
    <Base
      isLoading={isLoading}
      style={[
        s.viewInput,
        disabled || isUpdating ? s.viewDisabled : {},
        styleContainer,
      ]}
    >
      <NumberFormat
        value={formattedValue}
        displayType={"text"}
        thousandSeparator={true}
        decimalSeparator={"."}
        decimalScale={type === "decimal" ? 2 : 0}
        prefix={""}
        renderText={(value: string) => {
          if (formattedValue.endsWith(".") && !value.includes(".")) {
            value = value + "."
          }
          if (!formattedValue.endsWith(".") && value.endsWith(".")) {
            value = value.slice(0, -1)
          }

          return (
            <TextInput
              underlineColorAndroid="transparent"
              value={value}
              style={s.inputText}
              placeholderTextColor={tw("text-gray-600").color}
              editable={
                editable ? editable : !disabled && !isUpdating && editable
              }
              {...{ onFocus, onChangeText, keyboardType, ...props }}
            />
          )
        }}
      />
    </Base>
  )
}

export const InputNumber: React.FC<InputNumber> = ({
  document,
  name,
  rules,
  isEditable = true,
  editable = true,
  defaultValue = "",
  ...props
}) => {
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
      <InputNumberRaw
        {...{ ...props, value, onChange }}
        editable={
          !props.isUpdating && !props.disabled && isEditable && editable
        }
      />
      {invalid && <InputError name={name} error={document.errors} />}
    </>
  )
}

const s: any = StyleSheet.create({
  viewInput: tw(`${theme.default_bg} ${theme.input_border} w-full`, {
    minHeight: 38,
    height: 38,
  }),
  inputText: tw(`${theme.default_text} flex-1 mx-3`),
  viewDisabled: tw(theme.disabled_bg),
})

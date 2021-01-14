import React from "react"
import { TextInput, StyleSheet, TextInputProps } from "react-native"
import { Base } from "../../Base"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"
import { DisplayError } from "../DisplayError"
import { useController } from "react-hook-form"

interface InputTextRaw extends TextInputProps {
  isLoading?: boolean
  isUpdating?: boolean
  disabled?: boolean
  styleContainer?: JSONObject
  style?: JSONObject
}

interface InputText extends InputTextRaw {
  document: any
  name: string
  rules?: any
  separator?: string
  isEditable?: boolean
  defaultValue?: any
}

export const InputTextRaw: React.FC<InputTextRaw> = ({
  isLoading = false,
  isUpdating = false,
  disabled = false,
  editable = true,
  styleContainer,
  style,
  ...props
}) => {
  return (
    <Base
      isLoading={isLoading}
      style={[
        s.viewInput,
        disabled || isUpdating ? s.viewDisabled : {},
        styleContainer,
      ]}
    >
      <TextInput
        placeholderTextColor={tw("text-gray-600").color}
        style={[s.inputText, style]}
        editable={!disabled && !isUpdating && editable}
        {...props}
      />
    </Base>
  )
}

export const InputText: React.FC<InputText> = ({
  separator,
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

  const inputProps = React.useMemo(
    () => ({
      value: separator ? (value || []).join(separator) : value,
      onChangeText: (text: string) => {
        onChange(separator ? text.split(separator) : text)
      },
    }),
    [separator, value]
  )

  return (
    <>
      <InputTextRaw
        {...{ ...inputProps, ...props }}
        editable={
          !props.isUpdating && !props.disabled && isEditable && editable
        }
      />
      {invalid && <DisplayError error={document.errors[name]} />}
    </>
  )
}

const s: any = StyleSheet.create({
  viewInput: tw(`${theme.default_bg} ${theme.input_border} w-full h-10`),
  inputText: tw(`${theme.default_text} flex-1 mx-3`),
  viewDisabled: tw(theme.disabled_bg),
})

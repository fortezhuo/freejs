import React from "react"
import { TextInput, StyleSheet, TextInputProps } from "react-native"
import { Base } from "../../Base"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"
import { DisplayError } from "../DisplayError"
import { useController } from "react-hook-form"

interface InputTextProps extends TextInputProps {
  isLoading?: boolean
  isEditable?: boolean
  disabled?: boolean
}

interface FormInputTextProps extends InputTextProps {
  control?: any
  name: string
  rules?: any
  separator?: string
  defaultValue?: any
}

export const InputTextRaw: React.FC<InputTextProps> = ({
  isLoading,
  ...props
}) => {
  return (
    <Base
      isLoading={isLoading}
      style={[s.viewInput, props.disabled ? s.viewDisabled : {}]}
    >
      <TextInput
        placeholderTextColor={tw("text-gray-600").color}
        style={s.inputText}
        {...props}
      />
    </Base>
  )
}

export const InputText: React.FC<FormInputTextProps> = ({
  separator,
  control,
  name,
  rules,
  defaultValue = "",
  ...props
}) => {
  const {
    field: { onChange, value },
    meta: { invalid },
  } = useController({
    name,
    control,
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
        editable={props.isEditable}
        {...{ ...inputProps, ...props }}
      />
      <DisplayError error={invalid} />
    </>
  )
}

const s: any = StyleSheet.create({
  viewInput: tw(`${theme.default_bg} ${theme.input_border} w-full h-10`),
  inputText: tw(`${theme.default_text} flex-1 mx-3`),
  viewDisabled: tw(theme.disabled_bg),
})

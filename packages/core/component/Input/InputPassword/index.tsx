import React from "react"
import { TextInput, StyleSheet, TextInputProps } from "react-native"
import { Base } from "../../Base"
import { DisplayError } from "../DisplayError"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"
import { useController } from "react-hook-form"
import { useEyeToggle } from "./hook"

interface InputTextRaw extends TextInputProps {
  isLoading?: boolean
  isUpdating?: boolean
  disabled?: boolean
  styleContainer?: JSONObject
  style?: JSONObject
}

interface InputText extends InputTextRaw {
  control: any
  name: string
  rules?: any
  isEditable?: boolean
  defaultValue?: any
}

export const InputPasswordRaw: React.FC<InputTextRaw> = React.memo(
  ({
    isLoading = false,
    isUpdating = false,
    disabled = false,
    styleContainer,
    style,
    ...props
  }) => {
    const [secure, Eye]: any = useEyeToggle()
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
          secureTextEntry={secure}
          placeholderTextColor={tw("text-gray-600").color}
          style={[s.inputPassword, style]}
          editable={!disabled || !isUpdating}
          {...props}
        />
        <Eye />
      </Base>
    )
  }
)

export const InputPassword: React.FC<InputText> = ({
  control,
  name,
  rules,
  isEditable = true,
  defaultValue = "",
  ...props
}) => {
  const {
    field: { onChange: onChangeText, value },
    meta: { invalid },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  return (
    <>
      <InputPasswordRaw
        {...{ onChangeText, value, ...props }}
        editable={!props.isUpdating || !props.disabled || isEditable}
      />
      <DisplayError error={invalid} />
    </>
  )
}

const s: any = StyleSheet.create({
  viewInput: tw(
    `${theme.default_bg} ${theme.input_border} w-full h-10 flex-row items-center`
  ),
  viewDisabled: tw(theme.disabled_bg),
  inputPassword: tw(`${theme.default_text} flex-1 mx-3`),
  eye: tw("mt-1 mr-3"),
})

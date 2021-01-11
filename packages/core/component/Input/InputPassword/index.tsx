import React from "react"
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from "react-native"
import { Base } from "../../Base"
import { DisplayError } from "../DisplayError"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"
import { useController } from "react-hook-form"
import { useEyeToggle } from "./hook"

const { color } = tw("text-gray-700")

interface InputTextProps extends TextInputProps {
  isLoading?: boolean
  disabled?: boolean
}

interface FormInputTextProps extends InputTextProps {
  control?: any
  name: string
  rules?: any
  defaultValue?: any
}

const Input = React.memo((props) => {
  const [secure, Eye]: any = useEyeToggle()
  return (
    <>
      <TextInput
        secureTextEntry={secure}
        placeholderTextColor={tw("text-gray-600").color}
        style={s.inputPassword}
        {...props}
      />
      <Eye />
    </>
  )
})

export const InputPasswordRaw: React.FC<InputTextProps> = React.memo(
  ({ isLoading, ...props }) => {
    return (
      <Base
        isLoading={isLoading}
        style={[s.viewInput, props.disabled ? s.viewDisabled : {}]}
      >
        <Input {...props} />
      </Base>
    )
  }
)

export const InputPassword: React.FC<FormInputTextProps> = ({
  control,
  name,
  rules,
  defaultValue = "",
  ...props
}) => {
  const {
    field: { ref, onChange, value, ...inputProps },
    meta: { invalid },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  return (
    <>
      <InputPasswordRaw onChangeText={onChange} value={value} {...props} />
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

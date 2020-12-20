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
import { Icon } from "../../Icon"
import { theme } from "../../../config/theme"
import { useController } from "react-hook-form"

const { color } = tw("text-gray-700")

const Eye: React.FC<{ secure: boolean; toggle: VoidFunction }> = ({
  secure,
  toggle,
}) => {
  return (
    <TouchableOpacity style={s.eye} onPress={toggle}>
      <Icon color={color} size={16} name={secure ? "eye" : "eye-off"} />
    </TouchableOpacity>
  )
}

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

export const InputPasswordRaw: React.FC<InputTextProps> = ({
  isLoading,
  ...props
}) => {
  const [secure, setSecure] = React.useState(true)
  const toggle = React.useCallback(() => setSecure((prev) => !prev), [])
  return (
    <>
      <Base
        isLoading={isLoading}
        style={[s.viewInput, props.disabled ? s.viewDisabled : {}]}
      >
        <TextInput
          secureTextEntry={secure}
          placeholderTextColor={tw("text-gray-600").color}
          style={s.inputPassword}
          {...props}
        />
        <Eye secure={secure} toggle={toggle} />
      </Base>
    </>
  )
}

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

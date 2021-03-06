import React from "react"
import { TextInput, StyleSheet, TextInputProps } from "react-native"
import { Base } from "../../Base"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"
import { InputError } from "../Error"
import { useController } from "react-hook-form"
import { useFocus } from "../shared/useFocus"

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
  multi?: boolean
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
  const ref = React.useRef<TextInput>(null)
  const onFocus = useFocus(ref)
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
        ref={ref}
        placeholderTextColor={tw("text-gray-600").color}
        style={[s.inputText, style]}
        editable={!disabled && !isUpdating && editable}
        {...{ ...props, onFocus }}
      />
    </Base>
  )
}

export const InputText: React.FC<InputText> = ({
  multi,
  document,
  name,
  rules,
  isEditable = true,
  editable = true,
  defaultValue = multi ? [] : "",
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
      value: multi
        ? ((Array.isArray(value) ? value : [value]) || []).join(",")
        : value,
      onChangeText: (text: string) => {
        onChange(multi ? text.split(",") : text)
      },
    }),
    [multi, value]
  )

  return (
    <>
      <InputTextRaw
        {...{ ...inputProps, ...props }}
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

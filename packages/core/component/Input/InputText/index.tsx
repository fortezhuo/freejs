import React from "react"
import { TextInput, StyleSheet, TextInputProps, Platform } from "react-native"
import { Base } from "../../Base"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"
import { DisplayError } from "../DisplayError"
import { useController } from "react-hook-form"
import { useApp } from "../../../state"

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

const useFocus = (ref: any) => {
  const { refScroll, refOffset, ...app } = useApp()

  const onFocus = React.useCallback(() => {
    if (Platform.OS === "web") {
      ref.current?.measureInWindow(
        (
          left: number,
          top: number,
          anchorWidth: number,
          anchorHeight: number
        ) => {
          const { y = 0 } = refOffset?.current || {}
          const overflowTop = top - 120
          const overflowBottom = app.temp.height - top - anchorHeight - 12

          if (overflowTop < 0) {
            refScroll.current.scrollTo({
              x: 0,
              y: y + overflowTop,
              animated: 1,
            })
          }

          if (overflowBottom < 0) {
            refScroll.current.scrollTo({
              x: 0,
              y: y + Math.abs(overflowBottom),
              animated: 1,
            })
          }
        }
      )
    }

    ref.current?.focus()
  }, [])
  return onFocus
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
      {invalid && <DisplayError name={name} error={document.errors} />}
    </>
  )
}

const s: any = StyleSheet.create({
  viewInput: tw(`${theme.default_bg} ${theme.input_border} w-full`, {
    minHeight: 38,
  }),
  inputText: tw(`${theme.default_text} flex-1 mx-3`),
  viewDisabled: tw(theme.disabled_bg),
})

import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"
import { Display } from "./Display"
import { Base } from "../../Base"

interface Anchor {
  display: string | string[]
  isLoading: boolean
  editable: boolean
  disabled: boolean
  placeholder: string
  multiple: boolean
  search: boolean
  onShow: VoidFunction
  onDeselect: VoidFunction
  onClear: VoidFunction
}

export const Anchor: React.FC<Anchor> = React.memo(
  ({
    onShow,
    display,
    isLoading,
    editable,
    disabled,
    placeholder,
    multiple,
    search,
    onDeselect,
    onClear,
  }) => {
    return (
      <TouchableOpacity disabled={disabled || !editable} onPress={onShow}>
        <Base
          isLoading={isLoading}
          style={[s.viewInput, disabled ? s.viewDisabled : {}]}
        >
          <Display
            {...{
              display,
              disabled,
              placeholder,
              multiple,
              search,
              onDeselect,
              onClear,
            }}
          />
        </Base>
      </TouchableOpacity>
    )
  }
)

const s = StyleSheet.create({
  viewInput: tw(
    `${theme.default_bg} ${theme.input_border} w-full h-10 flex-row`
  ),
  viewDisabled: tw(theme.disabled_bg),
})

import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { Placeholder } from "../shared/Placeholder"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"
import { Base } from "../../Base"
import { Text } from "../../Text"
import { Clear } from "./Clear"

interface Anchor {
  display: string
  isLoading: boolean
  editable: boolean
  disabled: boolean
  placeholder: string
  onShow: VoidFunction
  onClear?: VoidFunction
}

const Display: React.FC<any> = React.memo(({ children }) => {
  return <Text style={s.textDisplay}>{children}</Text>
})

export const Anchor: React.FC<Anchor> = React.memo(
  ({
    onShow,
    onClear,
    display,
    isLoading,
    editable,
    disabled,
    placeholder,
  }) => {
    return (
      <TouchableOpacity disabled={disabled || !editable} onPress={onShow}>
        <Base
          isLoading={isLoading}
          style={[s.viewInput, disabled ? s.viewDisabled : {}]}
        >
          {display ? (
            <>
              <Display>{display}</Display>
              {!disabled && onClear && (
                <Clear style={s.viewClear} {...{ onPress: onClear }} />
              )}
            </>
          ) : (
            <Placeholder>{placeholder}</Placeholder>
          )}
        </Base>
      </TouchableOpacity>
    )
  }
)

const s = StyleSheet.create({
  viewInput: tw(
    `${theme.default_bg} ${theme.input_border} w-full flex-row items-center`,
    {
      minHeight: 40,
    }
  ),
  textDisplay: tw("mx-3"),
  viewClear: tw("mx-3"),
  viewDisabled: tw(theme.disabled_bg),
})

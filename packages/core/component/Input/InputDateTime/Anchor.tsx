import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { Placeholder } from "../shared/Placeholder"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"
import { Base } from "../../Base"
import { Text } from "../../Text"

interface Anchor {
  display: string
  isLoading: boolean
  editable: boolean
  disabled: boolean
  placeholder: string
  onShow: VoidFunction
}

const Display: React.FC<any> = React.memo(({ children }) => {
  return <Text>{children}</Text>
})

export const Anchor: React.FC<Anchor> = React.memo(
  ({ onShow, display, isLoading, editable, disabled, placeholder }) => {
    return (
      <TouchableOpacity disabled={disabled || !editable} onPress={onShow}>
        <Base
          isLoading={isLoading}
          style={[s.viewInput, disabled ? s.viewDisabled : {}]}
        >
          {display ? (
            <Display>{display}</Display>
          ) : (
            <Placeholder>{placeholder}</Placeholder>
          )}
        </Base>
      </TouchableOpacity>
    )
  }
)

const s = StyleSheet.create({
  viewInput: tw(`${theme.default_bg} ${theme.input_border} w-full flex-row`, {
    minHeight: 40,
  }),
  viewDisabled: tw(theme.disabled_bg),
})

import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { tw } from "@free/tailwind"
import { theme } from "../../../../config/theme"
import { isBlank } from "../lib/isBlank"
import { Chips } from "./Chips"
import { Clear } from "./Clear"
import { Placeholder } from "../../shared/Placeholder"

interface Display {
  display: string[] | string | undefined
  disabled: boolean
  multiple?: boolean
  search?: boolean
  placeholder: string
  onDeselect: VoidFunction
  onClear: VoidFunction
}

export const Display: React.FC<Display> = React.memo(
  ({
    display,
    multiple,
    placeholder,
    disabled,
    onDeselect = (...args: any) => {},
    onClear,
  }) => {
    return (
      <View style={[s.viewDisplay]}>
        {isBlank(display) ? (
          <Placeholder>{placeholder}</Placeholder>
        ) : (
          <>
            <View style={[s.viewValue, multiple ? s.viewMulti : {}]}>
              {multiple ? (
                <Chips {...{ disabled, onDeselect }}>{display}</Chips>
              ) : (
                <Text style={s.textSingle}>{display}</Text>
              )}
            </View>
            {!disabled && onClear && (
              <Clear style={s.viewClear} {...{ onPress: onClear }} />
            )}
          </>
        )}
      </View>
    )
  }
)

const s = StyleSheet.create({
  viewDisplay: tw("flex-1 flex-row items-center"),
  viewMulti: { marginLeft: 1, marginVertical: 2 },
  viewValue: tw("mx-3 flex-1 flex-row flex-wrap"),
  viewClear: tw("mx-3"),
  textSingle: tw(`flex-grow ${theme.default_text}`),
})

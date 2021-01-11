import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { tw } from "@free/tailwind"
import { theme } from "../../../../config/theme"
import { isBlank } from "../lib/isBlank"
import { Chips } from "./Chips"
import { Clear } from "./Clear"
import { Placeholder } from "./Placeholder"

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
    search,
    placeholder,
    disabled,
    onDeselect = (...args: any) => {},
    onClear = (...args: any) => {},
  }) => {
    return (
      <View style={[s.viewDisplay, search ? {} : s.viewCompact]}>
        {isBlank(display) ? (
          <Placeholder multiple>{placeholder}</Placeholder>
        ) : (
          <>
            <View style={[s.viewValue, multiple ? s.viewMulti : {}]}>
              {multiple ? (
                <Chips {...{ disabled, onDeselect }}>{display}</Chips>
              ) : (
                <Text style={s.textSingle}>{display}</Text>
              )}
            </View>
            {!disabled && (
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
  viewCompact: tw("mx-3"),
  viewMulti: tw("mt-1 ml-1 mb-1"),
  viewValue: tw("mx-3 flex-1 flex-row flex-wrap"),
  viewClear: tw("mx-3"),
  textSingle: tw(`flex-grow ${theme.default_text}`),
})

import React from "react"
import { Icon, IconButton, Text } from "../.."
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { tw, color } from "@free/tailwind"
import { StateComponent } from "@free/core"
import { theme } from "../../../config/theme"
import { random } from "../../../util"

const defaultColor = color(theme.default_text)

const Chip: React.FC<any> = ({ onClearChip, children }) => {
  return (
    <View style={s.viewChip}>
      <TouchableOpacity onPress={() => onClearChip(children)}>
        <Icon name="x" size={16} color={defaultColor}></Icon>
      </TouchableOpacity>
      <Text style={s.textChip}>{children}</Text>
    </View>
  )
}

const Placeholder: React.FC<any> = ({ placeholder, multi }) => {
  const style = multi ? { paddingHorizontal: 8 } : {}
  return <Text style={[s.textPlaceholder, style]}>{placeholder}</Text>
}

const Clear: React.FC<any> = ({ onClear, multi, value, clearable }) => {
  return !clearable || (multi ? value.length == 0 : value === "") ? (
    <View />
  ) : (
    <IconButton color={defaultColor} name="x" size={16} onPress={onClear} />
  )
}

export const Display: React.FC<any> = (props) => {
  const {
    searchable,
    multi,
    keyLabel,
    disabled,
    value,
    display,
    clearable,
    onClearChip,
    onClear,
    placeholder,
  } = props

  const isBlank = !display

  return (
    <View
      style={[
        s.viewDisplay,
        searchable ? {} : s.viewCompact,
        multi ? s.viewMulti : {},
      ]}
    >
      <View style={s.viewValue} testID="ViewValue">
        {!isBlank ? (
          multi ? (
            display.map((_value: any) => (
              <Chip key={"chip_" + random()} {...{ onClearChip }}>
                {_value}
              </Chip>
            ))
          ) : (
            <Text style={s.textSingle}>{display[keyLabel]}</Text>
          )
        ) : (
          <Placeholder multi={multi}>{placeholder}</Placeholder>
        )}
      </View>
      {!disabled && <Clear {...{ onClear, multi, value, clearable }} />}
    </View>
  )
}

const s = StyleSheet.create({
  viewDisplay: tw("flex-1 flex-row items-center mx-4"),
  viewCompact: tw("mx-3"),
  viewMulti: tw("mt-1 ml-1 mb-1"),
  viewValue: tw("flex-1 flex-row flex-wrap"),
  textSingle: tw(`flex-grow ${theme.default_text}`),
  textPlaceholder: tw(`${theme.disabled_text}`),
  viewChip: tw("rounded-lg flex-row flex-grow-0 h-8 items-center px-1", {
    margin: 1,
    marginHorizontal: 2,
    backgroundColor: "rgba(0,0,0,0.1)",
  }),
  textChip: tw(`${theme.default_text} mx-1`),
})

import React from "react"
import { Icon, Text } from "../.."
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { tw, color } from "@free/tailwind"
import { theme } from "../../../config/theme"
import { isBlank } from "./lib/isBlank"

const defaultColor = color(theme.default_text)

const Chip: React.FC<any> = ({ onPress, children, isEditable }) => {
  return (
    <View style={s.viewChip}>
      {isEditable && (
        <TouchableOpacity {...{ onPress }}>
          <Icon name="x" size={16} color={defaultColor}></Icon>
        </TouchableOpacity>
      )}
      <Text style={s.textChip}>{children}</Text>
    </View>
  )
}

const Placeholder: React.FC<{ children: React.ReactNode; multi?: boolean }> = ({
  children,
  multi,
}) => {
  const style = multi ? { paddingHorizontal: 8 } : {}
  return <Text style={[s.textPlaceholder, style]}>{children}</Text>
}

const Clear: React.FC<any> = ({ onClear, multi, value, clearable }) => {
  return !clearable || (multi ? value.length == 0 : value === "") ? (
    <View />
  ) : (
    <TouchableOpacity onPress={onClear}>
      <Icon color={defaultColor} name="x" size={16} />
    </TouchableOpacity>
  )
}

export const Display: React.FC<any> = React.memo((props) => {
  const { display, multiple, search, placeholder = "Select ..." } = props

  return (
    <View
      style={[
        s.viewDisplay,
        search ? {} : s.viewCompact,
        multiple ? s.viewMulti : {},
      ]}
    >
      {isBlank(display) ? (
        <Placeholder>{placeholder}</Placeholder>
      ) : (
        <View style={s.viewValue} testID="ViewValue">
          {multiple ? (
            display.map((v: string, i: number) => (
              <Chip key={"chip_" + i}>{v}</Chip>
            ))
          ) : (
            <Text style={s.textSingle}>{display}</Text>
          )}
        </View>
      )}
    </View>
  )
})

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

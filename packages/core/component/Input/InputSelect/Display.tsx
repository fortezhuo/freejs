import React from "react"
import { Icon, Text } from "../.."
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { tw, color } from "@free/tailwind"
import { theme } from "../../../config/theme"
import { random } from "../../../util"

const defaultColor = color(theme.default_text)

const Chip: React.FC<{
  onPress: any
  children: React.ReactNode
}> = ({ onPress, children }) => {
  return (
    <View style={s.viewChip}>
      <TouchableOpacity {...{ onPress }}>
        <Icon name="x" size={16} color={defaultColor}></Icon>
      </TouchableOpacity>
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

  const isBlank = !display || display.length == 0

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
            display.map((opt: any) => (
              <Chip
                key={"chip_" + random()}
                {...{ onPress: () => onClearChip(opt) }}
              >
                {opt[keyLabel]}
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

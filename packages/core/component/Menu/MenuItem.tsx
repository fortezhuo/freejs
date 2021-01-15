import React from "react"
import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import { Icon } from "../"
import { tw } from "@free/tailwind"
import { theme } from "../../config/theme"

const { color: iconColor } = tw("text-gray-700")
const noop = () => {}

export const MenuItem: React.FC<{
  disabled?: boolean
  active?: boolean
  name?: string
  color?: string
  onPress?: VoidFunction
  styleText?: any
  style?: JSONObject
  children: string
}> = ({
  disabled,
  active,
  name,
  color = iconColor,
  children,
  onPress = noop,
  styleText,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[s.viewItem, active ? s.viewItemActive : {}, style]}>
        {name && <Icon name={name} color={color} size={18} />}
        <Text style={[s.textItem, styleText]}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  viewItem: tw(`flex-1 flex-row p-2`),
  viewItemActive: tw("bg-gray-50"),
  textItem: tw(`${theme.default_text} leading-5 mx-2`),
})

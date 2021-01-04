import React from "react"
import { Icon, Link } from ".."
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { theme } from "../../config/theme"
import { tw, color } from "@free/tailwind"

const defaultColor = color(theme.default_text)

interface Cell {
  isMobile?: boolean
  children?: React.ReactNode
  style?: JSONObject
  testID?: string
  onPress?: any
}

interface CellLink extends Cell {
  name?: string
  params?: any
}

interface CellPressable extends Cell {
  icon: string
}

export const Cell: React.FC<Cell> = ({
  isMobile,
  children,
  style,
  testID = "Cell",
}) => {
  return (
    <View
      testID={testID}
      style={[s.viewCell, style, isMobile ? s.viewCellSmall : {}]}
    >
      {children}
    </View>
  )
}

export const CellText: React.FC<Cell> = ({
  isMobile,
  children,
  style,
  testID = "CellText",
}) => {
  return (
    <Cell isMobile={isMobile} style={style} testID={testID}>
      <Text style={isMobile ? s.textCellSmall : s.textCell}>{children}</Text>
    </Cell>
  )
}

export const CellLink: React.FC<CellLink> = ({ style, name, params = {} }) => {
  return (
    <Cell style={style} testID="CellLink">
      <Link name={name} params={params}>
        <Icon name={"link"} size={16} color={defaultColor} />
      </Link>
    </Cell>
  )
}

export const CellPressable: React.FC<CellPressable> = ({
  style,
  icon,
  onPress,
}) => {
  return (
    <Cell style={style} testID="CellLink">
      <TouchableOpacity onPress={onPress}>
        <Icon name={icon} size={16} color={defaultColor} />
      </TouchableOpacity>
    </Cell>
  )
}

const s = StyleSheet.create({
  viewCellSmall: tw("p-0 w-full"),
  viewCell: tw(`p-2 w-40 flex-row`),
  cellDelete: tw("flex-1"),
  textCell: tw(theme.default_text),
  textCellSmall: tw(`${theme.default_text} text-sm`),
})

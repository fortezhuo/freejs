import React from "react"
import { Link, Icon, IconButton } from ".."
import { View, StyleSheet, Text } from "react-native"
import { theme } from "../../config/theme"
import { tw, color } from "@free/tailwind"
import { CellProps } from "@free/core"

const defaultColor = color(theme.default_text)

export const Cell: React.FC<CellProps> = ({
  children,
  style,
  testID = "Cell",
}) => {
  return (
    <View testID={testID} style={[s.viewCell, style]}>
      {children}
    </View>
  )
}

export const CellText: React.FC<CellProps> = ({
  children,
  style,
  testID = "CellText",
}) => {
  return (
    <Cell style={style} testID={testID}>
      <Text style={s.textCell}>{children}</Text>
    </Cell>
  )
}

export const CellLink: React.FC<CellProps> = ({ style, name, params = {} }) => {
  return (
    <Cell style={style} testID="CellLink">
      <Link name={name} params={params}>
        <Icon name={"link"} size={16} color={defaultColor} />
      </Link>
    </Cell>
  )
}

export const CellDownload: React.FC<CellProps> = ({
  style,
  name = "download",
  onPress,
}) => {
  return (
    <Cell style={style} testID="CellLink">
      <IconButton
        onPress={onPress}
        name={name}
        size={16}
        color={defaultColor}
      />
    </Cell>
  )
}

export const CellJSON: React.FC<CellProps> = ({
  store,
  style,
  children: id,
}) => {
  const onOpen = React.useCallback(() => {
    store.setData({ value: [] })
    ;(async () => {
      await store.loadData(id)
    })()

    store.bottomSheet.open()
  }, [])

  return (
    <Cell style={style}>
      <IconButton
        onPress={onOpen}
        name="search"
        size={16}
        color={defaultColor}
      />
    </Cell>
  )
}

const s = StyleSheet.create({
  viewCell: tw(`p-2 w-40 flex-grow flex-row`),
  cellDelete: tw("flex-1"),
  textCell: tw(theme.default_text),
})

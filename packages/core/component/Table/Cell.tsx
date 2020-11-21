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
    <View testID={testID} style={StyleSheet.flatten([styles.viewCell, style])}>
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
      <Text style={styles.textCell}>{children}</Text>
    </Cell>
  )
}

export const CellLink: React.FC<CellProps> = ({
  style,
  name = "link",
  link,
}) => {
  return (
    <Cell style={style} testID="CellLink">
      <Link path={link}>
        <Icon name={name} size={16} color={defaultColor} />
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

export const CellJSON: React.FC<CellProps> = ({ store, style, children }) => {
  const onOpen = React.useCallback(() => {
    store.temp.set("value", children)
    store.bottomSheet.current?.open()
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

const styles = StyleSheet.create({
  viewCell: tw(`p-2 w-40 flex-grow flex-row`),
  cellDelete: tw("flex-1"),
  textCell: tw(theme.default_text),
})

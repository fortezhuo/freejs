import React, { FC, cloneElement } from "react"
import { StyleSheet, View, Text, ScrollView } from "react-native"
import { random } from "../../util/random"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"

export const Table: FC<any> = observer(({ children, style, scroll }) => {
  return (
    <View style={StyleSheet.flatten([styles.rootTable, style])}>
      <ScrollView scrollEnabled={scroll} horizontal>
        <View style={styles.groupTable}>{children}</View>
      </ScrollView>
    </View>
  )
})

export const Header: FC<any> = observer(({ children, style }) => {
  return (
    <Row style={StyleSheet.flatten([styles.rootHeader, style])}>{children}</Row>
  )
})

export const Filter: FC<any> = observer(({ children, style }) => {
  return (
    <Row style={StyleSheet.flatten([styles.rootFilter, style])}>
      {children.map((child: any, i: number) => {
        return cloneElement(child, {
          filter: true,
          key: `filterCell_${random()}`,
        })
      })}
    </Row>
  )
})

export const Body: FC<any> = observer(({ children, style, scroll }) => {
  return (
    <View style={StyleSheet.flatten([styles.rootBody, style])}>
      <ScrollView scrollEnabled={scroll}>{children}</ScrollView>
    </View>
  )
})

export const Row: FC<any> = observer(({ children, filter, dark, style }) => {
  return (
    <View
      style={StyleSheet.flatten([
        styles.rootRow,
        filter ? styles.rootFilter : {},
        dark ? styles.rowDark : {},
        style,
      ])}
    >
      {children}
    </View>
  )
})

export const Cell: FC<any> = observer(({ xs, children, style, filter }) => {
  const { width } = style || {}

  return (
    <View
      style={StyleSheet.flatten([
        styles.rootCell,
        filter ? styles.cellFilter : {},
        width ? {} : xs ? { width: 40 } : styles.cellGrow,
        style,
      ])}
    >
      <Text style={styles.textCell}>{children}</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  rootTable: tw(
    "shadow-lg bg-white-600 m-1 border border-gray-300 border-solid"
  ),
  groupTable: tw("flex-col flex-1"),
  rootHeader: tw("bg-white-500 h-10 items-center shadow-md"),
  rootBody: tw("flex-1"),
  rootFilter: {
    backgroundColor: "rgba(252,129,129,0.3)",
    ...tw("h-10 items-center shadow-md"),
  },
  textCell: tw("text-gray-900"),
  rootRow: tw("flex-row border-solid border-gray-200 border-b flex-no-wrap"),
  rowDark: { backgroundColor: "rgba(192,192,192,0.2)" },
  rootCell: tw("p-2 w-40 border-r border-solid border-gray-300"),
  cellFilter: { padding: 0 },
  cellGrow: tw("flex-grow"),
})

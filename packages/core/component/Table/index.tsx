import React, { FC, cloneElement } from "react"
import { StyleSheet, View, Text, ScrollView } from "react-native"
import { IconButton } from "../Icon"
import { InputCheckbox } from "../Input/InputCheckbox"
import { random } from "../../util/random"
import { tw, color } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import {
  TableProps,
  IconButtonProps,
  RowProps,
  CellProps,
  BodyProps,
} from "@free/core"

const primary = color(theme.primary)

export const Table: FC<TableProps> = observer(
  ({ children, style, scroll, testID = "Table" }) => {
    return (
      <View
        testID={testID}
        style={StyleSheet.flatten([styles.rootTable, style])}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            scrollEnabled={scroll}
            horizontal
            testID="HorizontalScroll"
          >
            <View style={styles.groupTable}>{children}</View>
          </ScrollView>
        </View>
      </View>
    )
  }
)

export const Header: FC<RowProps> = observer(({ children, style }) => {
  return (
    <Row style={StyleSheet.flatten([styles.rootHeader, style])}>{children}</Row>
  )
})

export const Filter: FC<RowProps> = observer(({ children, style }) => {
  return (
    <Row style={StyleSheet.flatten([styles.rootFilter, style])}>
      {children &&
        (children as []).map((child: any, i: number) => {
          return cloneElement(child, {
            filter: true,
            key: `filterCell_${random()}`,
          })
        })}
    </Row>
  )
})

export const Body: FC<BodyProps> = observer(
  ({ children, style, scroll, testID = "Body" }) => {
    return (
      <View
        testID={testID}
        style={StyleSheet.flatten([styles.rootBody, style])}
      >
        <ScrollView scrollEnabled={scroll} testID="VerticalScroll">
          {children}
        </ScrollView>
      </View>
    )
  }
)

export const Row: FC<RowProps> = observer(
  ({ children, filter, dark, style, testID = "Row" }) => {
    return (
      <View
        testID={testID}
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
  }
)

export const Cell: FC<CellProps> = observer(
  ({ children, style, filter, testID = "Cell" }) => {
    return (
      <View
        testID={testID}
        style={StyleSheet.flatten([
          styles.rootCell,
          filter ? styles.cellFilter : {},
          style,
        ])}
      >
        <Text style={styles.textCell}>{children}</Text>
      </View>
    )
  }
)

export const CellLink: FC<IconButtonProps> = observer(
  ({ onPress, testID = "CellLink" }) => {
    return (
      <IconButton
        testID={testID}
        name="link"
        size={16}
        color={primary}
        onPress={onPress}
      />
    )
  }
)

export const CellCheckbox: FC<any> = observer(
  ({ testID = "CellCheckbox", ...rest }) => {
    return (
      <InputCheckbox
        testID={testID}
        style={{ padding: 0, marginTop: -2 }}
        {...rest}
      />
    )
  }
)

const styles = StyleSheet.create({
  rootTable: tw(`${theme.bgTable} border ${theme.borderTable} shadow-lg m-1`),
  groupTable: tw("flex-col flex-1"),
  rootHeader: tw(`${theme.bgTable} h-10 items-center shadow-md`),
  rootBody: tw("flex-1"),
  rootFilter: tw(`${theme.bgRowFilter} h-10 items-center`),
  textCell: tw(theme.textCell),
  rootRow: tw(`${theme.borderTable} border-b flex-row flex-no-wrap`),
  rowDark: tw(theme.bgRowDark),
  rootCell: tw(`${theme.borderTable} p-2 w-40 border-r flex-grow`),
  cellFilter: { padding: 0 },
})

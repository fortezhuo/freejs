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

export const CellCheckbox: FC<any> = observer(() => {
  return <InputCheckbox style={{ padding: 0, marginTop: -2 }} />
})

const styles = StyleSheet.create({
  rootTable: tw(
    "shadow-lg bg-white-800 m-1 border border-gray-300 border-solid"
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
  rootCell: tw("p-2 w-40 border-r border-solid border-gray-300 flex-grow"),
  cellFilter: { padding: 0 },
})

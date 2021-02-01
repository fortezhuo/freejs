import React from "react"
import { StyleSheet, View } from "react-native"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"

interface Row {
  children: React.ReactNode
  dark?: boolean | number
  style?: JSONObject
  testID?: string
}

export const Row: React.FC<Row> = React.memo(
  ({ children, dark, style, testID = "Row" }) => {
    return (
      <View testID={testID} style={[s.viewRow, dark ? s.rowDark : {}, style]}>
        {children}
      </View>
    )
  }
)

export const Header: React.FC<Row> = React.memo(({ children, style }) => {
  return <Row style={[s.viewHeader, style]}>{children}</Row>
})

const s = StyleSheet.create({
  viewHeader: tw(`h-12 shadow-md`),
  viewRow: tw(`flex-row items-center`),
  rowDark: tw("bg-gray-100"),
  textCellSmall: tw(`${theme.default_text} text-sm`),
  cellDelete: tw("flex-1"),
})

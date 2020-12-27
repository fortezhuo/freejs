import React from "react"
import { StyleSheet, View } from "react-native"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"
import { RowProps } from "@free/core"

export const Row: React.FC<RowProps> = ({
  children,
  dark,
  style,
  testID = "Row",
}) => {
  return (
    <View testID={testID} style={[s.viewRow, dark ? s.rowDark : {}, style]}>
      {children}
    </View>
  )
}

export const Header: React.FC<RowProps> = ({ children, style }) => {
  return <Row style={[s.viewHeader, style]}>{children}</Row>
}

const s = StyleSheet.create({
  viewHeader: tw(`h-12 shadow-md`),
  viewRow: tw(`flex-row flex-no-wrap items-center`),
  rowDark: { backgroundColor: "rgba(0,0,0,0.08)" },
  rowMobile: tw("flex-col p-2"),
  textCellSmall: tw(`${theme.default_text} text-sm`),
  cellDelete: tw("flex-1"),
  swipeButton: tw(
    `${theme.danger_bg} flex-row flex-1 justify-center items-center`
  ),
})

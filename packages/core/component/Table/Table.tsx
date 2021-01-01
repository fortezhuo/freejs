import React from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { theme } from "../../config/theme"

interface TableDefault {
  children?: React.ReactNode
  style?: JSONObject
  testID?: string
}

interface TableScroll extends TableDefault {
  scroll?: boolean
}

export const Scroll: React.FC<TableScroll> = ({
  children,
  style,
  scroll,
  testID = "Table",
}) => {
  return (
    <View testID={testID} style={[s.viewTable, style]}>
      <ScrollView horizontal scrollEnabled={scroll} testID="HorizontalScroll">
        <View style={s.viewTableChildren}>{children}</View>
      </ScrollView>
    </View>
  )
}

export const Default: React.FC<TableDefault> = ({
  children,
  style,
  testID = "Table",
}) => {
  return (
    <View testID={testID} style={[s.viewTable, style]}>
      <View style={s.viewTableChildren}>{children}</View>
    </View>
  )
}

const s = StyleSheet.create({
  viewTable: tw(`shadow-xl`),
  viewTableChildren: tw("flex-col flex-1"),
  viewHeader: tw(`h-12 shadow-md`),
  viewRow: tw(`flex-row flex-no-wrap items-center`),
  viewCell: tw(`p-2 w-40 flex-grow flex-row`),
  rowDark: { backgroundColor: "rgba(0,0,0,0.08)" },
  rowMobile: tw("flex-col p-2 items-start"),
  cellFilter: tw("p-0 pr-1"),
  cellDelete: tw("flex-1"),
  textCell: tw(theme.default_text),
  textCellSmall: tw(`${theme.default_text} text-sm`),
  iconDelete: tw(
    `${theme.danger_bg} flex-row flex-1 justify-center items-center`
  ),
})

import React from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { TableGrid } from "./TableGrid"
import { Loader } from "../../component"
import { theme } from "../../config/theme"
import { useView, withView } from "../../state/view"
const ViewGrid: React.FC<any> = withView(() => {
  const view = useView()

  return <View style={[s.viewTable, { height: 500 }]}></View>
})

const s = StyleSheet.create({
  viewGrid: tw("flex-1 flex-col"),
  viewAction: tw("flex-row"),
  textTitle: tw("text-white"),
  viewTable: tw("flex-col bg-white rounded-lg p-2"),
  boxDelete: tw("flex-1"),
  iconDelete: tw(
    `${theme.danger_bg} flex-row flex-1 justify-center items-center`
  ),
  rowMobile: tw("flex-col"),
})

export default ViewGrid

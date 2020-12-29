import React from "react"
import { StyleSheet, Platform } from "react-native"
import { tw } from "@free/tailwind"
import { TableGrid } from "./TableGrid"
import { Layout } from "../../component"
import { theme } from "../../config/theme"
import { withView } from "./hook"
import { BottomSheet } from "./BottomSheet"
import { TableAction } from "./TableAction"

const ViewGrid: React.FC<any> = withView(() => {
  const [content, setContent] = React.useState<Object | undefined>(undefined)

  return (
    <>
      <Layout
        transparent
        scroll={Platform.OS === "web"}
        stickyRight={<TableAction />}
      >
        <TableGrid {...{ content, setContent }} />
      </Layout>
      <BottomSheet {...{ content, setContent }} />
    </>
  )
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

import React from "react"
import { StyleSheet, Platform } from "react-native"
import { tw } from "@free/tailwind"
import { TableGrid } from "./TableGrid"
import { ActionGroup, Layout } from "../../component"
import { theme } from "../../config/theme"
import { useView, useActions, withView } from "./hook"
import { BottomSheet } from "./BottomSheet"
import { Modalize } from "react-native-modalize"

const ActionButton = ({ refBottomSheet }: any) => {
  const view = useView()
  const actions = useActions(refBottomSheet)
  const { isLoading, isUpdating } = view.temp
  const isReady = !!view.data?.config?.name
  return (
    <ActionGroup.Large
      actions={actions}
      isLoading={isLoading || isUpdating || !isReady}
    />
  )
}

const ViewGrid: React.FC<any> = withView(() => {
  const refBottomSheet = React.useRef<Modalize>(null)
  const [content, setContent] = React.useState<ObjectAny | undefined>(undefined)

  return (
    <>
      <Layout
        transparent
        scroll={Platform.OS === "web"}
        stickyRight={<ActionButton {...{ refBottomSheet }} />}
      >
        <TableGrid {...{ refBottomSheet, setContent }} />
      </Layout>
      <BottomSheet {...{ refBottomSheet, content, setContent }} />
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

import React from "react"
import { View, StyleSheet, Platform, Text } from "react-native"
import { tw } from "@free/tailwind"
import { TableGrid } from "./TableGrid"
import { Loader, ActionGroup, Layout } from "../../component"
import { theme } from "../../config/theme"
import { useView, useActions, withView } from "./hook"
import { BottomSheet } from "./BottomSheet"

const ViewGrid: React.FC<any> = withView(() => {
  const { refBottomSheet, ...view } = useView()
  const actions = useActions(refBottomSheet)
  const isReady = !!view.data?.config?.name
  const { height, isLoading, isUpdating } = view.temp

  return (
    <>
      <Layout
        transparent
        scroll={Platform.OS === "web"}
        stickyRight={
          <ActionGroup.Large
            actions={actions}
            isLoading={isLoading || isUpdating}
          />
        }
      >
        <View style={[s.viewTable, { height }]}>
          {!isReady ? <Loader dark /> : <TableGrid actions={actions} />}
        </View>
      </Layout>
      {isReady && <BottomSheet refBind={refBottomSheet} />}
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

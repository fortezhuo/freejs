import React from "react"
import { View, StyleSheet, Platform } from "react-native"
import { tw } from "@free/tailwind"
import { TableGrid } from "./TableGrid"
import { observer } from "mobx-react-lite"
import { Layout, ActionGroup, Loader, Table } from "../../component"
import { theme } from "../../config/theme"
import { useView } from "./hook"

const ViewGrid: React.FC<any> = observer(() => {
  const { view, config, refActions } = useView()

  return (
    <>
      <Layout
        store={view}
        scroll={Platform.OS === "web"}
        stickyRight={
          <ActionGroup.Large store={view} actions={refActions.current} />
        }
      >
        <View
          style={[s.viewTable, { height: view.app?.dimension.height - 144 }]}
        >
          {view.isUpdating ? (
            <Loader dark />
          ) : (
            <TableGrid store={view} config={config} />
          )}
        </View>
      </Layout>
      {!view.isUpdating && <Table.BottomSheet store={view} config={config} />}
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

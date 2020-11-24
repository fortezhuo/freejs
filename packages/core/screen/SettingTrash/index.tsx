import React from "react"
import { View, StyleSheet, Platform } from "react-native"
import { tw } from "@free/tailwind"
import { TableGrid } from "./TableGrid"
import { observer } from "mobx-react-lite"
import { Layout, ActionGroup, Loader, Table } from "../../component"
import { theme } from "../../config/theme"
import { useTrash } from "./hook"

const SettingTrash = observer(() => {
  const { trash, actions, refActions, columns } = useTrash()

  return (
    <>
      <Layout store={trash} scroll={Platform.OS === "web"}>
        <View style={s.viewGrid}>
          <View style={s.viewAction}>
            <ActionGroup.Large store={trash} actions={refActions.current} />
          </View>
          <View
            style={[s.viewTable, { height: trash.app?.dimension.height - 144 }]}
          >
            {trash.isLoading ? (
              <Loader dark />
            ) : (
              <TableGrid store={trash} columns={columns} actions={actions} />
            )}
          </View>
        </View>
      </Layout>
      <Table.BottomSheet store={trash} />
    </>
  )
})

const s = StyleSheet.create({
  viewGrid: tw("flex-1 flex-col"),
  viewAction: tw("flex-row justify-end items-center mb-2 h-10"),
  textTitle: tw("text-white"),
  viewTable: tw("flex-col bg-white rounded-lg p-2"),
  boxDelete: tw("flex-1"),
  iconDelete: tw(
    `${theme.danger_bg} flex-row flex-1 justify-center items-center`
  ),
  rowMobile: tw("flex-col"),
})

export default SettingTrash

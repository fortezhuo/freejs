import React, { FC } from "react"
import { View, StyleSheet, Platform } from "react-native"
import { tw } from "@free/tailwind"
import { TableGrid } from "./TableGrid"
import { useHook, useActions, useColumns } from "./hook"
import { observer } from "mobx-react-lite"
import { Layout, H3, ActionGroup, useDefaultColumn } from "../../component"
import { theme } from "../../config/theme"

const SettingTrash: FC = observer(() => {
  const { store } = useHook()
  const { actions, actDelete } = useActions(store)
  const [
    name,
    collection = [],
    pageIndex,
    limit,
    total,
    pageMax,
  ] = store.getData("name", "collection", "page", "limit", "total", "max")
  const isMobile = store.app?.dimension.isMobile
  const isLoading = store.isLoading || name !== store.name
  const isShowTable = store.data.get("isMobile") === isMobile
  const { columns, keys } = useColumns(store)
  const columnsFormat = useDefaultColumn(store)

  return (
    <>
      <Layout store={store} scroll={Platform.OS === "web"}>
        <View style={styles.viewGrid}>
          <View style={styles.viewTitle}>
            <H3 style={styles.textTitle}>{store?.app?.subTitle}</H3>
            <ActionGroup.Large store={store} actions={actions} />
          </View>
          <View
            style={StyleSheet.flatten([
              styles.viewTable,
              { height: store.app?.dimension.height - 144 },
            ])}
          ></View>
        </View>
      </Layout>
      <ActionGroup.Small store={store} actions={actions} />
    </>
  )
})

const styles = StyleSheet.create({
  viewGrid: tw("flex-1 flex-col"),
  viewTitle: tw("flex-row justify-between items-center mb-2 h-10"),
  textTitle: tw("text-white"),
  viewTable: tw("flex-col bg-white rounded-lg p-2"),
  boxDelete: tw("flex-1"),
  iconDelete: tw(
    `${theme.danger_bg} flex-row flex-1 justify-center items-center`
  ),
  rowMobile: tw("flex-col"),
})

export default SettingTrash

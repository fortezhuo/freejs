import React, { FC } from "react"
import { View, StyleSheet, Platform } from "react-native"
import { tw } from "@free/tailwind"
import { TableContainer } from "./TableContainer"
import { useHook, useActions } from "./hook"
import { observer } from "mobx-react-lite"
import { Layout, H3, ActionGroup } from "../../component"
import { theme } from "../../config/theme"

const ViewGrid: FC = observer(() => {
  const { store } = useHook()
  const { actions, actDelete } = useActions(store)
  const isLoading = store.isLoading || store.temp.get("name") !== store.name

  return (
    <>
      <Layout
        store={store}
        isLoading={isLoading}
        scroll={Platform.OS === "web"}
      >
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
          >
            <TableContainer store={store} actDelete={actDelete} />
          </View>
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

export default ViewGrid

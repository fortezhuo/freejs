import React, { FC } from "react"
import { View, StyleSheet, Platform } from "react-native"
import { tw } from "@free/tailwind"
import { TableContainer } from "./TableContainer"
import { useHook } from "./hook"
import { observer } from "mobx-react-lite"
import { Layout, H3, ActionGroup } from "../../component"
import { theme } from "../../config/theme"

const ViewGrid: FC = observer(() => {
  const { store, isMobile, name } = useHook()
  const label = store.data.get("label")
  const columns = store.data.get("column")
  const data = store.data.get("collection")
  const buttonDesktop = store.data.get("button_desktop") || []
  const buttonMobile = store.data.get("button_mobile") || []
  const isLoading =
    store.isLoading ||
    store.data.get("name") !== name ||
    store.data.get("isMobile") !== isMobile

  return (
    <Layout store={store} isLoading={isLoading} scroll={Platform.OS === "web"}>
      <View style={styles.viewGrid}>
        <View style={styles.viewTitle}>
          <H3 style={styles.textTitle}>{store?.app?.subTitle}</H3>
          <ActionGroup.Large store={store} button={buttonDesktop} />
        </View>
        <View
          style={StyleSheet.flatten([
            styles.viewTable,
            { height: store.app?.dimension.height - 144 },
          ])}
        >
          {columns && data && (
            <TableContainer
              isMobile={isMobile}
              store={store}
              columns={columns}
              data={data}
              name={name}
              label={label}
            />
          )}
        </View>
      </View>
    </Layout>
  )
})

const styles = StyleSheet.create({
  viewGrid: tw("flex-1 flex-col"),
  viewTitle: tw("flex-row mb-3 justify-between items-center"),
  textTitle: tw("text-white"),
  viewTable: tw("flex-col bg-white rounded-lg p-1"),
  boxDelete: tw("flex-1"),
  iconDelete: tw(
    `${theme.danger_bg} flex-row flex-1 justify-center items-center`
  ),
  rowMobile: tw("flex-col"),
})

export default ViewGrid

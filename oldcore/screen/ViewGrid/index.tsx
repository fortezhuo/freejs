import React, { FC } from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { ActionBar } from "../../component/ActionBar"
import * as ActionGroup from "../../component/ActionGroup"
import { TableContainer } from "./TableContainer"
import { useHook } from "./hook"
import { observer } from "mobx-react-lite"
import { Layout } from "../../component/Layout"
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
    <Layout store={store} isLoading={isLoading}>
      <View style={styles.rootViewGrid}>
        <View style={styles.boxTable}>
          {buttonDesktop.length != 0 && (
            <ActionBar
              left={<ActionGroup.Large store={store} button={buttonDesktop} />}
            />
          )}

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
      <ActionGroup.Small
        store={store}
        button={buttonMobile}
        size={["sm", "md"]}
      />
    </Layout>
  )
})

const styles = StyleSheet.create({
  rootViewGrid: tw("flex-1 flex-col"),
  rootTable: tw("flex-1"),
  boxTable: tw("flex-no-wrap flex-1"),
  boxDelete: tw("flex-1"),
  iconDelete: tw(`${theme.danger} flex-row flex-1 justify-center items-center`),
  rowMobile: tw("flex-col"),
})

export default ViewGrid

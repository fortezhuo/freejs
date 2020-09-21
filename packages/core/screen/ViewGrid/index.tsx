import React, { FC } from "react"
import { View, StyleSheet, Text } from "react-native"
import { tw } from "@free/tailwind"
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
  const isLoading =
    store.isLoading ||
    store.data.get("name") !== name ||
    store.data.get("isMobile") !== isMobile

  return (
    <Layout store={store} isLoading={isLoading}>
      <View style={styles.rootViewGrid}>
        <View style={styles.boxTable}>
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
  rootViewGrid: tw("flex-1 flex-col"),
  rootTable: tw("flex-1"),
  boxTable: tw("flex-no-wrap flex-1"),
  boxDelete: tw("flex-1"),
  iconDelete: tw(`${theme.danger} flex-row flex-1 justify-center items-center`),
  rowMobile: tw("flex-col"),
})

export default ViewGrid

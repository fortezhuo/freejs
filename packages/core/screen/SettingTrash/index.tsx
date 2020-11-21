import React from "react"
import { View, StyleSheet, Platform } from "react-native"
import { tw } from "@free/tailwind"
import { TableGrid } from "./TableGrid"
import { observer } from "mobx-react-lite"
import { Layout, H3, ActionGroup, Loader, Table } from "../../component"
import { theme } from "../../config/theme"
import { useTrash } from "./hook"

const SettingTrash: React.FC = observer(() => {
  const { trash, columns, actions } = useTrash()
  const isMobile = trash.app?.dimension.isMobile
  const refActions: any = React.useRef(actions)

  React.useEffect(() => {
    refActions.current = actions.filter((action) =>
      isMobile ? action.children !== "Delete" : true
    )
  }, [isMobile])

  return (
    <>
      <Layout store={trash} scroll={Platform.OS === "web"}>
        <View style={styles.viewGrid}>
          <View style={styles.viewTitle}>
            <H3 style={styles.textTitle}>Trash Management</H3>
            <ActionGroup.Large store={trash} actions={refActions.current} />
          </View>
          <View
            style={StyleSheet.flatten([
              styles.viewTable,
              { height: trash.app?.dimension.height - 144 },
            ])}
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

import React, { FC, createRef } from "react"
import { View, StyleSheet, FlatList, Animated } from "react-native"
import { tw } from "@free/tailwind"
import { Table, Row, Cell, Header } from "../../component/Table"
import { IconButton } from "../../component/Icon"
import { useHook } from "./hook"
import { useTable } from "react-table"
import { observer } from "mobx-react-lite"
import { ActionBar } from "../../component/ActionBar"
import * as ActionGroup from "../../component/ActionGroup"
import { Layout } from "../../component/Layout"
import { theme } from "../../config/theme"
import Swipeable from "react-native-gesture-handler/Swipeable"

const SwipeableRow: FC<any> = ({ children }) => {
  const ref = createRef<any>()
  const width = 88
  return (
    <Swipeable
      ref={ref}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={(progress: any) => {
        const trans = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [width, 0],
        })
        const onPress = () => {
          ref?.current.close()
          alert("Delete")
        }
        return (
          <View
            style={{
              width,
              flexDirection: "row",
            }}
          >
            <Animated.View
              style={{ flex: 1, transform: [{ translateX: trans }] }}
            >
              <IconButton
                styleContainer={styles.boxDelete}
                name="trash-2"
                onPress={onPress}
              >
                Delete
              </IconButton>
            </Animated.View>
          </View>
        )
      }}
    >
      {children}
    </Swipeable>
  )
}

const ViewGrid: FC = observer(() => {
  const store = useHook()
  const column = store.data.get("column") || []
  const isMobile = ["sm", "md"].indexOf(store?.app?.dimension.screen) >= 0
  const buttonDesktop = store.data.get("button_desktop")
  const buttonMobile = store.data.get("button_mobile")
  const isFilter = store.temp.get("isFilter") || false
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns: column,
    data: store.data.get("collection") || [],
  })

  return (
    <Layout store={store}>
      <View style={styles.rootViewGrid}>
        <View style={styles.boxTable}>
          {buttonDesktop && (
            <ActionBar
              left={<ActionGroup.Large store={store} button={buttonDesktop} />}
            />
          )}
          <Table
            scroll={!isMobile}
            style={styles.rootTable}
            {...getTableProps()}
          >
            {headerGroups.map((headerGroup) => (
              <Header {...headerGroup.getHeaderGroupProps()}>
                {isMobile ? (
                  <Cell>Content</Cell>
                ) : (
                  headerGroup.headers.map((column) => (
                    <Cell
                      {...column.getHeaderProps()}
                      style={(column as any).style || {}}
                    >
                      {column.render("Header")}
                    </Cell>
                  ))
                )}
              </Header>
            ))}
            {isFilter && <Row filter>{}</Row>}
            <FlatList
              data={rows}
              keyExtractor={(row) => row.id}
              renderItem={({ item, index }) => {
                prepareRow(item)
                return isMobile ? (
                  <SwipeableRow>
                    <Row dark={index % 2} style={styles.rowMobile}>
                      <Cell>Mobile</Cell>
                    </Row>
                  </SwipeableRow>
                ) : (
                  <Row dark={index % 2} {...item.getRowProps()}>
                    {item.cells.map((cell) => cell.render("Cell"))}
                  </Row>
                )
              }}
            />
          </Table>
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
  boxDelete: tw(`${theme.danger} flex-row`),
  rowMobile: tw("flex-col"),
})

export default ViewGrid

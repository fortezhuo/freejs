import React, { FC, createRef } from "react"
import { View, StyleSheet, Animated } from "react-native"
import { tw } from "@free/tailwind"
import { Table, Row, RowMobile, Cell, Header } from "../../component/Table"
import { useHook } from "./hook"
import { useTable } from "react-table"
import { observer } from "mobx-react-lite"
import { ActionBar } from "../../component/ActionBar"
import * as ActionGroup from "../../component/ActionGroup"
import { Layout } from "../../component/Layout"
import { theme } from "../../config/theme"
import { FlatList } from "react-native-gesture-handler"

const Wrapper: any = View

const ViewGrid: FC = observer(() => {
  const { name, store } = useHook()
  const column = store.data.get("column") || []
  const label = store.data.get("label") || []
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
            {!isMobile &&
              headerGroups.map((headerGroup) => (
                <Header {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Cell
                      {...column.getHeaderProps()}
                      style={(column as any).style}
                    >
                      {column.render("Header")}
                    </Cell>
                  ))}
                </Header>
              ))}
            {isFilter && <Row filter>{}</Row>}
            <FlatList
              data={rows}
              keyExtractor={(row) => row.id}
              renderItem={({ item, index }) => {
                prepareRow(item)
                return isMobile ? (
                  <RowMobile
                    index={index}
                    store={store}
                    name={name}
                    dark={index % 2}
                    data={item.values}
                    label={label}
                  />
                ) : (
                  <Row dark={index % 2} {...item.getRowProps()}>
                    {item.cells.map((cell) => (
                      <Wrapper {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </Wrapper>
                    ))}
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
  boxDelete: tw("flex-1"),
  iconDelete: tw(`${theme.danger} flex-row flex-1 justify-center items-center`),
  rowMobile: tw("flex-col"),
})

export default ViewGrid

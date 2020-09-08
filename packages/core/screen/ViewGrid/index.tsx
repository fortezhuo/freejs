import React, { FC } from "react"
import { View, StyleSheet, FlatList, Text } from "react-native"
import { tw } from "@free/tailwind"
import { Table, Row, Cell, Header } from "../../component/Table"
import { useHook } from "./hook"
import { useTable } from "react-table"
import { observer } from "mobx-react-lite"
import { ActionBar } from "../../component/ActionBar"
import * as ActionGroup from "../../component/ActionGroup"
import { Layout } from "../../component/Layout"

const ViewGrid: FC = observer(() => {
  const store = useHook()
  const column = store.data.get("column") || []
  const button = store.data.get("button") || []
  const isFilter = store.temp.get("isFilter") || false
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns: column,
    data: store.data.get("collection") || [],
  })

  return (
    <Layout store={store}>
      <View style={styles.rootViewGrid}>
        <View style={styles.boxContent}>
          {button.length != 0 && (
            <ActionBar
              left={
                <ActionGroup.Large
                  store={store}
                  button={button}
                  size={["xl", "lg"]}
                />
              }
            />
          )}
          <Table scroll style={styles.rootTable} {...getTableProps()}>
            {headerGroups.map((headerGroup) => (
              <Header {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <Cell
                      {...column.getHeaderProps()}
                      style={(column as any).style || {}}
                    >
                      {column.render("Header")}
                    </Cell>
                  )
                })}
              </Header>
            ))}
            {isFilter && <Row filter>{}</Row>}
            <FlatList
              data={rows}
              keyExtractor={(row) => row.id}
              renderItem={({ item, index }) => {
                prepareRow(item)
                return (
                  <Row dark={index % 2} {...item.getRowProps()}>
                    {item.cells.map((cell) => {
                      return (
                        <Cell
                          {...cell.getCellProps()}
                          style={(cell.column as any).style || {}}
                        >
                          {cell.render("Cell")}
                        </Cell>
                      )
                    })}
                  </Row>
                )
              }}
            />
          </Table>
        </View>
      </View>
      <ActionGroup.Small store={store} button={button} size={["sm", "md"]} />
    </Layout>
  )
})

const styles = StyleSheet.create({
  rootViewGrid: tw("flex-1 flex-col"),
  rootTable: tw("flex-1"),
  boxContent: tw("flex-no-wrap flex-1"),
})

export default ViewGrid

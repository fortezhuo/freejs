import React, { FC } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { tw } from "@free/tailwind"
import { Table, Body, Row, Cell, Header } from "../../component/Table"
import { useTable } from "react-table"
import { observer } from "mobx-react-lite"
import { Layout } from "../../component/Layout"
import { useHook } from "./hook"

const SettingLog: FC = observer(() => {
  const store = useHook()
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: store.data.get("column") || [],
    data: store.data.get("collection") || [],
  })
  return (
    <Layout store={store}>
      <View style={styles.rootLog}>
        <View style={styles.boxContent}>
          <Table style={styles.rootTable} scroll {...getTableProps()}>
            {headerGroups.map((headerGroup) => (
              <Header {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <Cell
                      {...column.getHeaderProps()}
                      style={{ width: column.width, maxWidth: column.maxWidth }}
                    >
                      {column.render("Header")}
                    </Cell>
                  )
                })}
              </Header>
            ))}
            <Body scroll {...getTableBodyProps()}>
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
                            style={{
                              width: cell.column.width,
                              maxWidth: cell.column.maxWidth,
                            }}
                          >
                            {cell.render("Cell")}
                          </Cell>
                        )
                      })}
                    </Row>
                  )
                }}
              />
            </Body>
          </Table>
        </View>
      </View>
    </Layout>
  )
})

const styles = StyleSheet.create({
  rootLog: tw("flex-1 flex-col m-2 shadow-lg bg-white-300"),
  rootTable: tw("flex-1"),
  boxContent: tw("flex-no-wrap flex-1"),
})

export default SettingLog

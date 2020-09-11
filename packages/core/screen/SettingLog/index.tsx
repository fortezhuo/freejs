import React, { FC } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { tw } from "@free/tailwind"
import { Table, Row, Cell, Header } from "../../component/Table"
import { useTable } from "react-table"
import { observer } from "mobx-react-lite"
import { Layout } from "../../component/Layout"
import { useHook } from "./hook"

const SettingLog: FC = observer(() => {
  const store = useHook()
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
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
                    <Cell {...column.getHeaderProps()} style={column.style}>
                      {column.render("Header")}
                    </Cell>
                  )
                })}
              </Header>
            ))}
            <FlatList
              data={rows}
              keyExtractor={(row) => row.id}
              renderItem={({ item, index }) => {
                prepareRow(item)
                return (
                  <Row dark={index % 2} {...item.getRowProps()}>
                    {item.cells.map((cell) => cell.render("Cell"))}
                  </Row>
                )
              }}
            />
          </Table>
        </View>
      </View>
    </Layout>
  )
})

const styles = StyleSheet.create({
  rootLog: tw("flex-1 flex-col"),
  rootTable: tw("flex-1"),
  boxContent: tw("flex-no-wrap flex-1"),
})

export default SettingLog

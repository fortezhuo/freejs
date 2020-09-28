import React, { FC } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { tw } from "@free/tailwind"
import { Table, Row, Cell, Header } from "../../component/Table"
import { useTable } from "react-table"
import { observer } from "mobx-react-lite"
import { Layout } from "../../component"
import { H3 } from "../../component/Text"
import { useHook } from "./hook"

const Wrapper: any = View

const SettingLog: FC = observer(() => {
  const store = useHook()
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns: store.data.get("column") || [],
    data: store.data.get("collection") || [],
  })
  return (
    <Layout store={store}>
      <H3 style={styles.title}>Log Management</H3>
      <View style={styles.rootLog}>
        <Table style={styles.rootTable} scroll {...getTableProps()}>
          {headerGroups.map((headerGroup) => (
            <Header {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <Cell
                    {...column.getHeaderProps()}
                    style={(column as any).style}
                  >
                    {column.render("Header")}
                  </Cell>
                )
              })}
            </Header>
          ))}
          <View style={{ height: 450 }}>
            <FlatList
              data={rows}
              keyExtractor={(row) => row.id}
              renderItem={({ item, index }) => {
                prepareRow(item)
                return (
                  <Row dark={index % 2} {...item.getRowProps()}>
                    {item.cells.map((cell) => {
                      return (
                        <Wrapper {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </Wrapper>
                      )
                    })}
                  </Row>
                )
              }}
            />
          </View>
        </Table>
      </View>
    </Layout>
  )
})

const styles = StyleSheet.create({
  title: tw("text-white mb-4"),
  rootLog: tw("flex-1 flex-col bg-white rounded-lg p-2"),
  rootTable: tw("flex-1"),
})

export default SettingLog

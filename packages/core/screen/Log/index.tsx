import React, { FC } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { tw } from "@free/tailwind"
import { Table, Body, Row, Cell, Header } from "../../component/Table"
import { useLog, useColumns } from "./hook"
import { useTable } from "react-table"
import { observer } from "mobx-react-lite"
import { Layout } from "../../component/Layout"

const Log: FC = observer(() => {
  const state: any = useLog()
  const data = state.data
  const columns: any = useColumns()
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })
  return (
    <Layout store={state}>
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
                renderItem={({ item }) => {
                  prepareRow(item)
                  return (
                    <Row {...item.getRowProps()}>
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

export default Log

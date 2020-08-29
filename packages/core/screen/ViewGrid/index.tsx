import React, { FC } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { tw } from "@free/tailwind"
import { Table, Body, Row, Cell, Header } from "../../component/Table"
import { useViewGrid } from "./hook"
import { useTable } from "react-table"
import { observer } from "mobx-react-lite"
import { ActionBar } from "../../component/ActionBar"
import { Button } from "../../component/Button"
import { Layout } from "../../component/Layout"

const ViewGrid: FC = observer(() => {
  const view = useViewGrid()
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: view.data.get("column") || [],
    data: view.data.get("collection") || [],
  })
  return (
    <Layout store={view}>
      <View style={styles.rootViewGrid}>
        <View style={styles.boxContent}>
          <ActionBar>
            <Button>Test</Button>
          </ActionBar>
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
            </Body>
          </Table>
        </View>
      </View>
    </Layout>
  )
})

const styles = StyleSheet.create({
  rootViewGrid: tw("flex-1 flex-col m-2 shadow-lg bg-white-300"),
  rootTable: tw("flex-1"),
  boxContent: tw("flex-no-wrap flex-1"),
})

export default ViewGrid

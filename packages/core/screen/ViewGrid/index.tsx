import React, { FC } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { tw } from "@free/tailwind"
import { Table, Body, Row, Cell, Header } from "../../component/Table"
import { useViewGrid } from "./hook"
import { useTable } from "react-table"
import { observer } from "mobx-react-lite"

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
    <View style={styles.rootViewGrid}>
      <View style={styles.boxContent}>
        <Table scroll style={styles.rootTable} {...getTableProps()}>
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
  )
})

const styles = StyleSheet.create({
  rootViewGrid: tw("flex-1 flex-col m-2 shadow-lg bg-white-300"),
  rootTable: tw("flex-1"),
  boxContent: tw("flex-no-wrap flex-1"),
})

export default ViewGrid

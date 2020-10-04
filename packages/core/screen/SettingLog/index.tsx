import React, { FC, useMemo } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { tw } from "@free/tailwind"
import { useTable } from "react-table"
import { observer } from "mobx-react-lite"
import {
  Layout,
  Table,
  TableRow,
  TableCell,
  TableHeader,
  useDefaultColumn,
} from "../../component"
import { H3 } from "../../component/Text"
import { useHook } from "./hook"

const Wrapper: any = View

const SettingLog: FC = observer(() => {
  const store = useHook()
  const defaultColumn = useDefaultColumn(store)
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns: store.data.get("column") || [],
    data: store.data.get("collection") || [],
    defaultColumn,
  })

  return (
    <Layout store={store}>
      <H3 style={styles.title}>Log Management</H3>
      <View style={styles.rootLog}>
        <Table style={styles.rootTable} scroll {...getTableProps()}>
          {headerGroups.map((headerGroup) => (
            <TableHeader {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <TableCell
                    {...column.getHeaderProps()}
                    style={(column as any).style}
                  >
                    {column.render("Header")}
                  </TableCell>
                )
              })}
            </TableHeader>
          ))}
          <View style={{ height: 450 }}>
            <FlatList
              data={rows}
              keyExtractor={(row) => row.id}
              renderItem={({ item, index }) => {
                prepareRow(item)
                return (
                  <TableRow dark={index % 2} {...item.getRowProps()}>
                    {item.cells.map((cell) => {
                      return (
                        <Wrapper {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </Wrapper>
                      )
                    })}
                  </TableRow>
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

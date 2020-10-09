import React, { FC } from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import {
  Loader,
  Table,
  TableRow,
  TableRowMobile,
  TableCell,
  TableHeader,
  TablePagination,
  useDefaultColumn,
} from "../../component"
import { observer } from "mobx-react-lite"
import { useTable } from "react-table"
import { useColumns } from "./hook"
import { FlatList } from "react-native-gesture-handler"

const Wrapper: any = View

export const TableContainer: FC<any> = observer(({ store, actDelete }) => {
  const isNotLog = store.name !== "log"
  const defaultColumn = useDefaultColumn(store)
  const isMobile = store?.app.dimension.isMobile
  const { columns, keys } = useColumns(store)
  const data = store.data.get("collection") || []
  const isLoading = store.isLoading || store.data.get("name") !== store.name

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    defaultColumn,
  })
  return columns && data ? (
    <View style={styles.viewTable}>
      {!isMobile && isNotLog && <TablePagination store={store} />}
      <Table
        scroll={!isMobile && !isLoading}
        style={styles.viewTable}
        {...getTableProps()}
      >
        {!isMobile &&
          headerGroups.map((headerGroup) => (
            <TableHeader {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Wrapper {...column.getHeaderProps()}>
                  <TableCell style={(column as any).style}>
                    {column.render("Header")}
                  </TableCell>
                </Wrapper>
              ))}
            </TableHeader>
          ))}
        {isLoading ? (
          <Loader themeColor={"bg-gray-700"} />
        ) : (
          <FlatList
            data={rows}
            keyExtractor={(row) => row.id}
            renderItem={({ item, index }) => {
              prepareRow(item)
              return isMobile ? (
                <TableRowMobile
                  store={store}
                  actDelete={actDelete}
                  dark={index % 2}
                  data={item.values}
                  keys={keys}
                />
              ) : (
                <TableRow dark={index % 2} {...item.getRowProps()}>
                  {item.cells.map((cell) => (
                    <Wrapper {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </Wrapper>
                  ))}
                </TableRow>
              )
            }}
          />
        )}
      </Table>
    </View>
  ) : null
})

const styles = StyleSheet.create({
  viewTable: tw("flex-1"),
})

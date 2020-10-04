import React, { FC } from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import {
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
import { FlatList } from "react-native-gesture-handler"

const Wrapper: any = View

export const TableContainer: FC<any> = observer(
  ({ store, label, columns, data, isMobile }) => {
    const defaultColumn = useDefaultColumn(store)
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
      defaultColumn,
    })
    return (
      <View style={styles.viewTable}>
        <TablePagination />
        <Table scroll={!isMobile} style={styles.viewTable} {...getTableProps()}>
          {!isMobile &&
            headerGroups.map((headerGroup) => (
              <TableHeader {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps()}
                    style={(column as any).style}
                  >
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableHeader>
            ))}
          <FlatList
            data={rows}
            keyExtractor={(row) => row.id}
            renderItem={({ item, index }) => {
              prepareRow(item)
              return isMobile ? (
                <TableRowMobile
                  index={index}
                  store={store}
                  dark={index % 2}
                  data={item.values}
                  label={label}
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
        </Table>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  viewTable: tw("flex-1"),
})

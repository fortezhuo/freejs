import React, { FC } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { tw } from "@free/tailwind"
import {
  Table,
  Row as _Row,
  RowMobile as _RowMobile,
  Cell,
  Header,
  withClass,
} from "../../component/Table"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import { SwipeListView } from "react-native-swipe-list-view"
import { useTable } from "react-table"

const Wrapper: any = View

const Row: any = withClass(_Row)
const RowMobile: any = withClass(_RowMobile)

export const TableContainer: FC<any> = observer(
  ({ store, label, columns, data, isMobile }) => {
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
    })

    return (
      <Table scroll={true} style={styles.rootTable} {...getTableProps()}>
        {!isMobile &&
          headerGroups.map((headerGroup) => (
            <Header {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Cell
                  {...column.getHeaderProps()}
                  style={(column as any).style}
                >
                  {column.render("Header")}
                </Cell>
              ))}
            </Header>
          ))}
        <SwipeListView
          data={rows}
          keyExtractor={(row) => row.id}
          renderItem={({ item, index }) => {
            prepareRow(item)
            return isMobile ? (
              <RowMobile
                index={index}
                store={store}
                name={name}
                dark={index % 2}
                data={item.values}
                label={label}
              />
            ) : (
              <Row dark={index % 2} {...item.getRowProps()}>
                {item.cells.map((cell) => (
                  <Wrapper {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </Wrapper>
                ))}
              </Row>
            )
          }}
        />
      </Table>
    )
  }
)

const styles = StyleSheet.create({
  rootViewGrid: tw("flex-1 flex-col"),
  rootTable: tw("flex-1"),
  boxTable: tw("flex-no-wrap flex-1"),
  boxDelete: tw("flex-1"),
  iconDelete: tw(`${theme.danger} flex-row flex-1 justify-center items-center`),
  rowMobile: tw("flex-col"),
})

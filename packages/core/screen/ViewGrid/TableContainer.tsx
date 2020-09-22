import React, { FC } from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { Table, Row, RowMobile, Cell, Header } from "../../component/Table"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import { useTable } from "react-table"
import { FlatList } from "react-native-gesture-handler"

const Wrapper: any = View

export const TableContainer: FC<any> = observer(
  ({ store, label, columns, data, isMobile }) => {
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
    })

    return (
      <Table scroll={!isMobile} style={styles.rootTable} {...getTableProps()}>
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
        <FlatList
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

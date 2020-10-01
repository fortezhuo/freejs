import React, { FC } from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import {
  Table,
  Row,
  RowMobile,
  Cell,
  Header,
  Pagination,
} from "../../component/Table"
import { observer } from "mobx-react-lite"
import { useTable } from "react-table"
import { FlatList } from "react-native-gesture-handler"
import { random } from "../../util/random"

const Wrapper: any = View

export const TableContainer: FC<any> = observer(
  ({ store, label, columns, data, isMobile }) => {
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
    })
    return (
      <View style={styles.viewTable}>
        <Pagination />
        <Table scroll={!isMobile} style={styles.viewTable} {...getTableProps()}>
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
      </View>
    )
  }
)

const styles = StyleSheet.create({
  viewTable: tw("flex-1"),
})

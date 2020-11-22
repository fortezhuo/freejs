import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Table, Icon, Text, Loader } from "../../component"
import { useTableGrid, useSelection } from "./hook"
import { useTable, usePagination, useRowSelect, useSortBy } from "react-table"
import { FlatList } from "react-native-gesture-handler"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import { tw, color } from "@free/tailwind"
import { TablePagination } from "../../shared/ViewGrid/TablePagination"

const defaultColor = color(theme.default_text)

export const TableGrid: React.FC<any> = observer(
  ({ store, columns, actions }) => {
    const [
      isMobile,
      collection = [],
      pageIndex,
      limit,
      total,
      pageMax,
    ] = store.getData("isMobile", "collection", "page", "limit", "total", "max")
    const table: any = useTableGrid(store, columns)
    const columnsFormat = Table.useDefaultColumn(store)
    const actionDelete = React.useMemo(() => {
      return actions.filter((action: any) => action.children === "Delete")[0]
    }, [])

    return total ? (
      <TableContent
        store={store}
        isMobile={isMobile}
        isUpdating={store.isUpdating}
        data={{
          ...table,
          action: actionDelete,
          columnsFormat,
          collection,
        }}
        page={{
          index: pageIndex,
          limit: limit,
          total: total,
          max: pageMax,
        }}
      />
    ) : (
      <Loader dark />
    )
  }
)

const TableContent: React.FC<any> = observer(
  ({ store, isMobile, isUpdating, data, page }) => {
    const { columns, columnsFormat, collection, action, keys } = data
    const TableWrapper = isMobile || isUpdating ? Table.Default : Table.Scroll
    const { headerGroups, prepareRow, page: rows, gotoPage }: any = useTable(
      {
        columns,
        data: collection,
        initialState: { pageIndex: 1 },
        manualPagination: true,
        defaultColumn: columnsFormat,
        pageCount: page.max,
      } as any,
      useSortBy,
      usePagination,
      useRowSelect,
      useSelection
    )

    return (
      <>
        <TablePagination store={store} page={{ ...page, goto: gotoPage }} />
        <TableWrapper style={s.viewTable}>
          {!isMobile &&
            headerGroups.map((headerGroup: any) => {
              const { key } = headerGroup.getHeaderGroupProps()
              return (
                <Table.Header key={key}>
                  {headerGroup.headers.map((column: any) => {
                    const { key } = column.getHeaderProps(
                      column.getSortByToggleProps()
                    )
                    const onPress = React.useCallback((e) => {
                      return column.canSort
                        ? column.toggleSortBy(undefined, true)
                        : {}
                    }, [])
                    return (
                      <TouchableOpacity key={key} onPress={onPress}>
                        <Table.Cell style={(column as any).style}>
                          <Text>{column.render("Header")} </Text>
                          {column.isSorted && (
                            <Icon
                              color={defaultColor}
                              name={
                                column.isSortedDesc
                                  ? "chevron-down"
                                  : "chevron-up"
                              }
                              size={16}
                            />
                          )}
                        </Table.Cell>
                      </TouchableOpacity>
                    )
                  })}
                </Table.Header>
              )
            })}
          {isUpdating ? (
            <Loader dark />
          ) : (
            <FlatList
              data={rows}
              keyExtractor={(row: any) => row.id}
              renderItem={({ item, index }: any) => {
                prepareRow(item)
                return isMobile ? (
                  <Table.RowMobile
                    store={store}
                    actDelete={action}
                    dark={index % 2}
                    data={item.values}
                    keys={keys}
                  />
                ) : (
                  <Table.Row dark={index % 2}>
                    {item.cells.map((cell: any) => {
                      const { key } = cell.getCellProps()
                      return <View key={key}>{cell.render("Cell")}</View>
                    })}
                  </Table.Row>
                )
              }}
            />
          )}
        </TableWrapper>
      </>
    )
  }
)

const s = StyleSheet.create({
  viewTable: tw("flex-1"),
})

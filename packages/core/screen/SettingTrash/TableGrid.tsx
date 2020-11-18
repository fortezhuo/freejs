import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import {
  useDefaultColumn,
  Table,
  TableScroll,
  Icon,
  Text,
  TableRow,
  TableRowMobile,
  TableCell,
  TableHeader,
  Loader,
} from "../../component"
import { useTableGrid, useSelection } from "./hook"
import { useTable, usePagination, useRowSelect, useSortBy } from "react-table"
import { random } from "../../util/random"
import { FlatList } from "react-native-gesture-handler"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import { tw, color } from "@free/tailwind"
import { TablePagination } from "../../shared/ViewGrid/TablePagination"

const defaultColor = color(theme.default_text)

export const TableGrid: React.FC<any> = observer(({ store, actions }) => {
  const [
    isMobile,
    collection = [],
    pageIndex,
    limit,
    total,
    pageMax,
  ] = store.getData("isMobile", "collection", "page", "limit", "total", "max")
  const { columns, keys } = useTableGrid(store)
  const columnsFormat = useDefaultColumn(store)
  const actionDelete = React.useMemo(() => {
    actions.filter((action: any) => action.children === "Delete")[0]
  }, [])

  return total ? (
    <TableContent
      store={store}
      isMobile={isMobile}
      isUpdating={store.isUpdating}
      data={{
        action: actionDelete,
        columns,
        columnsFormat,
        collection,
        keys,
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
})

const TableContent: React.FC<any> = observer(
  ({ store, isMobile, isUpdating, data, page }) => {
    const { columns, columnsFormat, collection, action, keys } = data
    const isFilter = store.data.get("isFilter") || false
    const TableWrapper = isMobile || isUpdating ? Table : TableScroll
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
      <TableWrapper style={styles.viewTable}>
        {!isMobile &&
          headerGroups.map((headerGroup: any) => {
            const { key } = headerGroup.getHeaderGroupProps()
            return (
              <View key={key}>
                <TableHeader>
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
                        <TableCell style={(column as any).style}>
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
                        </TableCell>
                      </TouchableOpacity>
                    )
                  })}
                </TableHeader>
                {isFilter && (
                  <TableRow filter>
                    {headerGroup.headers.map((column: any) => {
                      return (
                        <TableCell
                          filter
                          style={(column as any).style}
                          key={"filter_" + random()}
                        >
                          {column.render("Filter")}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )}
              </View>
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
                <TableRowMobile
                  store={store}
                  actDelete={action}
                  dark={index % 2}
                  data={item.values}
                  keys={keys}
                />
              ) : (
                <TableRow dark={index % 2}>
                  {item.cells.map((cell: any) => {
                    const { key } = cell.getCellProps()
                    return <View key={key}>{cell.render("Cell")}</View>
                  })}
                </TableRow>
              )
            }}
          />
        )}
      </TableWrapper>
    )
  }
)

/*
 {!isMobile &&
          headerGroups.map((headerGroup: any) => {
            const { key } = headerGroup.getHeaderGroupProps()
            return (
              <View key={key}>
                <TableHeader>
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
                        <TableCell style={(column as any).style}>
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
                        </TableCell>
                      </TouchableOpacity>
                    )
                  })}
                </TableHeader>
                {isFilter && (
                  <TableRow filter>
                    {headerGroup.headers.map((column: any) => {
                      return (
                        <TableCell
                          filter
                          style={(column as any).style}
                          key={"filter_" + random()}
                        >
                          {column.render("Filter")}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )}
              </View>
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
                <TableRowMobile
                  store={store}
                  actDelete={action}
                  dark={index % 2}
                  data={item.values}
                  keys={keys}
                />
              ) : (
                <TableRow dark={index % 2}>
                  {item.cells.map((cell: any) => {
                    const { key } = cell.getCellProps()
                    return <View key={key}>{cell.render("Cell")}</View>
                  })}
                </TableRow>
              )
            }}
          />
        )}
        */

const styles = StyleSheet.create({
  viewTable: tw("flex-1"),
})

import React, { FC, useCallback } from "react"
import { useTable, usePagination, useRowSelect, useSortBy } from "react-table"
import { random } from "../../util/random"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { useSelection } from "./hook"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import {
  Icon,
  Text,
  Loader,
  Table,
  TableScroll,
  TableRow,
  TableRowMobile,
  TableCell,
  TableHeader,
} from "../../component"
import { tw, color } from "@free/tailwind"
import { Pagination } from "./Pagination"

const defaultColor = color(theme.default_text)

export const TableGrid: FC<any> = observer(
  ({ store, data, actDelete, page }) => {
    const {
      columns,
      columnsFormat,
      collection,
      keys,
      isMobile,
      isLoading,
    } = data
    const isFilter = store.data.get("isFilter") || false
    const isShowPagination = store.name !== "log" && !isMobile
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

    const TableWrapper = isMobile ? Table : TableScroll

    return (
      <>
        {isShowPagination && (
          <Pagination store={store} page={{ ...page, goto: gotoPage }} />
        )}
        <TableWrapper scroll={!isLoading} style={styles.viewTable}>
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
                      const onPress = useCallback((e) => {
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
          {isLoading ? (
            <Loader themeColor={"bg-gray-400"} />
          ) : (
            <FlatList
              data={rows}
              keyExtractor={(row: any) => row.id}
              renderItem={({ item, index }: any) => {
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
      </>
    )
  }
)

const styles = StyleSheet.create({
  viewTable: tw("flex-1"),
})

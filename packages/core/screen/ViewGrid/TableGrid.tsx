import React, { FC, useCallback } from "react"
import { useTable, usePagination, useRowSelect, useSortBy } from "react-table"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { useSelection } from "./hook"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import {
  IconLabel,
  Loader,
  TableScroll,
  TableRow,
  TableRowMobile,
  TableCell,
  TableHeader,
} from "../../component"
import { tw, color } from "@free/tailwind"
import { Pagination } from "./Pagination"

const Wrapper: any = View
const WrapperPress: any = TouchableOpacity
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

    const isShowPagination = store.name !== "log" && !isMobile
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page: rows,
      gotoPage,
    }: any = useTable(
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
        {isShowPagination && (
          <Pagination store={store} page={{ ...page, goto: gotoPage }} />
        )}

        <TableScroll
          scroll={!isMobile && !isLoading}
          style={styles.viewTable}
          {...getTableProps()}
        >
          {!isMobile &&
            headerGroups.map((headerGroup: any) => (
              <TableHeader {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => {
                  const { onClick, ...header } = column.getHeaderProps(
                    column.getSortByToggleProps()
                  )
                  const onPress = useCallback((e) => {
                    return column.canSort
                      ? column.toggleSortBy(undefined, true)
                      : {}
                  }, [])
                  return (
                    <WrapperPress {...header} onPress={onPress}>
                      <TableCell style={(column as any).style}>
                        {column.render("Header")}
                        {column.isSorted && (
                          <IconLabel
                            styleContainer={styles.iconSort}
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
                    </WrapperPress>
                  )
                })}
              </TableHeader>
            ))}
          {isLoading ? (
            <Loader themeColor={"bg-gray-400"} />
          ) : (
            <FlatList
              {...getTableBodyProps()}
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
                  <TableRow dark={index % 2} {...item.getRowProps()}>
                    {item.cells.map((cell: any) => (
                      <Wrapper {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </Wrapper>
                    ))}
                  </TableRow>
                )
              }}
            />
          )}
        </TableScroll>
      </>
    )
  }
)

const styles = StyleSheet.create({
  viewTable: tw("flex-1"),
  iconSort: tw("ml-2"),
})

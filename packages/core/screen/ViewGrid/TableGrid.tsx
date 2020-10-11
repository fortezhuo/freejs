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
  Table,
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
  ({
    store,
    isLoading,
    isMobile,
    columns,
    data,
    defaultColumn,
    actDelete,
    keys,
    pageMax,
  }) => {
    const isShowPagination = store.name !== "log" && !isMobile

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      gotoPage,
    }: any = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 1 },
        manualPagination: true,
        defaultColumn,
        pageCount: pageMax,
      } as any,
      useSortBy,
      usePagination,
      useRowSelect,
      useSelection
    )

    return (
      <>
        {isShowPagination && <Pagination store={store} gotoPage={gotoPage} />}

        <Table
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
            <Loader themeColor={"bg-gray-700"} />
          ) : (
            <FlatList
              {...getTableBodyProps()}
              data={page}
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
        </Table>
      </>
    )
  }
)

const styles = StyleSheet.create({
  viewTable: tw("flex-1"),
  iconSort: tw("ml-2"),
})

/*
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

              <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              "selectedFlatRows[].original": selectedFlatRows.map(
                (d: any) => d.original
              ),
            },
            null,
            2
          )}
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre>
*/

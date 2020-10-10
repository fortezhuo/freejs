import React, { FC, useEffect } from "react"
import { useTable, usePagination, useRowSelect } from "react-table"
import { useSelection } from "./hook"
import { FlatList } from "react-native-gesture-handler"
import { observer } from "mobx-react-lite"
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
} from "../../component"

const Wrapper: any = View

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
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      selectedFlatRows,
      state: { pageIndex, pageSize, selectedRowIds },
    }: any = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0 },
        manualPagination: true,
        defaultColumn,
        pageCount: pageMax,
      } as any,
      usePagination,
      useRowSelect,
      useSelection
    )

    useEffect(() => {
      store.setData({ pageIndex, pageSize })
    }, [pageIndex, pageSize])

    // Render the UI for your table
    return (
      <Table style={styles.viewTable} scroll {...getTableProps()}>
        {!isMobile &&
          headerGroups.map((headerGroup: any) => (
            <TableHeader {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
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
    )
  }
)

const styles = StyleSheet.create({
  viewTable: tw("flex-1"),
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

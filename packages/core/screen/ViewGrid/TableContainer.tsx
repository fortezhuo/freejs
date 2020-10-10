import React, { FC } from "react"
import { Checkbox } from "./Checkbox"
import { useTable, usePagination, useRowSelect } from "react-table"
import { useColumns } from "./hook"
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
  useDefaultColumn,
} from "../../component"

const Wrapper: any = View

const TableGrid = observer(({ columns, data, defaultColumn }: any) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
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
      defaultColumn,
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllPageRowsSelectedProps }: any) => {
            return <Checkbox {...getToggleAllPageRowsSelectedProps()} />
          },
          Cell: ({ row }: any) => (
            <Checkbox {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ])
    }
  )

  // Render the UI for your table
  return (
    <Table style={styles.viewTable} scroll {...getTableProps()}>
      {headerGroups.map((headerGroup: any) => (
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
      <FlatList
        {...getTableBodyProps()}
        data={page}
        keyExtractor={(row: any) => row.id}
        renderItem={({ item, index }: any) => {
          prepareRow(item)
          return (
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
    </Table>
  )
})

const styles = StyleSheet.create({
  viewTable: tw("flex-1"),
})

export const TableContainer: FC<any> = observer(({ store, actDelete }) => {
  const { columns, keys } = useColumns(store)
  const data = store.data.get("collection") || []
  const defaultColumn = useDefaultColumn(store)
  const isLoading = store.isLoading || store.data.get("name") !== store.name

  return isLoading ? null : (
    <TableGrid columns={columns} data={data} defaultColumn={defaultColumn} />
  )
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

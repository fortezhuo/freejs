import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Table, Icon, Text, Loader } from "../../component"
import { useSelection } from "./hook"
import {
  useTable,
  usePagination,
  useRowSelect,
  useSortBy,
  useMountedLayoutEffect,
} from "react-table"
import { FlatList } from "react-native-gesture-handler"
import { theme } from "../../config/theme"
import { tw, color } from "@free/tailwind"
import { TablePagination } from "../../shared/ViewGrid/TablePagination"
import { useView, useDefaultColumn, useColumns } from "./hook"
import { useApp } from "../../state"

const defaultColor = color(theme.default_text)
const colMobileHidden = [
  "_id_link",
  "selection",
  "_id_json",
  "name_download_log",
]

const TableHeaderCell: React.FC<any> = ({ column }) => {
  const onPress = React.useCallback((e) => {
    return column.canSort ? column.toggleSortBy(undefined, true) : {}
  }, [])
  return (
    <TouchableOpacity onPress={onPress}>
      <Table.Cell style={(column as any).style}>
        <Text>{column.render("Header")}</Text>
        {column.isSorted && (
          <Icon
            color={defaultColor}
            name={column.isSortedDesc ? "chevron-down" : "chevron-up"}
            size={16}
          />
        )}
      </Table.Cell>
    </TouchableOpacity>
  )
}

export const TableGrid: React.FC<any> = ({ actions }) => {
  const app = useApp()
  const view = useView()
  const columnsFormat = useDefaultColumn()
  const columns = useColumns()
  const _isMobile = app.temp.isMobile
  const {
    isMobile,
    collection = [],
    pageIndex,
    limit,
    total,
    pageMax,
  } = view.data
  const swipeActions = React.useMemo(
    () =>
      actions.filter(
        (action: any) =>
          action.children === "Delete" || action.children === "Restore"
      ),
    []
  )
  const onSelect = React.useCallback((selectedFlatRows) => {
    view.setData({
      selected: selectedFlatRows.map((row: any) => row.original._id),
    })
  }, [])

  return (
    <TableContent
      isMobile={isMobile}
      isLoading={view.temp.isLoading}
      onSelect={onSelect}
      data={{
        columns,
        actions: swipeActions,
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
  )
}

const TableContent: React.FC<any> = ({
  store,
  isMobile,
  isLoading,
  data,
  page,
  onSelect,
}) => {
  const { columns, columnsFormat, collection, actions } = data
  const TableWrapper = isMobile || isLoading ? Table.Default : Table.Scroll
  const {
    headerGroups,
    prepareRow,
    selectedFlatRows,
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

  /*
  useMountedLayoutEffect(() => {
    onSelect(selectedFlatRows)
  }, [selectedFlatRows])

  */
  return (
    <>
      <TableWrapper style={s.viewTable}>
        {headerGroups.map((headerGroup: any) => {
          const { key } = headerGroup.getHeaderGroupProps()
          const style = isMobile ? { height: 0, opacity: 0 } : {}
          return (
            <Table.Header key={key} style={style}>
              {headerGroup.headers.map((column: any) => {
                const { key } = column.getHeaderProps(
                  column.getSortByToggleProps()
                )
                return <TableHeaderCell key={key} column={column} />
              })}
            </Table.Header>
          )
        })}

        {isLoading ? (
          <Loader dark />
        ) : (
          <FlatList
            data={rows}
            keyExtractor={(row: any) => row.id}
            renderItem={({ item, index }: any) => {
              prepareRow(item)
              return (
                <Table.RowData
                  store={store}
                  data={item.values}
                  isMobile={isMobile}
                  actionLeft={isMobile && actions[1]}
                  actionRight={isMobile && actions[0]}
                  dark={index % 2}
                >
                  {item.cells.map((cell: any, i: number) => {
                    const { key } = cell.getCellProps()
                    const isHide =
                      isMobile && colMobileHidden.indexOf(cell.column.id) >= 0
                    return (
                      <View key={key}>
                        {isHide ? <></> : cell.render("Cell")}
                      </View>
                    )
                  })}
                </Table.RowData>
              )
            }}
          />
        )}
      </TableWrapper>
    </>
  )
}

const s = StyleSheet.create({
  viewTable: tw("flex-1"),
})

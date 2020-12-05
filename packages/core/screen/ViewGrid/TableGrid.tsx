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
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import { tw, color } from "@free/tailwind"
import { TablePagination } from "../../shared/ViewGrid/TablePagination"

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

export const TableGrid: React.FC<any> = observer(({ store, config }) => {
  const _isMobile = store.app.dimension.isMobile
  const [
    isMobile,
    collection = [],
    pageIndex,
    limit,
    total,
    pageMax,
  ] = store.getData("isMobile", "collection", "page", "limit", "total", "max")
  const columnsFormat = Table.useDefaultColumn(store, _isMobile, config.keys)
  const swipeActions = React.useMemo(
    () =>
      config.actions.filter(
        (action: any) =>
          action.children === "Delete" || action.children === "Restore"
      ),
    []
  )

  return isMobile === _isMobile ? (
    <TableContent
      store={store}
      isMobile={_isMobile}
      isLoading={store.isLoading}
      data={{
        columns: config.columns,
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
  ) : (
    <Loader dark />
  )
})

const TableContent: React.FC<any> = ({
  store,
  isMobile,
  isLoading,
  data,
  page,
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

  useMountedLayoutEffect(() => {
    store.setData({
      selected: selectedFlatRows.map((row: any) => row.original._id),
    })
  }, [selectedFlatRows])

  return (
    <>
      <TablePagination store={store} page={{ ...page, goto: gotoPage }} />
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

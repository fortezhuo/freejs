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
import { TablePagination } from "./TablePagination"
import { TableRow } from "./TableRow"
import { useView, useColumns, useActions } from "./hook"
import { useApp } from "../../state"
import { random } from "../../util"

const defaultColor = color(theme.default_text)
const colMobileHidden = [
  "_id_link",
  "selection",
  "_id_json",
  "name_download_log",
]

const TableHeaderCell: React.FC<{ column: JSONObject }> = ({ column }) => {
  const Title = () =>
    React.useMemo(
      () =>
        typeof column.render("Header") === "string" ? (
          <TouchableOpacity
            onPress={(e) => {
              return column.canSort ? column.toggleSortBy(undefined, true) : {}
            }}
          >
            <Text>{column.render("Header")}</Text>
          </TouchableOpacity>
        ) : (
          column.render("Header")
        ),
      []
    )

  return (
    <Table.Cell style={(column as any).style}>
      <Title />
      {column.isSorted && (
        <Icon
          color={defaultColor}
          name={column.isSortedDesc ? "chevron-down" : "chevron-up"}
          size={16}
        />
      )}
    </Table.Cell>
  )
}

export const TableGrid: React.FC<{
  setContent: any
}> = React.memo(({ setContent }) => {
  const app = useApp()
  const { refSelected, refBottomSheet, ...view } = useView()
  const { isMobile, collection = [], max } = view.data
  const _isMobile = app.temp.isMobile
  const isReady = !!view.data?.config?.name
  const isLoading =
    view.stateProps.isLoading ||
    view.stateProps.isUpdating ||
    isMobile !== _isMobile
  const columns = useColumns({ refBottomSheet, setContent })
  const { swipeActions } = useActions(refBottomSheet)

  return (
    <View style={[s.viewLayout, { height: app.temp.height - 144 }]}>
      {!isReady ? (
        <Loader dark />
      ) : (
        <TableContent
          {...{
            isMobile,
            isLoading,
            refSelected,
            setContent,
            data: {
              columns,
              actions: swipeActions,
              collection,
              max,
            },
          }}
        />
      )}
    </View>
  )
})

interface TableContent {
  isMobile: boolean
  isLoading: boolean
  data: JSONObject
  setContent: any
  refSelected: any
}

const TableContent: React.FC<TableContent> = ({
  isMobile,
  isLoading,
  data,
  setContent,
  refSelected,
}) => {
  const { columns, columnsFormat, collection, actions } = data
  const TableWrapper = isMobile || isLoading ? Table.Default : Table.Scroll
  const {
    headerGroups,
    prepareRow,
    selectedFlatRows,
    page: rows,
  }: any = useTable(
    {
      columns,
      data: collection,
      initialState: { pageIndex: 1 },
      manualPagination: true,
      defaultColumn: columnsFormat,
      pageCount: data.max,
    } as any,
    useSortBy,
    usePagination,
    useRowSelect,
    useSelection
  )

  useMountedLayoutEffect(() => {
    if (!isLoading)
      refSelected.current = selectedFlatRows.map((row: any) => row.original._id)
  }, [selectedFlatRows, isLoading])

  return (
    <>
      <TablePagination />
      <TableWrapper style={s.viewTable}>
        {headerGroups.map((headerGroup: any, i: number) => {
          const style = isMobile ? { height: 0, opacity: 0 } : {}
          return (
            <Table.Header key={`header_${i}`} style={style}>
              {headerGroup.headers.map((column: any, j: number) => {
                return (
                  <TableHeaderCell key={`header_${i}_${j}`} column={column} />
                )
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
                <TableRow
                  {...{
                    isMobile,
                    setContent,
                    dark: index % 2,
                    data: item.values,
                    actionLeft: isMobile && actions[1],
                    actionRight: isMobile && actions[0],
                  }}
                >
                  {item.cells.map((cell: any, i: number) => {
                    const isHide =
                      isMobile && colMobileHidden.indexOf(cell.column.id) >= 0
                    return (
                      <View key={`cell_${i}`}>
                        {isHide ? <></> : cell.render("Cell")}
                      </View>
                    )
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

const s = StyleSheet.create({
  viewLayout: tw("flex-col bg-white rounded-lg p-2"),
  viewTable: tw("flex-1"),
})

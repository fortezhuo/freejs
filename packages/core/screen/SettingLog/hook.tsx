import React, { useMemo, useEffect } from "react"
import { CellLink, Cell } from "../../component/Table"
import { Platform } from "react-native"
import { download } from "./helper"
import { get } from "../../request"
import { useStore } from "../../component/Store"

const column = ((Platform.OS === "web"
  ? [
      {
        id: "link",
        Header: "",
        accessor: "name",
        style: { maxWidth: 36, width: 36 },
        Cell: (cell: any) => (
          <CellLink
            style={cell.column.style}
            onPress={() => download(cell.value)}
          />
        ),
      },
    ]
  : []) as Array<{}>).concat([
  {
    id: "name",
    Header: "Log Name",
    accessor: "name",
    style: { width: 200 },
    Cell: (cell: any) => <Cell style={cell.column.style}>{cell.value}</Cell>,
  },
  {
    Header: "Size",
    accessor: "size",
    style: { width: 50 },
    Cell: (cell: any) => <Cell style={cell.column.style}>{cell.value}</Cell>,
  },
  {
    Header: "Last Modified",
    accessor: "mtime",
    style: { width: 200 },
    Cell: (cell: any) => (
      <Cell style={cell.column.style} type="datetime">
        {cell.value}
      </Cell>
    ),
  },
])

export const useHook = () => {
  const { log } = useStore()

  useEffect(() => {
    ;(async function () {
      const res = await get("/api/log", {})
      log.setData({ column, collection: res.data.result })
    })()
  }, [])

  return log
}

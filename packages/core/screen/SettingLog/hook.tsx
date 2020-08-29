import React, { useMemo, useEffect } from "react"
import { CellLink } from "../../component/Table"
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
        Cell: (cell: any) => <CellLink onPress={() => download(cell.value)} />,
        maxWidth: 30,
        width: 30,
      },
    ]
  : []) as Array<{}>).concat([
  {
    id: "name",
    Header: "Log Name",
    accessor: "name",
    width: 200,
  },
  {
    Header: "Size",
    accessor: "size",
    width: 50,
  },
  {
    Header: "Last Modified",
    accessor: "mtime",
    width: 200,
  },
])

export const useHook = () => {
  const { log: store } = useStore()

  useEffect(() => {
    ;(async function () {
      const res = await get("/api/log", {})
      store.data.set("collection", res.data.result)
    })()
    store.data.set("column", column)
  }, [])

  return store
}

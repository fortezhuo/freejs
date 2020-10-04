import React, { useEffect } from "react"
import { Platform } from "react-native"
import { get } from "../../request"
import { useStore } from "../../component/Store"

const column = ((Platform.OS === "web"
  ? [
      {
        id: "link",
        Header: "",
        accessor: "name",
        style: { maxWidth: 36, width: 36 },
        type: "download",
        path: "/api/log",
      },
    ]
  : []) as Array<{}>).concat([
  {
    id: "name",
    Header: "Log Name",
    accessor: "name",
    style: { width: 200 },
    type: "string",
  },
  {
    Header: "Size",
    accessor: "size",
    style: { width: 50 },
    type: "string",
  },
  {
    Header: "Last Modified",
    accessor: "mtime",
    style: { width: 200 },
    type: "datetime",
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

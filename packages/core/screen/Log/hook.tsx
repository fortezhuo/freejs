import React, { useMemo, useEffect } from "react"
import { CellLink } from "../../component/Table"
import { useLocalStore } from "mobx-react-lite"
import { Platform } from "react-native"
import { download } from "./helper"
import { get } from "../../request"

export const useLog = () => {
  const state = useLocalStore(() => ({
    title: "Log Management",
    data: [],
    setData(data: []) {
      state.data = data
    },
  }))

  useEffect(() => {
    ;(async function () {
      const res = await get("/api/log", {})
      state.setData(res.data.result)
    })()
  }, [])

  return state
}

export const useColumns = () =>
  useMemo(
    () =>
      ((Platform.OS === "web"
        ? [
            {
              id: "link",
              Header: "",
              accessor: "name",
              Cell: (cell: any) => (
                <CellLink onPress={() => download(cell.value)} />
              ),
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
      ]),

    []
  )

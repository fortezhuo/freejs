import React, { useEffect } from "react"
import { IconButton } from "../../component/Icon"
import { useStore } from "../../component/Store"
import { get } from "../../request"
import * as config from "./config"

export const useViewGrid = () => {
  const { view } = useStore()
  const name = `${view.app.location}/`.split("/")[1]

  useEffect(() => {
    getColumn(name)
    getCollection(name)
  }, [view.app.location])

  const getCollection = async (name: string) => {
    const res = await get(`/api/${name}`, {})
    view.data.set("collection", res.data.result)
  }

  const getColumn = (name: string) => {
    const column = (config as ObjectAny)[name].column.map((col: ObjectAny) => ({
      id: col.type ? `${col.name}_${col.type}` : col.name,
      Header: col.label,
      accessor: col.name,
      style: col.style,
    }))
    view.data.set("column", column)
  }

  return view
}

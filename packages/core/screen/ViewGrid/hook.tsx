import React, { useEffect } from "react"
import { CellLink, CellCheckbox, Cell } from "../../component/Table"
import { useStore } from "../../component/Store"
import { get } from "../../request"
import * as config from "./config"
import dayjs from "dayjs"

const date = (date: any) => dayjs(date).format("DD MMM YYYY")

const datetime = (datetime: any) =>
  dayjs(datetime).format("DD MMM YYYY HH:mm:ss")

export const useViewGrid = () => {
  const { view } = useStore()
  const name = `${view.app.location}/`.split("/")[1]

  useEffect(() => {
    view.data.clear()
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
      style: getStyle(col),
      Cell: getCell(col.type),
    }))
    view.data.set("column", column)
  }

  const getStyle = (col: any) => {
    return col.type == "link" || col.type == "checkbox"
      ? { width: 30, maxWidth: 30 }
      : col.style
  }

  const getCell = (type: string) => (cell: any) => {
    switch (type) {
      case "link":
        return (
          <CellLink
            onPress={() => {
              view.app.goto(`${name}/${cell.value}`)
            }}
          />
        )
      case "checkbox":
        return <CellCheckbox value={cell.value} store={view} name="selection" />
      case "date":
        return date(cell.value)
      case "datetime":
        return datetime(cell.value)
      default:
        return cell.value
    }
  }

  return view
}

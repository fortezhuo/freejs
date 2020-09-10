import React, { useEffect } from "react"
import { CellLink, CellCheckbox, Cell } from "../../component/Table"
import { useStore } from "../../component/Store"
import { get } from "../../request"
import * as config from "./config"

export const useHook = () => {
  const { view } = useStore()
  const name = `${view?.app?.routerLocation}/`.split("/")[1]
  const isMobile = ["sm", "md"].indexOf(view?.app?.dimension.screen) >= 0

  useEffect(() => {
    view.title = (config as ObjectAny)[name].title
    view.data.clear()
    getButton(name)
    getColumn(name)
    getCollection(name)
  }, [view?.app?.routerLocation])

  const getButton = async (name: string) => {
    const list: ObjectAny = {
      new: {
        icon: "file-plus",
        type: "primary",
        children: "New",
        onPress: () => view.app?.goto(`${name}/new`),
        visible: view.app?.can("create", name),
      },
      delete: {
        icon: "trash-2",
        type: "danger",
        children: "Delete",
        onPress: () => view.app?.can("delete", name),
        visible: view.app?.can("delete", name),
      },
      filter: {
        icon: "search",
        type: "primary",
        children: "Filter",
        onPress: () => {
          const isFilter = view.temp.get("isFilter") || false
          view.temp.set("isFilter", !isFilter)
        },
        visible: !isMobile,
      },
    }

    const button = await (config as ObjectAny)[name].button
      .map((btn: string) => list[btn])
      .filter((btn: ObjectAny) => !!btn && btn.visible)

    view.data.set(`button_${isMobile ? "mobile" : "desktop"}`, button)
  }

  const getCollection = async (name: string) => {
    const res = await get(`/api/${name}`, {})
    view.data.set("collection", res.data.result)
  }

  // Desktop
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
      ? { width: 36, maxWidth: 36 }
      : col.style
  }

  const getCell = (type: string) => (cell: any) => {
    switch (type) {
      case "link":
        return (
          <CellLink
            style={(cell.column as any).style || {}}
            onPress={() => {
              view?.app?.goto(`${name}/${cell.value}`)
            }}
          />
        )
      case "checkbox":
        return (
          <CellCheckbox
            value={cell.value}
            store={view}
            name="selection"
            style={(cell.column as any).style || {}}
          />
        )
      case "date":
        return (
          <Cell style={(cell.column as any).style || {}} type="date">
            {cell.value}
          </Cell>
        )
      case "datetime":
        return (
          <Cell style={(cell.column as any).style || {}} type="datetime">
            {cell.value}
          </Cell>
        )
      default:
        return (
          <Cell style={(cell.column as any).style || {}}>{cell.value}</Cell>
        )
    }
  }

  return view
}

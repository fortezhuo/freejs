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
    view.setData({
      name,
      isMobile,
    })
    setButton(name)
    setColumn(name)
    setCollection(name)
  }, [view?.app?.routerLocation])

  useEffect(() => {
    view.setData({
      isMobile,
    })
    setButton(name)
    setColumn(name)
  }, [isMobile])

  const setButton = async (name: string) => {
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

  const setCollection = async (name: string) => {
    try {
      view.isLoading = true
      const res = await get(`/api/${name}`, {})
      view.data.set("collection", res.data.result)
    } finally {
      view.isLoading = false
    }
  }

  const setColumn = (name: string) => {
    let column = (config as ObjectAny)[name].column
    const label: any = {}
    if (isMobile) {
      column = column.filter((col: any) => col.isMobileVisible)
      column.forEach((col: any) => {
        if (col.name !== "_id") {
          label[col.type ? `${col.name}_${col.type}` : col.name] = col.label
        }
      })
    }

    column = column.map((col: ObjectAny) =>
      isMobile
        ? {
            id: col.type ? `${col.name}_${col.type}` : col.name,
            accessor: col.name,
          }
        : {
            id: col.type ? `${col.name}_${col.type}` : col.name,
            Header: col.label,
            accessor: col.name,
            style: col.style,
            Cell: getCell(col.type),
          }
    )
    view.data.set("column", column)
    view.data.set("label", label)
  }

  const getCell = (type: string) => (cell: any) => {
    switch (type) {
      case "link":
        return (
          <CellLink
            style={cell.column.style}
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
            style={cell.column.style}
          />
        )
      case "date":
        return (
          <Cell style={cell.column.style} type="date">
            {cell.value}
          </Cell>
        )
      case "datetime":
        return (
          <Cell style={cell.column.style} type="datetime">
            {cell.value}
          </Cell>
        )
      default:
        return <Cell style={cell.column.style}>{cell.value}</Cell>
    }
  }

  return { name, store: view, isMobile }
}

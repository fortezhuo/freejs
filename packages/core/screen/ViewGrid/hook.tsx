import React, { useEffect, useMemo } from "react"
import { useStore, TableCell, Text } from "../../component"
import { Checkbox } from "./Checkbox"
import { get } from "../../request"
import * as config from "./config"

export const useHook = () => {
  const { view } = useStore()
  const isMobile = view.app?.dimension.isMobile
  const name = `${view?.app?.routerLocation}/`.split("/")[1]
  const [search, page] = view.getData("search", "page")
  view.name = name
  view.title = (config as ObjectAny)[name].title
  view.search = (config as ObjectAny)[name].search

  useEffect(() => {
    view.setData({
      name,
      page: view.name !== "log" ? 1 : undefined,
      search: view.name !== "log" ? "" : undefined,
    })
    return () => {
      view.data.clear()
    }
  }, [view?.app?.routerLocation])

  useEffect(() => {
    ;(async () => {
      const allowFetch = page ? view.name !== "log" : view.name === "log"
      if (allowFetch) {
        await setCollection(name)
      }
    })()
  }, [page, search])

  useEffect(() => {
    view.setData({ isMobile })
  }, [isMobile])

  const setCollection = async (name: string) => {
    const params = view.name !== "log" ? { q: search, page } : {}
    try {
      view.set("isLoading", true)
      const { data } = await get(`/api/${name}`, params)
      view.setData({
        collection: data.result,
        limit: data.limit,
        total: data.total,
        max: data.max,
      })
    } finally {
      view.set("isLoading", false)
    }
  }

  return { store: view }
}

export const useActions = (store: any) => {
  const name = store.name
  const button = (config as ObjectAny)[name].button
  const isMobile = store?.app.dimension.isMobile
  return useMemo(() => {
    const list: any = {
      new: {
        icon: "file-plus",
        type: "primary_2_bg",
        children: "New",
        onPress: () => store.app?.goto(`${name}/new`),
        visible: store.app?.can("create", name),
      },
      delete: {
        icon: "trash-2",
        type: "danger_bg",
        children: "Delete",
        onPress: () => alert("Delete"),
        visible: store.app?.can("delete", name),
      },
      filter: {
        icon: "search",
        type: "primary_2_bg",
        children: "Filter",
        onPress: () => {
          const isFilter = store.temp.get("isFilter") || false
          store.temp.set("isFilter", !isFilter)
        },
        visible: !isMobile,
      },
    }

    return {
      actDelete: button.indexOf("delete") < 0 ? null : list.delete,
      actions: button
        .map((btn: string) => list[btn])
        .filter((btn: ObjectAny) => !!btn && btn.visible),
    }
  }, [name, isMobile])
}

export const useColumns = (store: any) => {
  const isMobile = store?.app.dimension.isMobile
  const name = store.name
  const columns = useMemo(() => {
    let column = (config as ObjectAny)[name].column
    if (isMobile) {
      column = column.filter((col: any) => col.isMobileVisible)
    }
    return column.map((col: ObjectAny) =>
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
            type: col.type,
          }
    )
  }, [isMobile, name])
  const keys = useMemo(() => {
    const key: any = {}
    if (isMobile) {
      ;(config as ObjectAny)[name].column
        .filter((col: any) => col.isMobileVisible)
        .forEach((col: any) => {
          if (col.name !== "_id") {
            key[col.type ? `${col.name}_${col.type}` : col.name] = {
              label: col.label,
              type: col.type,
            }
          }
        })
    }
    return key
  }, [isMobile, name])

  return { columns, keys }
}

export const useSelection = (hooks: any) => {
  return hooks.visibleColumns.push((columns: any) => [
    {
      id: "selection",
      type: "checkbox",
      style: { width: 36, maxWidth: 36, marginTop: 1 },
      Header: (header: any) => {
        return <Checkbox {...header.getToggleAllPageRowsSelectedProps()} />
      },
      Cell: (cell: any) => (
        <TableCell style={cell.column.style}>
          <Checkbox {...cell.row.getToggleRowSelectedProps()} />
        </TableCell>
      ),
    },
    ...columns,
  ])
}

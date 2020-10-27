import React, { useEffect, useMemo } from "react"
import { useStore, TableCell } from "../../component"
import { TableCheckbox } from "../../shared/ViewGrid/TableCheckbox"
import { get } from "../../request"

export const config = {
  title: "Trash Management",
  search: ["username", "fullname", "email"],
  button: ["new", "delete", "filter"],
  column: [
    {
      label: "",
      name: "_id",
      type: "link",
      path: "trash",
      style: { width: 36, maxWidth: 36, marginTop: 1 },
      isMobileVisible: true,
    },
    {
      label: "Data",
      name: "data",
      filter: true,
      search: ["data"],
      style: { width: 300 },
      isMobileVisible: true,
    },
    {
      label: "Deleted By",
      name: "_deletedBy",
      filter: true,
      search: ["_deletedBy"],
      style: { width: 150 },
      isMobileVisible: true,
    },
    {
      label: "Deleted At",
      name: "_deletedAt",
      filter: true,
      search: [],
      style: { width: 300 },
      isMobileVisible: true,
    },
  ],
}

export const useHook = () => {
  const { trash } = useStore()
  const isMobile = trash.app?.dimension.isMobile
  const name = `${trash?.app?.routerLocation}/`.split("/")[1]
  const [search, page, isFilter] = trash.getData("search", "page", "isFilter")
  trash.name = name
  trash.title = config.title
  trash.search = config.search

  useEffect(() => {
    trash.setData({
      name,
      page: trash.name !== "log" ? 1 : undefined,
      search: trash.name !== "log" ? "" : undefined,
    })
    return () => {
      trash.data.clear()
    }
  }, [trash?.app?.routerLocation])

  useEffect(() => {
    ;(async () => {
      const allowFetch = page ? trash.name !== "log" : trash.name === "log"
      if (allowFetch) {
        await setCollection(name)
      }
    })()
  }, [page, search])

  useEffect(() => {
    trash.setData({ isMobile })
  }, [isMobile])

  useEffect(() => {
    if (!isFilter) {
      trash.setData({
        search: undefined,
        page: 1,
      })
    }
  }, [isFilter])

  const setCollection = async (name: string) => {
    const params = trash.name !== "log" ? { q: search, page } : {}
    try {
      trash.set("isLoading", true)
      const { data } = await get(`/api/${name}`, params)
      trash.setData({
        collection: data.result,
        limit: data.limit,
        total: data.total,
        max: data.max,
      })
    } finally {
      trash.set("isLoading", false)
    }
  }

  return { store: trash }
}

export const useActions = (store: any) => {
  const name = store.name
  const button = config.button
  const isMobile = store?.app.dimension.isMobile
  const isSearch = store.data.get("isSearch") || false
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
        disabled: isSearch,
        onPress: () => {
          const isFilter = store.data.get("isFilter") || false
          store.setData({ isFilter: !isFilter })
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
  }, [name, isMobile, isSearch])
}

export const useColumns = (store: any) => {
  const isMobile = store?.app.dimension.isMobile
  const name = store.name
  const columns = useMemo(() => {
    let column = config.column
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
      config.column
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
        return <TableCheckbox {...header.getToggleAllPageRowsSelectedProps()} />
      },
      Cell: (cell: any) => (
        <TableCell style={cell.column.style}>
          <TableCheckbox {...cell.row.getToggleRowSelectedProps()} />
        </TableCell>
      ),
    },
    ...columns,
  ])
}

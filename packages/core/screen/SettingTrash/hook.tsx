import React, { useEffect, useMemo } from "react"
import { useStore, TableCell } from "../../component"
import { TableCheckbox } from "../../shared/ViewGrid/TableCheckbox"
import * as config from "../../shared/ViewGrid/config"
import { get } from "../../request"
import { useDialogCollection } from "./DialogCollection"

export const useHook = () => {
  const { trash } = useStore()
  const isMobile = trash.app?.dimension.isMobile
  const name = `${trash?.app?.routerLocation}/`.split("/")[2] || ""

  const [list, search, page, isFilter] = trash.getData(
    "list",
    "search",
    "page",
    "isFilter"
  )
  trash.name = name
  trash.search = name !== "" ? (config as ObjectAny)[name].search : []

  useEffect(() => {
    ;(async () => {
      setListCollection()
    })()
  }, [])

  useEffect(() => {
    trash.setData({
      name,
      page: 1,
      search: "",
    })
    return () => {
      trash.data.clear()
    }
  }, [trash?.app?.routerLocation])

  useEffect(() => {
    if (name !== "" && list) {
      ;(async () => {
        setCollection(name)
      })()
    }
  }, [name, list])

  useEffect(() => {
    trash.setData({ isMobile })
  }, [isMobile])

  /*


  useEffect(() => {
    if (!isFilter) {
      trash.setData({
        search: undefined,
        page: 1,
      })
    }
  }, [isFilter])
*/

  const setListCollection = async () => {
    try {
      trash.set("isLoading", true)
      const { data } = await get(`/api/trash`, {})
      trash.setData({
        list: data.result,
      })
    } finally {
      trash.set("isLoading", false)
    }
  }

  const setCollection = async (name: string) => {
    const params = { q: search, page }
    try {
      trash.set("isLoading", true)
      const { data } = await get(`/api/trash/${name}`, params)
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
  const { show, DialogCollection } = useDialogCollection(store)
  const isMobile = store?.app.dimension.isMobile
  const list = store.data.get("list")
  const isSearch = store.data.get("isSearch") || false
  return useMemo(() => {
    const list: any = [
      {
        icon: "layers",
        type: "primary_2_bg",
        children: "Collection",
        onPress: show,
        visible: true,
      },
      {
        icon: "trash-2",
        type: "danger_bg",
        children: "Delete",
        onPress: () => alert("Delete"),
        visible: true,
      },
      {
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
    ]

    return {
      actDelete: list[1],
      DialogCollection,
      actions: list.filter((btn: ObjectAny) => btn.visible),
    }
  }, [list])
}

export const useColumns = (store: any) => {
  const isMobile = store?.app.dimension.isMobile
  const name = store.data.get("name") || ""
  const columns = useMemo(() => {
    if (name === "") return []
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
    if (name === "") return []
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

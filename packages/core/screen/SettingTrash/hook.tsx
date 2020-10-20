import React, { useEffect, useMemo } from "react"
import { useStore, TableCell } from "../../component"
import { TableCheckbox } from "../../shared/TableCheckbox"
import { get } from "../../request"

export const useHook = () => {
  const { trash } = useStore()

  const isMobile = trash.app?.dimension.isMobile
  const name = `${trash?.app?.routerLocation}/`.split("/")[1]
  const [search, page, isFilter] = trash.getData("search", "page", "isFilter")
  trash.name = name

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

  const setListCollection = async (name: string) => {
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
  const isMobile = store?.app.dimension.isMobile
  const isSearch = store.data.get("isSearch") || false
  return useMemo(() => {
    const list: any = [
      {
        icon: "file-plus",
        type: "primary_2_bg",
        children: "Collection",
        onPress: () => store.app?.goto(`${name}/new`),
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
      actions: list
        .map((btn: string) => list[btn])
        .filter((btn: ObjectAny) => !!btn && btn.visible),
    }
  }, [name, isMobile, isSearch])
}

export const useColumns = (store: any) => {
  const isMobile = store?.app.dimension.isMobile
  const name = store.name
  const columns = {}
  const keys = {}

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

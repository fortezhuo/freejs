import React from "react"
import { useStore, TableCell } from "../../component"
import { TableCheckbox } from "../../shared/ViewGrid/TableCheckbox"
import { get } from "../../request"

export const useHook = () => {
  const { trash } = useStore()
  const isMobile = trash.app?.dimension.isMobile
  const [search, page, isFilter] = trash.getData("search", "page", "isFilter")

  React.useEffect(() => {
    trash.setData({
      page: undefined,
      search: undefined,
    })
    return () => {
      trash.data.clear()
    }
  }, [])

  React.useEffect(() => {
    ;(async () => {
      await setCollection(name)
    })()
  }, [page, search])

  React.useEffect(() => {
    trash.setData({ isMobile })
  }, [isMobile])

  React.useEffect(() => {
    if (!isFilter) {
      trash.setData({
        search: undefined,
        page: 1,
      })
    }
  }, [isFilter])

  const setCollection = async (name: string) => {
    const params = { q: search, page }
    try {
      trash.set("isLoading", true)
      const { data } = await get(`/api/trash`, params)
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
  const isMobile = store?.app.dimension.isMobile
  const isSearch = store.data.get("isSearch") || false
  return React.useMemo(
    () => [
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
    ],
    [isMobile, isSearch]
  )
}

export const useColumns = (store: any) => {
  const isMobile = store?.app.dimension.isMobile
  const _columns = React.useMemo(
    () => [
      {
        label: "Data",
        name: "data",
        filter: false,
        type: "json",
        search: ["$text"],
        style: { width: 300 },
        isMobileVisible: true,
      },
      {
        label: "Collection",
        name: "_deletedFrom",
        filter: true,
        search: ["_deletedFrom"],
        style: { width: 100 },
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
        type: "datetime",
        search: [],
        style: { width: 300 },
        isMobileVisible: true,
      },
    ],
    []
  )

  const columns = React.useMemo(
    () =>
      _columns
        .filter((col: any) => col.isMobileVisible)
        .map((col: ObjectAny) =>
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
        ),

    [isMobile]
  )

  const keys = React.useMemo(() => {
    const key: any = {}
    if (isMobile) {
      _columns
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
  }, [isMobile])

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

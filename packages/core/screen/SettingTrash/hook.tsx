import React from "react"
import { useStore, TableCell } from "../../component"
import { TableCheckbox } from "../../shared/ViewGrid/TableCheckbox"
import { get } from "../../request"

export const useTrash = () => {
  const { trash } = useStore()
  trash.modalData = React.useRef(null)
  const actions = React.useMemo(
    () => [
      {
        icon: "trash-2",
        type: "danger_bg",
        children: "Delete",
        onPress: () => alert("Delete"),
      },
      {
        icon: "search",
        type: "primary_2_bg",
        children: "Filter",
        onPress: () => {
          const isFilter = trash.data.get("isFilter") || false
          trash.setData({ isFilter: !isFilter })
        },
      },
    ],
    []
  )

  React.useEffect(() => {
    trash.setData({
      page: undefined,
      search: undefined,
    })
    return () => {
      trash.data.clear()
    }
  }, [])

  // While resize screen, loading true
  React.useEffect(() => {
    trash.set("isLoading", true)
    trash.setData({ isMobile: trash?.app?.dimension.isMobile })
    setTimeout(() => {
      trash.set("isLoading", false)
    }, 1000)
  }, [trash?.app?.dimension.isMobile])

  return { trash, actions }
}

export const useTableGrid = (store: any) => {
  const [search, page = 1, isFilter, isMobile] = store.getData(
    "search",
    "page",
    "isFilter",
    "isMobile"
  )

  const setCollection = React.useCallback(async () => {
    const params = { q: search, page }
    try {
      store.set("isUpdating", true)
      const { data } = await get(`/api/trash`, params)
      store.setData({
        collection: data.result,
        limit: data.limit,
        total: data.total,
        max: data.max,
      })
    } finally {
      store.set("isUpdating", false)
    }
  }, [])

  const _columns = React.useMemo(
    () => [
      {
        label: "Data",
        name: "data",
        filter: false,
        type: "json",
        search: ["$text"],
        style: { width: 100 },
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

    []
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
  }, [])

  // Collection
  React.useEffect(() => {
    ;(async () => {
      await setCollection()
    })()
  }, [page, search])

  React.useEffect(() => {
    if (!isFilter) {
      store.setData({
        search: undefined,
        page: 1,
      })
    }
  }, [isFilter])

  return { keys, columns }
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

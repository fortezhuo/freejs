import React from "react"
import { useFocusEffect } from "@react-navigation/native"
import { useStore, Table } from "../../component"
import { TableCheckbox } from "../../shared/ViewGrid/TableCheckbox"
import { get } from "../../request"

export const useTrash = () => {
  const { trash } = useStore()
  const isReady = !!trash.data.get("page")
  const columns = React.useMemo(
    () => [
      {
        label: "",
        name: "_id",
        filter: false,
        type: "json",
        search: ["$text"],
        style: { width: 30 },
      },
      {
        label: "Collection",
        name: "_deletedFrom",
        filter: true,
        search: ["_deletedFrom"],
        style: { width: 100 },
      },
      {
        label: "Deleted By",
        name: "_deletedBy",
        filter: true,
        search: ["_deletedBy"],
        style: { width: 150 },
      },
      {
        label: "Deleted At",
        name: "_deletedAt",
        filter: true,
        type: "datetime",
        search: [],
        style: { width: 300 },
      },
    ],
    []
  )
  const actions = React.useMemo(
    () => [
      {
        icon: "trash-2",
        type: "danger_bg",
        children: "Delete",
        onPress: () =>
          trash.app?.alert.error({
            title: "Confirmation",
            message: "Do you want to delete these document(s) ?",
            actions: [
              {
                label: "OK",
                type: "primary_1",
                onPress: () =>
                  trash.app?.alert.info({
                    title: "OK",
                    message: "Document Deleted ",
                    actions: [],
                  }),
              },
              {
                label: "Cancel",
                type: "danger",
                onPress: () => trash.app?.alert.close(),
              },
            ],
          }),
      },
      {
        icon: "rotate-ccw",
        type: "primary_2_bg",
        children: "Restore",
        onPress: () => {
          trash.app?.alert.confirm({
            title: "Confirmation",
            message: "Do you want to restore these document(s) ?",
            actions: [
              {
                label: "OK",
                type: "primary_1",
                onPress: () =>
                  trash.app?.alert.info({
                    title: "OK",
                    message: "OK Restored",
                    actions: [],
                  }),
              },
              {
                label: "Cancel",
                type: "danger",
                onPress: () => trash.app?.alert.close(),
              },
            ],
          })
        },
      },
      {
        icon: "search",
        type: "primary_2_bg",
        children: "Search",
        onPress: () => {
          trash.bottomSheet.open()
        },
      },
    ],
    []
  )
  const refActions: any = React.useRef(actions)
  const setCollection = React.useCallback(async () => {
    const [page, search] = trash.getData("page", "search")

    const params = { q: search, page, fields: "-data" }
    try {
      trash.set("isUpdating", true)
      const { data } = await get(`/api/trash`, params)
      trash.setData({
        collection: data.result,
        limit: data.limit,
        total: data.total,
        max: data.max,
      })
    } finally {
      trash.set("isUpdating", false)
    }
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (!isReady) {
        trash.setData({
          isMobile: trash?.app?.dimension.isMobile,
          page: 1,
          search: undefined,
        })
      }

      return () => {
        trash.data.clear()
      }
    }, [])
  )

  React.useEffect(() => {
    ;(async () => {
      if (isReady) {
        await setCollection()
      }
    })()
  }, [trash.data.get("page"), trash.data.get("search")])

  React.useEffect(() => {
    const isMobile = trash?.app?.dimension.isMobile
    const _isMobile = trash.data.get("isMobile")
    if (isReady && _isMobile !== isMobile) {
      trash.set("isLoading", true)
      trash.setData({ isMobile })

      setTimeout(() => {
        trash.set("isLoading", false)
      }, 1000)
    }
    refActions.current = actions.filter((action) =>
      isMobile ? action.children !== "Delete" : true
    )
  }, [trash?.app?.dimension.isMobile])

  return { trash, columns, actions, refActions }
}

export const useTableGrid = (store: any, _columns: any) => {
  const isMobile = store.app.dimension.isMobile
  const columns = React.useMemo(
    () =>
      _columns.map((col: ObjectAny) =>
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
      _columns.forEach((col: any) => {
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
        <Table.Cell style={cell.column.style}>
          <TableCheckbox {...cell.row.getToggleRowSelectedProps()} />
        </Table.Cell>
      ),
    },
    ...columns,
  ])
}

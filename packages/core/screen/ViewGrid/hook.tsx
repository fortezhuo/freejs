import React from "react"
import { useFocusEffect } from "@react-navigation/native"
import { useStore, Table } from "../../component"
import { TableCheckbox } from "../../shared/ViewGrid/TableCheckbox"
import { POST } from "../../request"

export const useView = () => {
  const { view } = useStore()
  const isReady = !!view.data.get("page")
  const config = React.useMemo(
    () => ({
      search: ["$text"],
      actions: [
        {
          icon: "trash-2",
          type: "danger_bg",
          children: "Delete",
          onPress: (params: any) =>
            view.app?.alert.error({
              title: "Confirmation",
              message: "Do you want to delete these document(s) ?",
              actions: [
                {
                  label: "OK",
                  type: "primary_1",
                  onPress: () =>
                    view.app?.alert.info({
                      title: "OK",
                      message: "Document Deleted ",
                      actions: [],
                    }),
                },
                {
                  label: "Cancel",
                  type: "danger",
                  onPress: () => view.app?.alert.close(),
                },
              ],
            }),
        },
        {
          icon: "search",
          type: "primary_2_bg",
          children: "Search",
          onPress: () => {
            view.bottomSheet.open()
          },
        },
      ],
      columns: [
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
          search: ["_deletedAt"],
          style: { width: 300 },
        },
      ],
    }),
    []
  )
  const refActions: any = React.useRef(config.actions)
  const setCollection = React.useCallback(async () => {
    const [page, search] = view.getData("page", "search")
    const _params = { query: search, page, fields: ["-data"] }
    try {
      view.set("isLoading", true)
      const { data } = await POST(`/api/view/all`, { _params })
      view.setData({
        collection: data.result,
        limit: data.limit,
        total: data.total,
        max: data.max,
      })
    } finally {
      view.set("isLoading", false)
    }
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (!isReady) {
        view.setData({
          isMobile: view?.app?.dimension.isMobile,
          page: 1,
          search: undefined,
        })
      }

      return () => {
        view.data.clear()
      }
    }, [])
  )

  React.useEffect(() => {
    ;(async () => {
      if (isReady) {
        await setCollection()
      }
    })()
  }, [view.data.get("page"), view.data.get("search")])

  React.useEffect(() => {
    const isMobile = view?.app?.dimension.isMobile
    const _isMobile = view.data.get("isMobile")
    if (isReady && _isMobile !== isMobile) {
      view.set("isUpdating", true)
      view.setData({ isMobile })
      setTimeout(() => {
        view.set("isUpdating", false)
      }, 1000)
    }
    refActions.current = config.actions.filter((action) =>
      isMobile
        ? action.children !== "Delete" && action.children !== "Restore"
        : true
    )
  }, [view?.app?.dimension.isMobile])

  return { view, config, refActions }
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

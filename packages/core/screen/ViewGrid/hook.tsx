import React from "react"
import { useFocusEffect, useRoute } from "@react-navigation/native"
import { useStore, Table } from "../../component"
import * as listConfig from "./config"
import { TableCheckbox } from "../../shared/ViewGrid/TableCheckbox"
import { POST } from "../../request"

export const useActions = () => {}

export const useView = () => {
  const route = useRoute()
  const { view } = useStore()
  const isReady = `View${view.data.get("name")}` === route.name

  useFocusEffect(
    React.useCallback(() => {
      if (!isReady) {
        view.set("isUpdating", true)
        view.setData({
          name: route.name.replace("View", ""),
          isMobile: view?.app?.dimension.isMobile,
          page: 1,
          search: undefined,
        })
        setTimeout(() => {
          view.set("isUpdating", false)
        }, 300)
      }
    }, [])
  )

  const config = React.useMemo(() => {
    if (!isReady) {
      return {
        search: [],
        actions: [],
        columns: [],
      }
    }
    const name: string = view.data.get("name")
    const selected = (listConfig as any)[name]

    return {
      name: selected.name,
      search: selected.search,
      columns: selected.columns,
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
    }
  }, [isReady])

  const refActions: any = React.useRef(config.actions)
  const setCollection = React.useCallback(async () => {
    if (isReady) {
      const [page, search] = view.getData("page", "search")
      const _params = { query: search, page, fields: ["-data"] }
      try {
        view.set("isLoading", true)
        const { data } = await POST(`/api/${config.name}/all`, { _params })
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
  }, [isReady])

  React.useEffect(() => {
    const isMobile = view?.app?.dimension.isMobile
    const _isMobile = view.data.get("isMobile")
    if (isReady) {
      if (_isMobile !== isMobile) {
        view.set("isUpdating", true)
        view.setData({ isMobile })
        setTimeout(() => {
          view.set("isUpdating", false)
        }, 300)
      }
      refActions.current = config.actions.filter((action) =>
        isMobile ? action.children !== "Delete" : true
      )
    }
  }, [view?.app?.dimension.isMobile, isReady])

  React.useEffect(() => {
    ;(async () => {
      if (isReady) {
        await setCollection()
      }
    })()
  }, [view.data.get("page"), view.data.get("search"), isReady])

  return { view, config, refActions }
}

export const useTableGrid = (store: any, _columns: any) => {
  const route = useRoute()
  const isReady = `View${store.data.get("name")}` === route.name

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

    [isReady]
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
  }, [isReady])

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

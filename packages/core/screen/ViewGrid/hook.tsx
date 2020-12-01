import React from "react"
import { useFocusEffect, useRoute } from "@react-navigation/native"
import { useStore, Table } from "../../component"
import * as listConfig from "./config"
import * as action from "./action"
import { TableCheckbox } from "../../shared/ViewGrid/TableCheckbox"
import { POST } from "../../request"

export const useView = () => {
  const { view } = useStore()
  const navRoute = useRoute()
  const isReady = view.data.get("route") === navRoute.name

  const actions = React.useMemo(() => {
    return [
      action.addNew(view),
      action.addDelete(view),
      action.addRestore(view),
      action.addSearch(view),
    ]
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (!isReady) {
        view.set("isUpdating", true)
        const [page = 1, search] = view.getTemp("page", "search")
        const routeName = navRoute.name
        const selected = (listConfig as any)[routeName]
        view.setData({
          page,
          search,
          route: routeName,
          name: selected.name,
          fields: selected.fields,
          isMobile: view?.app?.dimension.isMobile,
          collection: undefined,
          selected: undefined,
          isRefresh: undefined,
        })
        view.temp.clear()
        setTimeout(() => {
          view.set("isUpdating", false)
        }, 1000)
      }

      return () => {
        if (navRoute.name === view.data.get("route")) {
          const [page, search] = view.getData("page", "search")
          view.setData({ route: "OpenChild" })
          view.setTemp({ page, search })
        }
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
    const route = view.data.get("route")
    const selected = (listConfig as any)[route]

    return {
      search: selected.search,
      columns: selected.columns,
      actions: actions.filter(
        (action: any) => selected.actions.indexOf(action.children) >= 0
      ),
    }
  }, [isReady])

  const refActions: any = React.useRef(config.actions)
  const setCollection = React.useCallback(async () => {
    if (isReady) {
      const [name, fields, page, search] = view.getData(
        "name",
        "fields",
        "page",
        "search"
      )
      const _params = { query: search, page, fields }
      try {
        view.set("isLoading", true)
        const { data } = await POST(`/api/${name}/all`, { _params })
        view.setData({
          collection: data.result,
          limit: data.limit,
          total: data.total,
          max: data.max,
          isRefresh: undefined,
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
        }, 1000)
      }
      refActions.current = config.actions.filter((action: any) =>
        isMobile
          ? action.children !== "Delete" && action.children !== "Restore"
          : true
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

  React.useEffect(() => {
    ;(async () => {
      if (!!view.data.get("isRefresh")) {
        await setCollection()
      }
    })()
  }, [view.data.get("isRefresh")])

  return { view, config, refActions }
}

export const useTableGrid = (store: any, _columns: any) => {
  const route = useRoute()
  const isReady = `View${store.data.get("route")}` === route.name

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

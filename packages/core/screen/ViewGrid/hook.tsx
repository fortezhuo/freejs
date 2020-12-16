import React from "react"
import {
  useFocusEffect,
  useRoute,
  useNavigation,
} from "@react-navigation/native"
import { Table } from "../../component"
import * as listConfig from "./config"
import { TableCheckbox } from "../../shared/ViewGrid/TableCheckbox"
import { POST } from "../../request"
import { useView } from "../../state/view"
import { useApp } from "../../state/app"

const validateNotEmpty = (store: any, id: string = "") =>
  new Promise((resolve) => {
    const selected = store.data.get("selected") || []
    if (selected.length == 0 && id === "") {
      store.app?.alert.error({
        title: "Attention",
        message: "No document selected",
        actions: [
          {
            label: "OK",
            type: "danger",
            onPress: () => store.app?.alert.close(),
          },
        ],
      })
    } else {
      resolve(true)
    }
  })

const useAction = () => {
  const { refAlert } = useApp()
  const { data, setData } = useView()
  const navigation = useNavigation()

  return React.useMemo(() => {
    const NEW = {
      icon: "file",
      type: "primary_2_bg",
      children: "New",
      onPress: async () => {
        const route = data.route.replace("View", "")
        navigation.navigate(route, { id: "new" })
      },
    }

    const DELETE = {
      icon: "trash-2",
      type: "danger_bg",
      children: "Delete",
      onPress: async ({ id }: any) => {
        if (await validateNotEmpty(null, id)) {
          refAlert.current.confirm({
            title: "Confirmation",
            message: "Do you want to delete these document(s) ?",
            actions: [
              {
                label: "OK",
                type: "primary_1",
                onPress: async () => {
                  //                  await view.deleteDocument(id)
                  refAlert.current.close()
                },
              },
              {
                label: "Cancel",
                type: "danger",
                onPress: () => refAlert.current.close(),
              },
            ],
          })
        }
      },
    }

    const RESTORE = {
      icon: "rotate-ccw",
      type: "primary_2_bg",
      children: "Restore",
      onPress: async ({ id }: any) => {
        if (await validateNotEmpty(null, id)) {
          refAlert.current.confirm({
            title: "Confirmation",
            message: "Do you want to restore these document(s) ?",
            actions: [
              {
                label: "OK",
                type: "primary_1",
                onPress: async () => {
                  //                  await view.restoreDocument(id)
                  refAlert.current.close()
                },
              },
              {
                label: "Cancel",
                type: "danger",
                onPress: () => refAlert.current.close(),
              },
            ],
          })
        }
      },
    }
    const SEARCH = {
      icon: "search",
      type: "primary_2_bg",
      children: "Search",
      onPress: () => {
        //        view.bottomSheet.open()
      },
      onClear: () => {
        setData({ search: undefined })
      },
    }

    return [NEW, DELETE, RESTORE, SEARCH]
  }, [])
}

export const useViewGrid = () => {
  const app = useApp()
  const { data, setData, temp, setTemp } = useView()
  const navRoute = useRoute()
  const actions = useAction()
  const isReady = data.route === navRoute.name

  useFocusEffect(
    React.useCallback(() => {
      if (!isReady) {
        setTemp({ isUpdating: true })
        const routeName = navRoute.name
        let { page = 1, search, limit = "30", last } = temp

        // Reset
        if (last !== routeName) {
          page = 1
          limit = "30"
          search = undefined
        }

        const selected = (listConfig as any)[routeName]
        setData({
          page,
          search,
          limit,
          route: routeName,
          name: selected.name,
          fields: selected.fields,
          isMobile: app.data.isMobile,
          collection: undefined,
          selected: undefined,
          isRefresh: undefined,
        })
        setTimeout(() => {
          setTemp({ __isReset: true, isUpdating: false })
        }, 100)
      }

      return () => {
        if (navRoute.name === data.route) {
          const { page, search, limit, route } = data

          setData({ route: undefined })
          setTemp({ page, search, limit, last: route })
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
        keys: [],
      }
    }
    const { route } = data
    const selected = (listConfig as any)[route]
    const keys: any = {}
    selected.columns.forEach((col: any) => {
      if (col.type !== "link") {
        keys[col.type ? `${col.name}_${col.type}` : col.name] = {
          name: col.name,
          label: col.label,
          type: col.type,
        }
      }
    })

    return {
      search: selected.search,
      columns: selected.columns.map((col: ObjectAny) => ({
        id: col.type ? `${col.name}_${col.type}` : col.name,
        Header: col.label,
        accessor: col.name,
        style: col.style,
        type: col.type,
      })),
      keys,
      //      actions: actions.filter(
      //        (action: any) => selected.actions.indexOf(action.children) >= 0
      //      ),
    }
  }, [isReady])

  const refActions: any = React.useRef(config.actions)
  const setCollection = React.useCallback(async () => {
    if (isReady) {
      const { name, fields, page, limit, search } = data
      const _params = { query: search, page, limit: +limit, fields }
      try {
        setTemp({ isLoading: true })
        const res = await POST(`/api/find/${name}`, { _params })
        setData({
          collection: res.data.result,
          total: res.data.total,
          max: res.data.max,
          isRefresh: undefined,
        })
      } finally {
        setTemp({ isLoading: false })
      }
    }
  }, [isReady])

  React.useEffect(() => {
    //    const isMobile = view?.app?.dimension.isMobile
    const isMobile = false
    const _isMobile = data.isMobile
    if (isReady) {
      if (_isMobile !== isMobile) {
        setTemp({ isUpdating: true })
        setData({ isMobile })
        setTimeout(() => {
          setTemp({ isUpdating: false })
        }, 100)
      }
      /*
      refActions.current = config.actions.filter((action: any) =>
        isMobile
          ? action.children !== "Delete" && action.children !== "Restore"
          : true
      )
      */
    }
  }, [/*view?.app?.dimension.isMobile, */ isReady])

  React.useEffect(() => {
    ;(async () => {
      if (isReady) {
        await setCollection()
      }
    })()
  }, [data.page, data.search, data.limit, isReady])

  React.useEffect(() => {
    ;(async () => {
      if (!!data.isRefresh) {
        await setCollection()
      }
    })()
  }, [data.isRefresh])

  return { data, setData, temp, setTemp, config, refActions }
}

/*
const validateNotEmpty = (store: any, id: string = "") =>
  new Promise((resolve) => {
    const selected = store.data.get("selected") || []
    if (selected.length == 0 && id === "") {
      store.app?.alert.error({
        title: "Attention",
        message: "No document selected",
        actions: [
          {
            label: "OK",
            type: "danger",
            onPress: () => store.app?.alert.close(),
          },
        ],
      })
    } else {
      resolve(true)
    }
  })

const useAction = (view: any) => {
  const navigation = useNavigation()

  return useMemo(() => {
    const NEW = {
      icon: "file",
      type: "primary_2_bg",
      children: "New",
      onPress: async () => {
        const route = view.data.get("route").replace("View", "")
        navigation.navigate(route, { id: "new" })
      },
    }

    const DELETE = {
      icon: "trash-2",
      type: "danger_bg",
      children: "Delete",
      onPress: async ({ id }: any) => {
        if (await validateNotEmpty(view, id)) {
          view.app?.alert.confirm({
            title: "Confirmation",
            message: "Do you want to delete these document(s) ?",
            actions: [
              {
                label: "OK",
                type: "primary_1",
                onPress: async () => {
                  await view.deleteDocument(id)
                  view.app?.alert.close()
                },
              },
              {
                label: "Cancel",
                type: "danger",
                onPress: () => view.app?.alert.close(),
              },
            ],
          })
        }
      },
    }

    const RESTORE = {
      icon: "rotate-ccw",
      type: "primary_2_bg",
      children: "Restore",
      onPress: async ({ id }: any) => {
        if (await validateNotEmpty(view, id)) {
          view.app?.alert.confirm({
            title: "Confirmation",
            message: "Do you want to restore these document(s) ?",
            actions: [
              {
                label: "OK",
                type: "primary_1",
                onPress: async () => {
                  await view.restoreDocument(id)
                  view.app?.alert.close()
                },
              },
              {
                label: "Cancel",
                type: "danger",
                onPress: () => view.app?.alert.close(),
              },
            ],
          })
        }
      },
    }
    const SEARCH = {
      icon: "search",
      type: "primary_2_bg",
      children: "Search",
      onPress: () => {
        view.bottomSheet.open()
      },
      onClear: () => {
        view.setData({ search: undefined })
      },
    }

    return [NEW, DELETE, RESTORE, SEARCH]
  }, [])
}

export const useView = () => {
  const navRoute = useRoute()
  const actions = useAction(view)
  const isReady = view.data.get("route") === navRoute.name

  useFocusEffect(
    React.useCallback(() => {
      if (!isReady) {
        view.set("isUpdating", true)
        const routeName = navRoute.name
        let [page = 1, search, limit = "30", last] = view.getTemp(
          "page",
          "search",
          "limit",
          "last"
        )

        // Reset
        if (last !== routeName) {
          page = 1
          limit = "30"
          search = undefined
        }

        const selected = (listConfig as any)[routeName]
        view.clearError()
        view.setData({
          page,
          search,
          limit,
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
        }, 100)
      }

      return () => {
        if (navRoute.name === view.data.get("route")) {
          const [page, search, limit, route] = view.getData(
            "page",
            "search",
            "limit",
            "route"
          )
          view.setData({ route: undefined })
          view.setTemp({ page, search, limit, last: route })
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
        keys: [],
      }
    }
    const route = view.data.get("route")
    const selected = (listConfig as any)[route]
    const keys: any = {}
    selected.columns.forEach((col: any) => {
      if (col.type !== "link") {
        keys[col.type ? `${col.name}_${col.type}` : col.name] = {
          name: col.name,
          label: col.label,
          type: col.type,
        }
      }
    })

    return {
      search: selected.search,
      columns: selected.columns.map((col: ObjectAny) => ({
        id: col.type ? `${col.name}_${col.type}` : col.name,
        Header: col.label,
        accessor: col.name,
        style: col.style,
        type: col.type,
      })),
      keys,
      actions: actions.filter(
        (action: any) => selected.actions.indexOf(action.children) >= 0
      ),
    }
  }, [isReady])

  const refActions: any = React.useRef(config.actions)
  const setCollection = React.useCallback(async () => {
    if (isReady) {
      const [name, fields, page, limit, search] = view.getData(
        "name",
        "fields",
        "page",
        "limit",
        "search"
      )
      const _params = { query: search, page, limit: +limit, fields }
      try {
        view.set("isLoading", true)
        const { data } = await POST(`/api/find/${name}`, { _params })
        view.setData({
          collection: data.result,
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
        }, 100)
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
  }, [
    view.data.get("page"),
    view.data.get("search"),
    view.data.get("limit"),
    isReady,
  ])

  React.useEffect(() => {
    ;(async () => {
      if (!!view.data.get("isRefresh")) {
        await setCollection()
      }
    })()
  }, [view.data.get("isRefresh")])

  return { view, config, refActions }
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

*/

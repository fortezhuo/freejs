import React from "react"
import { useDefaultState, createContext } from "./hook"
import * as req from "../request"
import * as listConfig from "../../core/screen/ViewGrid/config"
import { useApp } from "./app"
import { Modalize } from "react-native-modalize"
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native"

const validateNotEmpty = ({ selected, id, refAlert }: any) =>
  new Promise((resolve) => {
    if (selected.length == 0 && id === "") {
      refAlert.current.error({
        title: "Attention",
        message: "No document selected",
        actions: [
          {
            label: "OK",
            type: "danger",
            onPress: () => refAlert.current.close(),
          },
        ],
      })
    } else {
      resolve(true)
    }
  })

const useHook = () => {
  const { refAlert, ...app } = useApp()

  const refBottomSheet = React.useRef<Modalize>(null)
  const navigation = useNavigation()
  const navRoute = useRoute()
  const view = useDefaultState({})
  const isReady = view.data.route === navRoute.name
  const actions = React.useMemo(() => {
    const NEW = {
      icon: "file",
      type: "primary_2_bg",
      children: "New",
      onPress: async () => {
        const route = view.data.route.replace("View", "")
        navigation.navigate(route, { id: "new" })
      },
    }

    const DELETE = {
      icon: "trash-2",
      type: "danger_bg",
      children: "Delete",
      onPress: async ({ id }: any) => {
        if (
          await validateNotEmpty({ selected: view.data.selected, id, refAlert })
        ) {
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
        if (
          await validateNotEmpty({ selected: view.data.selected, id, refAlert })
        ) {
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
        refBottomSheet.current?.open()
      },
      onClear: () => {
        view.setData({ search: undefined })
      },
    }

    return [NEW, DELETE, RESTORE, SEARCH]
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (!isReady) {
        view.setTemp({ isUpdating: true })
        const routeName = navRoute.name
        let { page = 1, search, limit = "30", last } = view.temp

        // Reset
        if (last !== routeName) {
          page = 1
          limit = "30"
          search = undefined
        }

        const selected = (listConfig as any)[routeName]
        view.setData({
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
          view.setTemp({ __isReset: true, isUpdating: false })
        }, 100)
      }

      return () => {
        if (navRoute.name === view.data.route) {
          const { page, search, limit, route } = view.data
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
    const { route } = view.data
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
      const { name, fields, page, limit, search } = view.data
      const _params = { query: search, page, limit: +limit, fields }
      try {
        view.setTemp({ isLoading: true })
        const res = await req.POST(`/api/find/${name}`, { _params })
        view.setData({
          collection: res.data.result,
          total: res.data.total,
          max: res.data.max,
          isRefresh: undefined,
        })
      } finally {
        view.setTemp({ isLoading: false })
      }
    }
  }, [isReady])

  React.useEffect(() => {
    const isMobile = app.temp.isMobile
    const _isMobile = view.data.isMobile
    if (isReady) {
      if (_isMobile !== isMobile) {
        view.setTemp({ isUpdating: true })
        view.setData({ isMobile })
        setTimeout(() => {
          view.setTemp({ isUpdating: false })
        }, 100)
      }
      refActions.current = config.actions.filter((action: any) =>
        isMobile
          ? action.children !== "Delete" && action.children !== "Restore"
          : true
      )
    }
  }, [app.temp.isMobile, isReady])

  React.useEffect(() => {
    ;(async () => {
      if (isReady) {
        await setCollection()
      }
    })()
  }, [view.data.page, view.data.search, view.data.limit, isReady])

  React.useEffect(() => {
    ;(async () => {
      if (!!view.data.isRefresh) {
        await setCollection()
      }
    })()
  }, [view.data.isRefresh])

  return { ...view, refBottomSheet, refActions }
}

export const [withView, useView] = createContext("View", {}, useHook)

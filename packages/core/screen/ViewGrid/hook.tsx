import React from "react"
import { useDefaultState, createContext, useApp } from "../../state"
import * as listConfig from "./config"
import { POST, DELETE } from "../../request"
import { Table } from "../../component"
import {
  CellText,
  CellDownload,
  CellLink,
  CellJSON,
} from "../../component/Table/Cell"
import { download } from "./helper"
import { formatDate, formatDateTime } from "../../util"
import { Modalize } from "react-native-modalize"

import { TableCheckbox } from "../../shared/ViewGrid/TableCheckbox"
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native"

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

export const useDefaultColumn = () => {
  const { refBottomSheet, ...view } = useView()
  const { keys, isMobile, config, route } = view.data

  const onOpenJSON = React.useCallback(
    (id) => {
      ;(async () => {
        await view.loadData(id)
      })()

      refBottomSheet.current.open()
    },
    [config.name]
  )

  return {
    Cell: (cell: any) => {
      const name = cell?.column?.id || undefined
      const prefix =
        isMobile &&
        name.indexOf("name_download_log") < 0 &&
        name.indexOf("_id") < 0
          ? `${keys[name].label} : `
          : ""

      switch (cell.column.type) {
        case "link":
          return (
            <CellLink
              name={route.replace("View", "")}
              params={{ id: cell.value }}
              style={cell.column.style}
            />
          )
        case "download_log":
          return (
            <CellDownload
              style={cell.column.style}
              onPress={() => {
                download(`/api/${config.name}`, cell.value)
              }}
            />
          )
        case "date":
          return (
            <CellText isMobile={isMobile} style={cell.column.style}>
              {prefix + formatDate(cell.value)}
            </CellText>
          )
        case "datetime":
          return (
            <CellText isMobile={isMobile} style={cell.column.style}>
              {prefix + formatDateTime(cell.value)}
            </CellText>
          )
        case "json":
          return (
            <CellJSON
              style={cell.column.style}
              onPress={() => onOpenJSON(cell.value)}
            />
          )
        default:
          return (
            <CellText isMobile={isMobile} style={cell.column.style}>
              {prefix + cell.value}
            </CellText>
          )
      }
    },
  }
}

const validateNotEmpty = ({ selected, id, refAlert }: any) =>
  new Promise((resolve) => {
    if (selected.length == 0 && !id) {
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

export const useActions = (refBottomSheet: any) => {
  const view = useView()
  const {
    data: { config, route, selected = [] },
  } = view
  const { refAlert, ...app } = useApp()
  const refActions = React.useRef<any>([])
  const navigation = useNavigation()
  const actions = React.useMemo(() => {
    if (!config?.name) return []

    const NEW = {
      icon: "file",
      type: "primary_2_bg",
      children: "New",
      onPress: async () => {
        navigation.navigate(route.replace("View", ""), { id: "new" })
      },
    }

    const DELETE = {
      icon: "trash-2",
      type: "danger_bg",
      children: "Delete",
      onPress: async ({ id }: any) => {
        if (await validateNotEmpty({ selected, id, refAlert })) {
          refAlert.current.confirm({
            title: "Confirmation",
            message: "Do you want to delete these document(s) ?",
            actions: [
              {
                label: "OK",
                type: "primary_1",
                onPress: async () => {
                  await view.deleteDocument(id)
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
        if (await validateNotEmpty({ selected, id, refAlert })) {
          refAlert.current.confirm({
            title: "Confirmation",
            message: "Do you want to restore these document(s) ?",
            actions: [
              {
                label: "OK",
                type: "primary_1",
                onPress: async () => {
                  await view.restoreDocument(id)
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
  }, [config?.name])

  React.useEffect(() => {
    if (config?.name) {
      const isMobile = app.temp.isMobile
      /*
      const _isMobile = view.data.isMobile
      if (_isMobile !== isMobile) {
        view.setTemp({ isUpdating: true })
        view.setData({ isMobile })
        setTimeout(() => {
          view.setTemp({ isUpdating: false })
        }, 100)
      }
      */
      view.setData({ isMobile })
      refActions.current = actions.filter(
        (action: any) =>
          config?.actions.indexOf(action.children) >= 0 &&
          (isMobile
            ? action.children !== "Delete" && action.children !== "Restore"
            : true)
      )
    }
  }, [app.temp.isMobile, config?.name])

  return refActions.current
}

export const useColumns = () => {
  const view = useView()
  const { config } = view.data

  return React.useMemo(
    () =>
      config.columns.map((col: ObjectAny) => ({
        id: col.type ? `${col.name}_${col.type}` : col.name,
        Header: col.label,
        accessor: col.name,
        style: col.style,
        type: col.type,
      })),
    [config.name]
  )
}

const useHook = () => {
  const { refAlert, ...app } = useApp()
  const refBottomSheet = React.useRef<Modalize>(null)
  const navRoute = useRoute()
  const view = useDefaultState({})
  const isReady = view.data.route === navRoute.name

  useFocusEffect(
    React.useCallback(() => {
      if (!isReady) {
        view.setTemp({ isUpdating: true })
        const routeName = navRoute.name
        const selected = (listConfig as any)[routeName]
        let keys: any = {}
        let { page = 1, search, limit = "30", last } = view.temp

        // Reset
        if (last !== routeName) {
          page = 1
          limit = "30"
          search = undefined
        }

        selected.columns.forEach((col: any) => {
          if (col.type !== "link") {
            keys[col.type ? `${col.name}_${col.type}` : col.name] = {
              name: col.name,
              label: col.label,
              type: col.type,
            }
          }
        })

        view.setData({
          config: { ...selected, keys },
          page,
          search,
          limit,
          route: routeName,
          isMobile: app.data.isMobile,
          collection: undefined,
          selected: undefined,
          isRefresh: undefined,
        })
        setTimeout(() => {
          view.setTemp({
            __isReset: true,
            height: app.temp.height - 144,
            isUpdating: false,
          })
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

  const setCollection = React.useCallback(async () => {
    if (isReady) {
      const { config, page, limit, search } = view.data
      const _params = {
        query: search,
        page,
        limit: +limit,
        fields: config.fields,
      }
      try {
        view.setTemp({ isLoading: true })
        const res = await POST(`/api/find/${config.name}`, { _params })
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

  const loadData = React.useCallback(async (id: string) => {
    const { name } = view.data
    if (id.length === 24) {
      try {
        view.setTemp({ isLoading: true })
        const res = await POST(`/api/find/${name}/${id}`, {})
        view.setTemp({ value: res.data.result.data })
      } catch (err) {
        view.setError(err)
      } finally {
        view.setTemp({ isLoading: false })
      }
    }
  }, [])

  const deleteDocument = React.useCallback(async (id: string) => {
    const { name, selected } = view.data
    const selectedIds = id ? [id] : selected || []

    if (selectedIds.length != 0) {
      const _params = { query: { _id: { $in: selectedIds } } }
      try {
        view.setTemp({ isLoading: true })
        return await DELETE(`/api/${name}`, { _params })
      } catch (err) {
        view.setError(err)
      } finally {
        view.setTemp({ isLoading: false })
        view.setData({ isRefresh: true, selected: undefined, page: 1 })
      }
    }
  }, [])

  const restoreDocument = React.useCallback(async (id: string) => {
    const { name, selected } = view.data
    const selectedIds = id ? [id] : selected

    if (selectedIds.length != 0) {
      const _params = { query: { _id: { $in: selectedIds } } }
      try {
        view.setTemp({ isLoading: true })
        return await POST(`/api/${name}/restore`, { _params })
      } catch (err) {
        view.setError(err)
      } finally {
        view.setTemp({ isLoading: false })
        view.setData({ isRefresh: true, selected: undefined, page: 1 })
      }
    }
  }, [])

  return { ...view, restoreDocument, loadData, deleteDocument, refBottomSheet }
}

export const [withView, useView] = createContext("View", {}, useHook)

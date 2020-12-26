import React from "react"
import { useDefaultState, createContext, useApp } from "../../state"
import * as listConfig from "./config"
import { POST, DELETE } from "../../request"
import { Table } from "../../component"
import { CellText, CellLink, CellPressable } from "../../component/Table/Cell"
import { download } from "./helper"
import { formatDate, formatDateTime } from "../../util"
import { Modalize } from "react-native-modalize"

import { TableCheckbox } from "./TableCheckbox"
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
  const { refSelected, ...view } = useView()
  const {
    data: { config, route },
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
        const selected = refSelected.current
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
        const selected = refSelected.current

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
      const _isMobile = view.data.isMobile
      if (_isMobile !== isMobile) {
        view.setTemp({ isUpdating: true })
        view.setData({ isMobile })
        setTimeout(() => {
          view.setTemp({ isUpdating: false })
        }, 100)
      }

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
  const { refBottomSheet, ...view } = useView()
  const { keys, isMobile, config, route } = view.data

  const onOpenJSON = React.useCallback(
    (id) => {
      ;(async () => {
        try {
          await view.loadData(id)
        } finally {
          refBottomSheet.current.open()
        }
      })()
    },
    [config.name]
  )

  return React.useMemo(
    () =>
      config.columns.map((col: ObjectAny) => ({
        id: col.type ? `${col.name}_${col.type}` : col.name,
        Header: col.label,
        accessor: col.name,
        style: col.style,
        Cell: (cell: any) => {
          const name = cell?.column?.id || undefined
          const prefix =
            isMobile &&
            name.indexOf("name_download_log") < 0 &&
            name.indexOf("_id") < 0
              ? `${keys[name].label} : `
              : ""

          switch (col.type) {
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
                <CellPressable
                  icon="download"
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
                <CellPressable
                  icon="search"
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
      })),
    [config.name]
  )
}

const useHook = () => {
  const view = useDefaultState({})
  const navRoute = useRoute()
  const routeName = navRoute.name
  const { refAlert, ...app } = useApp()
  const refSelected = React.useRef([])
  const refBottomSheet = React.useRef<Modalize>(null)

  React.useEffect(() => {
    view.setTemp({ height: app.temp.height - 144 })
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      const selected = (listConfig as any)[routeName]
      let keys: any = {}
      let { page = 1, search, limit = "30", last } = view.temp

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
        isRefresh: undefined,
      })

      return () => {
        const { page, search, limit, route } = view.data
        view.setTemp({ page, search, limit, last: route })
        view.setData({ config: undefined })
      }
    }, [])
  )

  const setCollection = React.useCallback(async () => {
    const { config, page, limit, search } = view.data
    if (config?.name) {
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
  }, [
    view.data?.config?.name,
    view.data?.limit,
    view.data?.page,
    view.data?.search,
  ])

  React.useEffect(() => {
    ;(async () => {
      await setCollection()
    })()
  }, [
    view.data.page,
    view.data.search,
    view.data.limit,
    view.data?.config?.name,
  ])

  React.useEffect(() => {
    ;(async () => {
      if (!!view.data.isRefresh) {
        await setCollection()
      }
    })()
  }, [view.data.isRefresh])

  const loadData = React.useCallback(
    async (id: string) => {
      const { name } = view.data?.config
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
    },
    [view.data?.config?.name]
  )

  const deleteDocument = React.useCallback(
    async (id: string) => {
      const { name } = view.data?.config
      const selectedIds = id ? [id] : refSelected.current || []

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
    },
    [view.data?.config?.name]
  )

  const restoreDocument = React.useCallback(
    async (id: string) => {
      const { name } = view.data?.config
      const selectedIds = id ? [id] : refSelected.current || []

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
    },
    [view.data?.config?.name]
  )

  return {
    ...view,
    restoreDocument,
    loadData,
    deleteDocument,
    refBottomSheet,
    refSelected,
  }
}

export const [withView, useView] = createContext("View", {}, useHook)
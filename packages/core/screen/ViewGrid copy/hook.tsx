import React from "react"
import { useState, createContext, useApp } from "../../state"
import * as listConfig from "./config"
import { POST, DELETE } from "../../request"
import { Table } from "../../component"
import { CellText, CellLink, CellPressable } from "../../component/Table/Cell"
import { download } from "./helper"
import {
  formatDate,
  formatDateTime,
  formatString,
  formatNumber,
  formatDecimal,
} from "../../util"
import { Modalize } from "react-native-modalize"
import { random } from "../../util"

import { TableCheckbox } from "./TableCheckbox"
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native"

const useAlert = () => {
  const app = useApp()
  const navigation = useNavigation()
  const handleError = React.useCallback((err: any) => {
    const { data, status } = err
    const { message, stack } = data || {}

    if (status === 403) {
      app.refAlert.current.error({
        title: "Attention",
        message,
        actions: [
          {
            label: "OK",
            type: "danger",
            onPress: () => {
              app.refAlert.current.close()
              if (message.indexOf("Insufficient") >= 0) {
                navigation.navigate("Index")
              }
            },
          },
        ],
      })
    }

    // Error 500
    if (status === 500) {
      app.setError({ message, stack })
    }
  }, [])

  return { ...app, handleError }
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
  const refActions = React.useRef<JSONObject[]>([])
  const refSwipeActions = React.useRef<JSONObject[]>([])
  const navigation = useNavigation()
  const actions = React.useMemo(() => {
    if (!config?.name) return []

    const NEW = {
      key: `action_${random()}`,
      icon: "plus-circle",
      type: "primary_2_bg",
      children: "New",
      visible: app.can("create", config.name),
      onPress: async () => {
        navigation.navigate(route.replace("View", ""), { id: "new" })
      },
    }

    const DELETE = {
      key: `action_${random()}`,
      icon: "trash2",
      type: "danger_bg",
      children: "Delete",
      visible: app.can("delete", config.name),
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
                  if (await view.deleteDocument(id)) refAlert.current.close()
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
      key: `action_${random()}`,
      icon: "rotate-ccw",
      type: "primary_2_bg",
      children: "Restore",
      visible: app.can("delete", config.name),
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
                  if (await view.restoreDocument(id)) refAlert.current.close()
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
      key: `action_${random()}`,
      icon: "search",
      type: "primary_2_bg",
      children: "Search",
      visible: true,
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
        view.setState({ isUpdating: true })
        view.setData({ isMobile })
        setTimeout(() => {
          view.setState({ isUpdating: false })
        }, 100)
      }

      view.setData({ isMobile })

      refActions.current = []
      refSwipeActions.current = []

      actions.forEach((action: JSONObject) => {
        if (config?.actions.indexOf(action.children) >= 0 && action.visible) {
          if (isMobile) {
            if (action.children !== "Delete" && action.children !== "Restore") {
              refActions.current.push(action)
            } else {
              refSwipeActions.current.push(action)
            }
          } else {
            refActions.current.push(action)
          }
        }
      })
    }
  }, [app.temp.isMobile, config?.name])

  return { actions: refActions.current, swipeActions: refSwipeActions.current }
}

export const useColumns = ({ refBottomSheet, setContent }: any) => {
  const view = useView()
  const { handleError } = useAlert()
  const { isMobile, config = {}, route } = view.data

  const onOpenJSON = React.useCallback(
    (id) => {
      ;(async () => {
        try {
          if (id.length !== 24) {
            throw new Error("Invalid ID")
          }
          const res = await POST(`/api/find/trash/${id}`, {})
          setContent(res.data.result)
        } catch (err) {
          handleError(err)
        } finally {
          refBottomSheet.current.open()
        }
      })()
    },
    [setContent]
  )

  return React.useMemo(
    () =>
      (config?.columns || []).map((col: JSONObject) => ({
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
              ? `${config.keys[name].label} : `
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
            case "number":
              return (
                <CellText isMobile={isMobile} style={cell.column.style}>
                  {prefix + formatNumber(cell.value)}
                </CellText>
              )
            case "decimal":
              return (
                <CellText isMobile={isMobile} style={cell.column.style}>
                  {prefix + formatDecimal(cell.value)}
                </CellText>
              )
            case "json":
              return (
                <CellPressable
                  icon="search"
                  style={cell.column.style}
                  onPress={() => {
                    onOpenJSON(cell.value)
                  }}
                />
              )
            default:
              return (
                <CellText isMobile={isMobile} style={cell.column.style}>
                  {prefix + formatString(cell.value)}
                </CellText>
              )
          }
        },
      })),
    [config?.name, isMobile, onOpenJSON]
  )
}

const useHook = () => {
  const [data, setData] = useState({})
  const [temp, setTemp] = useState({})
  const [error, setError] = useState({})
  const [stateProps, setState] = useState({})
  const navRoute = useRoute()
  const routeName = navRoute.name
  const { refAlert, handleError, ...app } = useAlert()
  const refSelected = React.useRef([])
  const refBottomSheet = React.useRef<Modalize>(null)

  useFocusEffect(
    React.useCallback(() => {
      const selected = (listConfig as any)[routeName]
      let keys: any = {}
      let { page = 1, search, limit = "30", last } = temp

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

      setData({
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
        const { page, search, limit, route } = data
        setTemp({ page, search, limit, last: route })
        setData({ config: undefined })
      }
    }, [])
  )

  const setCollection = React.useCallback(async () => {
    const { config, page, limit, search } = data
    if (config?.name) {
      const _params = {
        query: search,
        page,
        limit: +limit,
        field: config.field || {},
        sort: config.sort || {},
      }
      try {
        setState({ isLoading: true })
        const res = await POST(`/api/find/${config.name}`, { _params })
        setData({
          collection: res.data.result,
          total: res.data.total,
          max: res.data.max,
          isRefresh: undefined,
        })
      } catch (err) {
        handleError(err)
      } finally {
        setState({ isLoading: false })
      }
    }
  }, [data?.config?.name, data?.limit, data?.page, data?.search])

  React.useEffect(() => {
    ;(async () => {
      await setCollection()
    })()
  }, [data.page, data.search, data.limit, data?.config?.name])

  React.useEffect(() => {
    ;(async () => {
      if (!!data.isRefresh) {
        await setCollection()
      }
    })()
  }, [data.isRefresh])

  const deleteDocument = React.useCallback(
    async (id: string) => {
      const { name } = data?.config
      const selectedIds = id ? [id] : refSelected.current || []

      if (selectedIds.length != 0) {
        const _params = { query: { _id: { $in: selectedIds } } }
        try {
          setState({ isLoading: true })
          await DELETE(`/api/${name}`, { _params })
          return true
        } catch (err) {
          handleError(err)
        } finally {
          setState({ isLoading: false })
          setData({ isRefresh: true, selected: undefined, page: 1 })
        }
      }
    },
    [data?.config?.name]
  )

  const restoreDocument = React.useCallback(
    async (id: string) => {
      const { name } = data?.config
      const selectedIds = id ? [id] : refSelected.current || []

      if (selectedIds.length != 0) {
        const _params = { query: { _id: { $in: selectedIds } } }
        try {
          setState({ isLoading: true })
          await POST(`/api/${name}/restore`, { _params })
          return true
        } catch (err) {
          handleError(err)
        } finally {
          setState({ isLoading: false })
          setData({ isRefresh: true, selected: undefined, page: 1 })
        }
      }
    },
    [data?.config?.name]
  )

  const configSearch = React.useMemo(() => {
    const { search = [], keys = [] } = data?.config || {}

    return {
      simple: search,
      advance: Object.keys(keys).map((val: any) => {
        const column = keys[val]
        return {
          label: column.type === "json" ? "Data" : column.label,
          name: column.type === "json" ? "$text" : column.name,
          type: column.type,
        }
      }),
    }
  }, [data?.config?.name])

  return {
    data,
    error,
    temp,
    stateProps,
    setData,
    setTemp,
    setError,
    setState,
    restoreDocument,
    deleteDocument,
    refSelected,
    refBottomSheet,
    configSearch,
  }
}

export const [withView, useView] = createContext("View", {}, useHook)

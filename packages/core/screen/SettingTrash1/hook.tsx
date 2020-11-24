import React from "react"
import { useStore, Table } from "../../component"
import { TableCheckbox } from "../../shared/ViewGrid/TableCheckbox"
import { get } from "../../request"

export const useTrash = () => {
  const { trash } = useStore()
  const isMobile = trash.data.get("isMobile")
  trash.bottomSheet = React.useRef(null)

  const columns = React.useMemo(
    () => [
      {
        label: "",
        name: "data",
        filter: false,
        type: "json",
        search: ["$text"],
        style: { width: 30 },
        isMobileVisible: false,
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
          trash.bottomSheet.current.open()
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
    if (isMobile !== trash?.app?.dimension.isMobile) {
      trash.set("isLoading", true)
      trash.setData({ isMobile: trash?.app?.dimension.isMobile })
      setTimeout(() => {
        trash.set("isLoading", false)
      }, 1000)
    }
  }, [trash?.app?.dimension.isMobile])

  return { trash, actions, columns }
}

export const useTableGrid = (store: any, _columns: any) => {
  const [search, page = 1, isMobile] = store.getData(
    "search",
    "page",
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

  const columns = React.useMemo(
    () =>
      _columns
        .filter((col: any) => (isMobile ? col.isMobileVisible : true))
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

  return { keys, columns }
}
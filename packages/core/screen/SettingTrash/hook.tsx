import React from "react"
import { useFocusEffect } from "@react-navigation/native"
import { useStore, Table } from "../../component"
import { get } from "../../request"
import { random } from "../../util"

export const useTrash = () => {
  const { trash } = useStore()
  const isReady = !!trash.data.get("page")
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

  const setCollection = React.useCallback(async () => {
    const [page, search] = trash.getData("page", "search")

    const params = { q: search, page }
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
  }, [trash?.app?.dimension.isMobile])

  return { trash }
}

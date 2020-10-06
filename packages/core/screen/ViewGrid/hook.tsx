import { useEffect, useMemo } from "react"
import { useStore } from "../../component/Store"
import { get } from "../../request"
import * as config from "./config"

export const useHook = () => {
  const { view } = useStore()
  const name = `${view?.app?.routerLocation}/`.split("/")[1]
  const search = view.data.get("search") || ""
  view.name = name
  view.title = (config as ObjectAny)[name].title
  view.search = (config as ObjectAny)[name].search

  useEffect(() => {
    view.setData({
      name,
    })
    return () => {
      view.data.clear()
    }
  }, [view?.app?.routerLocation])

  useEffect(() => {
    ;(async () => {
      await setCollection(name)
    })()
  }, [view?.app?.routerLocation, search])

  const setCollection = async (name: string) => {
    try {
      view.set("isLoading", true)
      const params = view.name !== "log" ? { q: search } : {}
      const {
        data: { result, page, limit, total },
      } = await get(`/api/${name}`, params)
      view.setData({
        collection: result,
        page,
        limit,
        total,
      })
    } finally {
      view.set("isLoading", false)
    }
  }

  return { store: view }
}

export const useActions = (store: any) => {
  const name = store.name
  const button = (config as ObjectAny)[name].button
  const isMobile = store?.app.dimension.isMobile
  return useMemo(() => {
    const list: any = {
      new: {
        icon: "file-plus",
        type: "primary_2_bg",
        children: "New",
        onPress: () => store.app?.goto(`${name}/new`),
        visible: store.app?.can("create", name),
      },
      delete: {
        icon: "trash-2",
        type: "danger_bg",
        children: "Delete",
        onPress: () => alert("Delete"),
        visible: store.app?.can("delete", name),
      },
      filter: {
        icon: "search",
        type: "primary_2_bg",
        children: "Filter",
        onPress: () => {
          const isFilter = store.temp.get("isFilter") || false
          store.temp.set("isFilter", !isFilter)
        },
        visible: !isMobile,
      },
    }

    return {
      actDelete: button.indexOf("delete") < 0 ? null : list.delete,
      actions: button
        .map((btn: string) => list[btn])
        .filter((btn: ObjectAny) => !!btn && btn.visible),
    }
  }, [name, isMobile])
}

export const useColumns = (store: any) => {
  const isMobile = store?.app.dimension.isMobile
  const name = store.name
  const columns = useMemo(() => {
    let column = (config as ObjectAny)[name].column
    if (isMobile) {
      column = column.filter((col: any) => col.isMobileVisible)
    }
    return column.map((col: ObjectAny) =>
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
    )
  }, [isMobile, name])
  const labels = useMemo(() => {
    const label: any = {}
    if (isMobile) {
      ;(config as ObjectAny)[name].column
        .filter((col: any) => col.isMobileVisible)
        .forEach((col: any) => {
          if (col.name !== "_id") {
            label[col.type ? `${col.name}_${col.type}` : col.name] = col.label
          }
        })
    }
    return label
  }, [isMobile, name])

  return { columns, labels }
}

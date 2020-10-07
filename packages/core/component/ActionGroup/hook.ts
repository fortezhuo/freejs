import { useMemo } from "react"

export const useActions = (store: any, button: any) => {
  const name = store.name
  const isMobile = store?.app.dimension.isMobile
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
        store.setTemp({ isFilter: !isFilter })
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
}

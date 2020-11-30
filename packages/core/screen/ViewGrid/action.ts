export const addNew = (store: any) => ({
  icon: "file",
  type: "primary_2_bg",
  children: "New",
})
export const addDelete = (store: any) => ({
  icon: "trash-2",
  type: "danger_bg",
  children: "Delete",
  onPress: (params: any) =>
    store.app?.alert.error({
      title: "Confirmation",
      message: "Do you want to delete these document(s) ?",
      actions: [
        {
          label: "OK",
          type: "primary_1",
          onPress: () =>
            store.app?.alert.info({
              title: "OK",
              message: "Document Deleted ",
              actions: [],
            }),
        },
        {
          label: "Cancel",
          type: "danger",
          onPress: () => store.app?.alert.close(),
        },
      ],
    }),
})

export const addRestore = (store: any) => ({
  icon: "rotate-ccw",
  type: "primary_2_bg",
  children: "Restore",
  onPress: (params: any) => {
    store.app?.alert.confirm({
      title: "Confirmation",
      message: "Do you want to restore these document(s) ?",
      actions: [
        {
          label: "OK",
          type: "primary_1",
          onPress: async () => {
            const res = await store.restoreDocument(params)
            console.log(res)
            store.app?.alert.info({
              title: "OK",
              message: "OK Restored",
              actions: [],
            })
          },
        },
        {
          label: "Cancel",
          type: "danger",
          onPress: () => store.app?.alert.close(),
        },
      ],
    })
  },
})
export const addSearch = (store: any) => ({
  icon: "search",
  type: "primary_2_bg",
  children: "Search",
  onPress: () => {
    store.bottomSheet.open()
  },
})

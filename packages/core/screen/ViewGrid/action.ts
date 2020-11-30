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

export const addNew = (store: any) => ({
  icon: "file",
  type: "primary_2_bg",
  children: "New",
})

export const addDelete = (store: any) => ({
  icon: "trash-2",
  type: "danger_bg",
  children: "Delete",
  onPress: async ({ id }: any) => {
    if (await validateNotEmpty(store, id)) {
      store.app?.alert.confirm({
        title: "Confirmation",
        message: "Do you want to delete these document(s) ?",
        actions: [
          {
            label: "OK",
            type: "primary_1",
            onPress: async () => {
              const res = await store.deleteDocument(id)
              store.app?.alert.info({
                title: "Information",
                message: "Document Deleted ",
                actions: [
                  {
                    label: "OK",
                    type: "primary_2",
                    onPress: () => store.app?.alert.close(),
                  },
                ],
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
    }
  },
})

export const addRestore = (store: any) => ({
  icon: "rotate-ccw",
  type: "primary_2_bg",
  children: "Restore",
  onPress: async ({ id }: any) => {
    if (await validateNotEmpty(store, id)) {
      store.app?.alert.confirm({
        title: "Confirmation",
        message: "Do you want to restore these document(s) ?",
        actions: [
          {
            label: "OK",
            type: "primary_1",
            onPress: async () => {
              const res = await store.restoreDocument(id)
              store.app?.alert.info({
                title: "Information",
                message: "OK Restored",
                actions: [
                  {
                    label: "OK",
                    type: "primary_2",
                    onPress: () => store.app?.alert.close(),
                  },
                ],
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
    }
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

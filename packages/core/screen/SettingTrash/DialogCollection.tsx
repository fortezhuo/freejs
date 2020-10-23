import React, { useCallback } from "react"
import { View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { useDialog, H3 } from "../../component"
import { random } from "../../util/random"
import { tw } from "@free/tailwind"

export const useDialogCollection = (store: any) => {
  const { show, Dialog, MenuItem } = useDialog()
  const listCollection = store.data.get("list") || []
  const onSelect = useCallback((name) => {
    store.setData({ name })
    store.app.goto(`/trash/${name}`)
  }, [])

  const DialogCollection = observer(() => {
    return (
      <Dialog>
        <View style={styles.viewDialog}>
          <H3>Select Collection</H3>
          {listCollection.map((name: string) => {
            return (
              <MenuItem
                key={"collection_" + random()}
                onPress={() => onSelect(name)}
              >
                {name}
              </MenuItem>
            )
          })}
        </View>
      </Dialog>
    )
  })

  return { show, DialogCollection }
}

const styles = StyleSheet.create({
  viewDialog: tw("bg-white p-3 rounded-lg shadow-lg"),
})

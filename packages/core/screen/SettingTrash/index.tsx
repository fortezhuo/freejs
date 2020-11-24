import React from "react"
import { View, Text } from "react-native"
import { Loader } from "../../component"
import { useTrash } from "./hook"
import { observer } from "mobx-react-lite"

const SettingTrash = observer(() => {
  const { trash } = useTrash()
  return (
    <View>
      {trash.isLoading ? (
        <Loader dark />
      ) : (
        <Text>{"Setting Trash " + trash.data.get("isMobile")}</Text>
      )}
    </View>
  )
})

export default SettingTrash

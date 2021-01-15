import React from "react"
import { Button } from ".."
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"

export const Large: React.FC<{
  actions: JSONObject[]
  isLoading?: boolean
}> = ({ actions, isLoading }) => {
  return (
    <View style={s.viewAction}>
      <View style={s.groupAction}>
        {actions.map(({ key, ...prop }) => (
          <Button
            {...{ isLoading, key, ...prop }}
            style={{ marginRight: 4, minWidth: 100 }}
          />
        ))}
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  viewAction: tw("flex-row"),
  groupAction: tw("flex-row p-1"),
})

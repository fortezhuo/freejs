import React from "react"
import { Button } from "../Button"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"

export const Large: React.FC<{
  actions: JSONObject[]
  isLoading?: boolean
}> = ({ actions, isLoading }) => {
  return (
    <View style={s.groupAction}>
      {actions.map(({ key, ...prop }) => (
        <Button
          {...{ isLoading, key, ...prop }}
          style={{ marginRight: 4, minWidth: 90 }}
        />
      ))}
    </View>
  )
}

const s = StyleSheet.create({
  groupAction: tw("flex-row p-1"),
})

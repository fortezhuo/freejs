import React from "react"
import { Button } from ".."
import { random } from "../../util"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"

export const Large: React.FC<any> = ({ actions, isLoading }) => {
  return (
    <View style={s.viewAction}>
      <View style={s.groupAction}>
        {actions.map((prop: ObjectAny) => (
          <Button
            key={"actlarge_" + random()}
            {...{ isLoading, ...prop }}
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

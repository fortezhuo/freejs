import React from "react"
import { Button } from ".."
import { random } from "../../util/random"
import { observer } from "mobx-react-lite"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"

export const Large: React.FC<any> = observer(({ store, actions }) => {
  return (
    <View style={s.rootAction}>
      {actions.map((prop: ObjectAny) => (
        <Button
          key={"actlarge_" + random()}
          store={store}
          {...prop}
          style={{ marginRight: 4, minWidth: 100 }}
        />
      ))}
    </View>
  )
})

const s = StyleSheet.create({
  rootAction: tw("flex-row p-1"),
})

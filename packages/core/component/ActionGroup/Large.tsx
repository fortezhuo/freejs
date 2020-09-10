import React, { FC } from "react"
import { Button } from "../Button"
import { random } from "../../util/random"
import { observer } from "mobx-react-lite"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"

export const Large: FC<any> = observer(({ store, button }) => {
  return (
    button && (
      <View style={styles.rootAction}>
        {button.map((prop: ObjectAny) => (
          <Button
            key={"act_" + random()}
            store={store}
            {...prop}
            style={{ marginRight: 4 }}
          />
        ))}
      </View>
    )
  )
})

const styles = StyleSheet.create({
  rootAction: tw("flex-row p-1"),
})

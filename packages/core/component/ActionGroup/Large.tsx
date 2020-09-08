import React, { FC } from "react"
import { Button } from "../Button"
import { random } from "../../util/random"
import { observer } from "mobx-react-lite"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"

export const Large: FC<any> = observer(({ store, button, size = [] }) => {
  const isShow = size.indexOf(store.app.dimension.screen) >= 0
  return isShow ? (
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
  ) : null
})

const styles = StyleSheet.create({
  rootAction: tw("flex-row p-1"),
})

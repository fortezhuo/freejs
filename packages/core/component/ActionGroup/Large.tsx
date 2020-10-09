import React, { FC } from "react"
import { Button } from ".."
import { random } from "../../util/random"
import { observer } from "mobx-react-lite"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"

export const Large: FC<any> = observer(({ store, actions }) => {
  const isShow = actions.length != 0 && !store.app.dimension.isMobile
  return isShow ? (
    <View style={styles.rootAction}>
      {actions.map((prop: ObjectAny) => (
        <Button
          key={"actlarge_" + random()}
          store={store}
          {...prop}
          style={{ marginRight: 4, minWidth: 100 }}
        />
      ))}
    </View>
  ) : null
})

const styles = StyleSheet.create({
  rootAction: tw("flex-row p-1"),
})

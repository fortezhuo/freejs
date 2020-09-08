import React, { FC } from "react"
import { Button } from "../Button"
import { IconButton } from "../Icon"
import { random } from "../../util/random"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { useLocalStore, observer } from "mobx-react-lite"
import { Modal } from "../Modal"
import { theme } from "../../config/theme"

export const Small: FC<any> = observer(({ store, button, size }) => {
  const isShow = size.indexOf(store.app.dimension.screen) >= 0
  const state = useLocalStore(() => ({
    isOpen: false,
    toggle() {
      state.isOpen = !state.isOpen
    },
  }))
  return isShow ? (
    <>
      <IconButton
        styleContainer={styles.rootIcon}
        name="zap"
        onPress={state.toggle}
      />
      <Modal visible={state.isOpen} onBackdropPress={state.toggle}>
        <View style={styles.rootAction}>
          {button.map((prop: ObjectAny) => (
            <Button
              key={"act_" + random()}
              store={store}
              {...prop}
              style={{ marginTop: 2, marginBottom: 2 }}
            />
          ))}
        </View>
      </Modal>
    </>
  ) : null
})

const styles = StyleSheet.create({
  rootIcon: tw(
    `${theme.primary} p-3 shadow-lg rounded-full absolute bottom-0 right-0 m-1`
  ),
  rootAction: tw(
    "absolute inset-x-0 bottom-0 p-5 bg-white shadow-md rounded-b mx-1"
  ),
})

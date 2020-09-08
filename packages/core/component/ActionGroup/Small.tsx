import React, { FC } from "react"
import { Button } from "../Button"
import { IconButton } from "../Icon"
import { random } from "../../util/random"
import { View, StyleSheet, ViewProps } from "react-native"
import { tw } from "@free/tailwind"
import { useLocalStore, observer } from "mobx-react-lite"
import { useSpring, animated } from "react-spring/native"
import { Modal } from "../Modal"
import { theme } from "../../config/theme"

const AnimatedView = animated<React.ElementType<ViewProps>>(View)

export const Small: FC<any> = observer(({ store, button, size }) => {
  const isShow = size.indexOf(store.app.dimension.screen) >= 0
  const state = useLocalStore(() => ({
    isOpen: false,
    toggle() {
      state.isOpen = !state.isOpen
    },
  }))
  const [style, set] = useSpring(() => ({
    config: { duration: 120 },
    transform: "translateY(500px)",
  }))

  return isShow ? (
    <>
      <IconButton
        styleContainer={styles.rootIcon}
        name="zap"
        onPress={() => {
          state.toggle()
          set({ transform: "translateY(0px)" })
        }}
      />
      <Modal
        visible={state.isOpen}
        onDismiss={() => {
          set({ transform: "translateY(500px)" })
        }}
        onBackdropPress={() => {
          state.toggle()
        }}
      >
        <AnimatedView style={StyleSheet.flatten([styles.rootAction, style])}>
          {button.map((prop: ObjectAny) => (
            <Button
              key={"act_" + random()}
              store={store}
              {...prop}
              style={{ marginTop: 2, marginBottom: 2 }}
            />
          ))}
        </AnimatedView>
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

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

export const Small: FC<any> = observer(({ store, button }) => {
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

  return (
    button && (
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
            {button.map(({ icon, type, ...prop }: ObjectAny) => (
              <Button
                {...prop}
                key={"act_" + random()}
                store={store}
                style={{ marginVertical: 2 }}
              />
            ))}
            <Button
              store={store}
              style={{ marginTop: 10 }}
              onPress={state.toggle}
            >
              Close
            </Button>
          </AnimatedView>
        </Modal>
      </>
    )
  )
})

const styles = StyleSheet.create({
  rootIcon: tw(
    `${theme.primary} p-2 shadow-lg border border-gray-400 rounded-full absolute bottom-0 right-0 m-3`
  ),
  rootAction: tw(
    "absolute inset-x-0 bottom-0 p-5 bg-black-500 rounded mx-2 mb-10"
  ),
})

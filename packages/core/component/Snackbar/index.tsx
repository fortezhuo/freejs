import React, { FC } from "react"
import { View, Text, StyleSheet } from "react-native"
import { IconButton } from "../Icon"
import { Modal } from "../Modal"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { useHook } from "./hook"

export const Snackbar: FC = observer(() => {
  const { hide, error } = useHook()
  return (
    <Modal visible={!!error} transparent>
      <View
        style={StyleSheet.flatten([
          styles.rootSnackbar,
          error ? styles.snackbarError : {},
        ])}
      >
        <Text style={styles.textSnackbar}>{error}</Text>
        <IconButton size={18} name="x" color="white" onPress={hide} />
      </View>
    </Modal>
  )
})

const styles = StyleSheet.create({
  rootSnackbar: tw("absolute w-full p-3 bg-gray-500 bottom-0 mb-6 flex-row"),
  snackbarError: tw("bg-red-700"),
  textSnackbar: tw("text-white flex-grow"),
})

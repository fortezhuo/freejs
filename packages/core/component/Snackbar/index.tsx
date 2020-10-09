import React, { FC } from "react"
import { Text, StyleSheet, View } from "react-native"
import { IconButton, Col, Modal } from "../"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { useHook } from "./hook"
import { theme } from "../../config/theme"

export const Snackbar: FC<any> = observer(() => {
  const { hide, error } = useHook()
  const message = error
    ? (error as any).message
      ? (error as any).message
      : null
    : null
  return (
    <Modal visible={!!message} transparent>
      <Col
        sm={11}
        style={StyleSheet.flatten([
          styles.viewSnackbar,
          error ? styles.viewError : {},
        ])}
      >
        <View style={styles.viewContent}>
          <Text style={styles.textSnackbar}>{message}</Text>
        </View>
        <IconButton size={18} name="x" color="white" onPress={hide} />
      </Col>
    </Modal>
  )
})

const styles = StyleSheet.create({
  viewSnackbar: tw(
    `absolute p-3 bottom-0 mb-6 flex-row self-center items-center`
  ),
  viewError: tw(theme.danger_bg),
  viewContent: tw("flex-grow"),
  textSnackbar: tw(`text-white self-center`),
})

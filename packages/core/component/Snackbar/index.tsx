import React from "react"
import { Text, StyleSheet, View } from "react-native"
import { IconButton, Col, Modal } from "../"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { useHook } from "./hook"
import { theme } from "../../config/theme"

export const Snackbar: React.FC<any> = observer(() => {
  const { hide, error } = useHook()
  const message = error
    ? (error as any).message
      ? (error as any).message
      : null
    : null
  return (
    <Modal isVisible={!!message}>
      <Col sm={11} style={[s.viewSnackbar, error ? s.viewError : {}]}>
        <View style={s.viewContent}>
          <Text style={s.textSnackbar}>{message}</Text>
        </View>
        <IconButton size={18} name="x" color="white" onPress={hide} />
      </Col>
    </Modal>
  )
})

const s = StyleSheet.create({
  viewSnackbar: tw(
    `absolute p-3 bottom-0 mb-6 flex-row self-center items-center`
  ),
  viewError: tw(theme.danger_bg),
  viewContent: tw("flex-grow"),
  textSnackbar: tw(`text-white self-center`),
})

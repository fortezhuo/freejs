import React, { FC, memo } from "react"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { RNModal } from "./RNModal"
import { tw } from "@free/tailwind"

export const Modal: FC<Modal> = memo(
  ({
    visible,
    transparent = false,
    onRequestClose = undefined,
    onBackdropPress = undefined,
    children,
  }) => {
    return (
      <RNModal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
      >
        {onBackdropPress && (
          <TouchableWithoutFeedback onPress={onBackdropPress}>
            <View
              style={StyleSheet.flatten([
                styles.rootOverlay,
                transparent ? {} : styles.overlayDark,
              ])}
            ></View>
          </TouchableWithoutFeedback>
        )}
        {children}
      </RNModal>
    )
  }
)

const styles = StyleSheet.create({
  rootOverlay: tw("absolute top-0 left-0 right-0 bottom-0 flex-1"),
  overlayDark: tw("bg-black-500"),
})

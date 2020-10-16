export { default as ModalAnimated } from "react-native-modal"

import React, { FC, memo } from "react"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Modal as RNModal } from "react-native"
import { tw } from "@free/tailwind"
import { ModalProps } from "@free/core"

export const Modal: FC<ModalProps> = memo(
  ({
    visible,
    transparent = false,
    onShow = undefined,
    onDismiss = undefined,
    onRequestClose = undefined,
    onBackdropPress = undefined,
    children,
  }) => {
    return (
      <RNModal
        animationType="none"
        supportedOrientations={["portrait", "landscape"]}
        transparent={true}
        visible={visible}
        onShow={onShow}
        onDismiss={onDismiss}
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

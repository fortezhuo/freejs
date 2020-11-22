import React from "react"
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal as RNModal,
} from "react-native"
import { tw } from "@free/tailwind"
import { ModalProps } from "@free/core"

export const Modal: React.FC<ModalProps> = ({
  isVisible,
  animationType = "slide",
  transparent = false,
  onShow = undefined,
  onDismiss = undefined,
  onRequestClose = undefined,
  onBackdropPress = undefined,
  children,
}) => {
  return (
    <RNModal
      animationType={animationType}
      supportedOrientations={["portrait", "landscape"]}
      transparent={true}
      visible={isVisible}
      onShow={onShow}
      onDismiss={onDismiss}
      onRequestClose={onRequestClose}
    >
      {onBackdropPress && (
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <View
            style={[s.rootOverlay, transparent ? {} : s.overlayDark]}
          ></View>
        </TouchableWithoutFeedback>
      )}
      {children}
    </RNModal>
  )
}

const s = StyleSheet.create({
  rootOverlay: tw("absolute top-0 left-0 right-0 bottom-0 flex-1"),
  overlayDark: tw("bg-black-500"),
})

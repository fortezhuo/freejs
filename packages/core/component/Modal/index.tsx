import React from "react"
import {
  View,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Modal as RNModal,
} from "react-native"
import { tw } from "@free/tailwind"

interface Modal {
  isVisible: boolean
  animationType?: "fade" | "none" | "slide"
  transparent?: boolean
  onShow?: VoidFunction
  onDismiss?: VoidFunction
  onRequestClose?: VoidFunction
  onBackdropPress?: VoidFunction
  children: React.ReactNode
}

export const Modal: React.FC<Modal> = ({
  isVisible,
  animationType = "fade",
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        pointerEvents="box-none"
        style={s.viewKeyboardAvoid}
      >
        {children}
      </KeyboardAvoidingView>
    </RNModal>
  )
}

const s = StyleSheet.create({
  viewKeyboardAvoid: tw("flex-1 justify-center"),
  rootOverlay: tw("absolute top-0 left-0 right-0 bottom-0 flex-1"),
  overlayDark: { backgroundColor: "rgba(0,0,0,0.5)" },
})

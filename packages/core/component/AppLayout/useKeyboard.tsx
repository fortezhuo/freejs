import { useEffect } from "react"
import { Keyboard, KeyboardEvent, Platform } from "react-native"
import { useStore } from "../Store"

export const useKeyboard = (): any => {
  const { app } = useStore()

  if (Platform.OS !== "web") {
    function onKeyboardDidShow(e: KeyboardEvent): void {
      app.set("keyboard", { height: e.endCoordinates.height, status: "shown" })
    }
    function onKeyboardWillShow(e: KeyboardEvent): void {
      app.set("keyboard", { height: e.endCoordinates.height, status: "show" })
    }

    function onKeyboardDidHide(): void {
      app.set("keyboard", { height: 0, status: "hidden" })
    }
    function onKeyboardWillHide(e: KeyboardEvent): void {
      app.set("keyboard", { height: e.endCoordinates.height, status: "hide" })
    }

    useEffect(() => {
      Keyboard.addListener("keyboardDidShow", onKeyboardDidShow)
      Keyboard.addListener("keyboardDidHide", onKeyboardDidHide)
      Keyboard.addListener("keyboardWillShow", onKeyboardWillShow)
      Keyboard.addListener("keyboardWillHide", onKeyboardWillHide)
      return (): void => {
        Keyboard.removeListener("keyboardDidShow", onKeyboardDidShow)
        Keyboard.removeListener("keyboardDidHide", onKeyboardDidHide)
        Keyboard.removeListener("keyboardWillShow", onKeyboardWillShow)
        Keyboard.removeListener("keyboardWillHide", onKeyboardWillHide)
      }
    }, [])
  } else {
    useEffect(() => {
      app.set("keyboard", { height: 0, status: "shown" })
    }, [])
  }
}

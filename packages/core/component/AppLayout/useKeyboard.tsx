import { useEffect, useState } from "react"
import { Keyboard, KeyboardEvent } from "react-native"

export const useKeyboard = (): any => {
  const [keyboard, setKeyboard] = useState({ height: 0, status: "hidden" })

  function onKeyboardDidShow(e: KeyboardEvent): void {
    setKeyboard({ height: e.endCoordinates.height, status: "shown" })
  }
  function onKeyboardWillShow(e: KeyboardEvent): void {
    setKeyboard({ height: e.endCoordinates.height, status: "show" })
  }

  function onKeyboardDidHide(): void {
    setKeyboard({ height: 0, status: "hidden" })
  }
  function onKeyboardWillHide(e: KeyboardEvent): void {
    setKeyboard({ height: e.endCoordinates.height, status: "hide" })
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

  return keyboard
}

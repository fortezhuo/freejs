import React from "react"
import { Keyboard } from "react-native"

export const useKeyboard = () => {
  const [isShow, setShow] = React.useState(false)

  const onKeyboardDidShow = React.useCallback(() => {
    setShow(true)
  }, [])
  const onKeyboardDidHide = React.useCallback(() => {
    setShow(false)
  }, [])

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", onKeyboardDidShow)
    Keyboard.addListener("keyboardDidHide", onKeyboardDidHide)
    return () => {
      Keyboard.removeListener("keyboardDidShow", onKeyboardDidShow)
      Keyboard.removeListener("keyboardDidHide", onKeyboardDidHide)
    }
  }, [])

  return isShow
}

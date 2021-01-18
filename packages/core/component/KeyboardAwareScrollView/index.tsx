import React from "react"
import { Keyboard, ScrollView } from "react-native"
import { useApp } from "../../state"

export const KeyboardAwareScrollView: React.FC = ({ children, ...rest }) => {
  const { refScroll, refOffset, temp } = useApp()

  const calcScroll = React.useCallback((event: any) => {
    refOffset.current = event.nativeEvent.contentOffset
  }, [])

  /*
  const calcLayout = React.useCallback((event: any) => {
    setContentOffset({ x: 0, y: 0 })
  }, [])


  const keyboardWillShow = React.useCallback((event) => {
    const height = event.endCoordinates.height + 250
    if (keyboardHeight === height) return
    setKeyboardHeight(height)
  }, [])

  const keyboardWillHide = React.useCallback((event: any) => {
    setKeyboardHeight(0)
    const yOffset = Math.max(contentOffset.y - keyboardHeight, 0)
    //    refScroll.current?.scrollTo({ x: 0, y: yOffset, animated: true })
  }, [])

  React.useEffect(() => {
    Keyboard.addListener("keyboardWillShow", keyboardWillShow)
    Keyboard.addListener("keyboardWillHide", keyboardWillHide)
    return () => {
      Keyboard.removeListener("keyboardWillShow", keyboardWillShow)
      Keyboard.removeListener("keyboardWillHide", keyboardWillHide)
    }
  }, [])

  */

  return (
    <ScrollView
      {...rest}
      ref={refScroll}
      scrollEventThrottle={200}
      testID={"KeyboardAwareScrollView"}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      contentInset={{
        bottom: temp.keyboardHeight,
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      //      onLayout={calcLayout}
      onScroll={calcScroll}
    >
      {children}
    </ScrollView>
  )
}

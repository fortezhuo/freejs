import React from "react"
import { Keyboard, ScrollView, Platform } from "react-native"

export const KeyboardAwareScrollView: React.FC<any> = ({
  children,
  ...rest
}) => {
  const isMobile = Platform.OS !== "web"
  const refScroll = React.useRef<ScrollView>(null)
  const [keyboardHeight, setKeyboardHeight] = React.useState(0)
  const [contentOffset, setContentOffset] = React.useState({ x: 0, y: 0 })

  const calcLayout = React.useCallback((event: any) => {
    if (isMobile) setContentOffset({ x: 0, y: 0 })
  }, [])

  const calcScroll = React.useCallback((event: any) => {
    if (isMobile) setContentOffset(event.nativeEvent.contentOffset)
  }, [])

  if (isMobile) {
    const keyboardWillShow = React.useCallback((event) => {
      const height = event.endCoordinates.height
      if (keyboardHeight === height) return
      setKeyboardHeight(height)
    }, [])

    const keyboardWillHide = React.useCallback((event: any) => {
      setKeyboardHeight(0)
      const yOffset = Math.max(contentOffset.y - keyboardHeight, 0)
      refScroll.current?.scrollTo({ x: 0, y: yOffset, animated: true })
    }, [])

    React.useEffect(() => {
      Keyboard.addListener("keyboardWillShow", keyboardWillShow)
      Keyboard.addListener("keyboardWillHide", keyboardWillHide)
      return () => {
        Keyboard.removeListener("keyboardWillShow", keyboardWillShow)
        Keyboard.removeListener("keyboardWillHide", keyboardWillHide)
      }
    }, [])
  }
  return (
    <ScrollView
      {...rest}
      ref={refScroll}
      scrollEventThrottle={200}
      testID={"KeyboardAwareScrollView"}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      contentInset={{
        bottom: keyboardHeight,
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      onLayout={calcLayout}
      onScroll={calcScroll}
    >
      {children}
    </ScrollView>
  )
}

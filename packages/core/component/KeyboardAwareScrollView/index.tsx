import React, { useState, useEffect, FC, useRef, useCallback } from "react"

import { Keyboard, ScrollView } from "react-native"

export const KeyboardAwareScrollView: FC<any> = ({ children, ...rest }) => {
  const refScroll = useRef<ScrollView>(null)
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [contentOffset, setContentOffset] = useState({ x: 0, y: 0 })

  const calcLayout = useCallback((event: any) => {
    setContentOffset({ x: 0, y: 0 })
  }, [])

  const calcScroll = useCallback((event: any) => {
    setContentOffset(event.nativeEvent.contentOffset)
  }, [])

  const keyboardWillShow = useCallback((event) => {
    const height = event.endCoordinates.height
    if (keyboardHeight === height) return
    setKeyboardHeight(height)
  }, [])

  const keyboardWillHide = useCallback((event: any) => {
    setKeyboardHeight(0)
    const yOffset = Math.max(contentOffset.y - keyboardHeight, 0)
    refScroll.current?.scrollTo({ x: 0, y: yOffset, animated: true })
  }, [])

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", keyboardWillShow)
    Keyboard.addListener("keyboardWillHide", keyboardWillHide)
    return () => {
      Keyboard.removeListener("keyboardWillShow", keyboardWillShow)
      Keyboard.removeListener("keyboardWillHide", keyboardWillHide)
    }
  }, [])

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

import React from "react"
import { ScrollView } from "react-native"
import { useApp } from "../../state"

export const KeyboardAwareScrollView: React.FC = ({ children, ...rest }) => {
  const { refScroll, refOffset, temp } = useApp()

  const calcScroll = React.useCallback((event: any) => {
    refOffset.current = event.nativeEvent.contentOffset
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
        bottom: temp.keyboardHeight,
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      onScroll={calcScroll}
    >
      {children}
    </ScrollView>
  )
}

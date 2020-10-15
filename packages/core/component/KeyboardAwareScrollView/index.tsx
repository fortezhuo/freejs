import React from "react"

import { ScrollView } from "react-native"

import { Base } from "./Base"

export class KeyboardAwareScrollView extends Base {
  render() {
    return (
      <ScrollView
        testID={"KeyboardAwareScrollView"}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        {...this.props}
        contentInset={{ bottom: this.state.keyboardHeight }}
        contentContainerStyle={{ flexGrow: 1 }}
        ref={(r) => {
          this._keyboardAwareView = r
        }}
        onLayout={(layoutEvent) => {
          this._onKeyboardAwareViewLayout(layoutEvent.nativeEvent.layout)
        }}
        onScroll={(event) => {
          this._onKeyboardAwareViewScroll(event.nativeEvent.contentOffset)
          if (this.props.onScroll) {
            this.props.onScroll(event)
          }
        }}
        onContentSizeChange={() => {
          this._updateKeyboardAwareViewContentSize()
        }}
        scrollEventThrottle={200}
      />
    )
  }
}

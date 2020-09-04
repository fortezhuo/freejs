import React, { Component } from "react"
import { Animated, StyleSheet, Text, View, I18nManager } from "react-native"

import { RectButton } from "react-native-gesture-handler"

import Swipeable from "react-native-gesture-handler/Swipeable"

export default class AppleStyleSwipeableRow extends Component {
  _swipeableRow: any = undefined
  renderRightAction = (text: any, color: any, x: any, progress: any) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    })
    const pressHandler = () => {
      this.close()
      alert(text)
    }
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    )
  }
  renderRightActions = (progress: any) => (
    <View
      style={{
        width: 64,
        flexDirection: "row",
      }}
    >
      {this.renderRightAction("More", "#dd2c00", 64, progress)}
    </View>
  )
  updateRef = (ref: any) => {
    this._swipeableRow = ref
  }
  close = () => {
    this?._swipeableRow?.close()
  }
  render() {
    const { children } = this.props
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={this.renderRightActions}
      >
        {children}
      </Swipeable>
    )
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "#497AFC",
    justifyContent: "center",
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
})

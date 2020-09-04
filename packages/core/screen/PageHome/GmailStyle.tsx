import React, { Component } from "react"
import { Animated, StyleSheet, Text, View, I18nManager } from "react-native"

import { RectButton } from "react-native-gesture-handler"

import Swipeable from "react-native-gesture-handler/Swipeable"

export default class GmailStyleSwipeableRow extends Component {
  _swipeableRow: any = undefined
  renderLeftActions = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: "clamp",
    })
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Text>Icon</Text>
      </RectButton>
    )
  }
  renderRightActions = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    })
    return (
      <RectButton style={styles.rightAction} onPress={this.close}>
        <Text>Icon</Text>
      </RectButton>
    )
  }
  updateRef = (ref: any) => {
    this._swipeableRow = ref
  }
  close = () => {
    this._swipeableRow.close()
  }
  render() {
    const { children } = this.props
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={80}
        rightThreshold={40}
        renderLeftActions={this.renderLeftActions}
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
    backgroundColor: "#388e3c",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    backgroundColor: "#dd2c00",
    flex: 1,
    justifyContent: "flex-end",
  },
})

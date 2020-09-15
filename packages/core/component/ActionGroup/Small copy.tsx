import React, { Component } from "react"
import { Animated, StyleSheet, Text, View, Dimensions } from "react-native"
import {
  PanGestureHandler,
  NativeViewGestureHandler,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler"

const HEADER_HEIGHT = 50
const windowHeight = Dimensions.get("window").height
const SNAP_POINTS_FROM_TOP = [50, windowHeight * 0.4, windowHeight * 0.8]

export class Small extends Component {
  _lastScrollYValue: any = null
  _lastScrollY: any = null
  _dragY: any = null
  _onGestureEvent: any = null
  _reverseLastScrollY: any = null
  _translateYOffset: any = null
  _translateY: any = null

  drawerheader = React.createRef()
  constructor(props: any) {
    super(props)
    const START = SNAP_POINTS_FROM_TOP[0]
    const END = SNAP_POINTS_FROM_TOP[SNAP_POINTS_FROM_TOP.length - 1]

    this.state = {
      lastSnap: END,
    }

    this._lastScrollYValue = 0
    this._lastScrollY = new Animated.Value(0)

    this._lastScrollY.addListener(({ value }: any) => {
      this._lastScrollYValue = value
    })

    this._dragY = new Animated.Value(0)
    this._onGestureEvent = Animated.event(
      [{ nativeEvent: { translationY: this._dragY } }],
      { useNativeDriver: false }
    )

    this._reverseLastScrollY = Animated.multiply(
      new Animated.Value(-1),
      this._lastScrollY
    )

    this._translateYOffset = new Animated.Value(END)
    this._translateY = Animated.add(
      this._translateYOffset,
      Animated.add(this._dragY, this._reverseLastScrollY)
    ).interpolate({
      inputRange: [START, END],
      outputRange: [START, END],
      extrapolate: "clamp",
    })
  }
  _onHeaderHandlerStateChange = ({ nativeEvent }: any) => {
    if (nativeEvent.oldState === State.BEGAN) {
      this._lastScrollY.setValue(0)
    }
    this._onHandlerStateChange({ nativeEvent })
  }
  _onHandlerStateChange = ({ nativeEvent }: any) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let { velocityY, translationY } = nativeEvent
      translationY -= this._lastScrollYValue
      const dragToss = 0.05
      const endOffsetY =
        (this.state as any).lastSnap + translationY + dragToss * velocityY

      let destSnapPoint = SNAP_POINTS_FROM_TOP[0]
      for (let i = 0; i < SNAP_POINTS_FROM_TOP.length; i++) {
        const snapPoint = SNAP_POINTS_FROM_TOP[i]
        const distFromSnap = Math.abs(snapPoint - endOffsetY)
        if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
          destSnapPoint = snapPoint
        }
      }
      this.setState({ lastSnap: destSnapPoint })
      this._translateYOffset.extractOffset()
      this._translateYOffset.setValue(translationY)
      this._translateYOffset.flattenOffset()
      this._dragY.setValue(0)
      Animated.spring(this._translateYOffset, {
        velocity: velocityY,
        tension: 68,
        friction: 12,
        toValue: destSnapPoint,
        useNativeDriver: false,
      }).start()
    }
  }
  render() {
    return (
      <View
        testID="BottomSheet"
        style={StyleSheet.absoluteFillObject}
        pointerEvents="box-none"
      >
        <Animated.View
          style={[
            {
              transform: [{ translateY: this._translateY }],
            },
          ]}
        >
          <PanGestureHandler
            ref={this.drawerheader as any}
            shouldCancelWhenOutside={true}
            onGestureEvent={this._onGestureEvent}
            onHandlerStateChange={this._onHeaderHandlerStateChange}
          >
            <View style={styles.header} />
          </PanGestureHandler>

          <View style={styles.container}>
            <Text
              onPress={() => {
                alert("Klik")
              }}
            >
              Blablabla
            </Text>
            <Text
              onPress={() => {
                alert("Klik")
              }}
            >
              Blablabla
            </Text>
            <Text
              onPress={() => {
                alert("Klik")
              }}
            >
              Blablabla
            </Text>
            <Text
              onPress={() => {
                alert("Klik")
              }}
            >
              Blablabla
            </Text>
            <Text
              onPress={() => {
                alert("Klik")
              }}
            >
              Blablabla
            </Text>
            <Text
              onPress={() => {
                alert("Klik")
              }}
            >
              Blablabla
            </Text>
            <Text
              onPress={() => {
                alert("Klik")
              }}
            >
              Blablabla
            </Text>
            <Text
              onPress={() => {
                alert("Klik")
              }}
            >
              Blablabla
            </Text>
            <Text
              onPress={() => {
                alert("Klik")
              }}
            >
              Blablabla
            </Text>
            <Text
              onPress={() => {
                alert("Klik")
              }}
            >
              Blablabla
            </Text>
            <Text
              onPress={() => {
                alert("Klik")
              }}
            >
              Blablabla
            </Text>
          </View>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: "red",
  },
})

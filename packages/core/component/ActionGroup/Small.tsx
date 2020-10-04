import React, { FC, useRef, useState } from "react"
import { Animated, StyleSheet, View, Platform } from "react-native"
import {
  PanGestureHandler,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler"
import { observer } from "mobx-react-lite"
import { Button } from "../Button"
import { random } from "../../util/random"

const HEADER_HEIGHT = 5
const USE_NATIVE_DRIVER = Platform.OS !== "web"

export const Small: FC<any> = observer(({ store, button }) => {
  const padding = store.app.dimension.insets.bottom
  const windowHeight = store.app.dimension.height - 5
  const SNAP_POINTS_FROM_TOP = [
    windowHeight * 0.4,
    windowHeight - HEADER_HEIGHT,
  ]
  const START = SNAP_POINTS_FROM_TOP[0]
  const END = SNAP_POINTS_FROM_TOP[SNAP_POINTS_FROM_TOP.length - 1]

  const tapGesture = useRef(null)
  const drawer = useRef(null)
  const drawerheader = useRef(null)
  const dragY = useRef(new Animated.Value(0)).current
  const translateYOffset = useRef(new Animated.Value(END)).current
  const translateY = Animated.add(translateYOffset, dragY).interpolate({
    inputRange: [START, END],
    outputRange: [START, END],
    extrapolate: "clamp",
  })

  const [lastSnap, setSnap] = useState(END)

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: dragY } }],
    { useNativeDriver: USE_NATIVE_DRIVER }
  )

  const onHandlerStateChange = ({ nativeEvent }: any) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let { velocityY, translationY } = nativeEvent
      const dragToss = 0.05
      const endOffsetY = lastSnap + translationY + dragToss * velocityY
      let destSnapPoint = SNAP_POINTS_FROM_TOP[0]
      for (let i = 0; i < SNAP_POINTS_FROM_TOP.length; i++) {
        const snapPoint = SNAP_POINTS_FROM_TOP[i]
        const distFromSnap = Math.abs(snapPoint - endOffsetY)
        if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
          destSnapPoint = snapPoint
        }
      }
      setSnap(destSnapPoint)
      translateYOffset.extractOffset()
      translateYOffset.setValue(translationY)
      translateYOffset.flattenOffset()
      dragY.setValue(0)
      Animated.spring(translateYOffset, {
        velocity: velocityY,
        tension: 68,
        friction: 12,
        toValue: destSnapPoint,
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start()
    }
  }

  return (
    <TapGestureHandler
      maxDurationMs={100000}
      ref={tapGesture}
      maxDeltaY={lastSnap - SNAP_POINTS_FROM_TOP[0]}
    >
      <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <PanGestureHandler
            ref={drawerheader}
            simultaneousHandlers={tapGesture}
            shouldCancelWhenOutside={false}
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
          >
            <Animated.View style={styles.header} />
          </PanGestureHandler>
          <PanGestureHandler
            ref={drawer}
            simultaneousHandlers={tapGesture}
            shouldCancelWhenOutside={false}
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
          >
            <Animated.View style={styles.container}>
              {button.map(({ icon, type, ...prop }: ObjectAny) => (
                <Button
                  type={"transparent_bg"}
                  {...prop}
                  key={"act_" + random()}
                  store={store}
                  style={{ marginVertical: 2 }}
                />
              ))}
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </View>
    </TapGestureHandler>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  header: {
    height: HEADER_HEIGHT,
    width: 150,
    alignSelf: "center",
    backgroundColor: "red",
  },
})

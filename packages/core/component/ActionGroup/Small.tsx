import React, { useRef, FC, useState } from "react"
import {
  PanGestureHandler,
  TapGestureHandler,
  State,
} from "react-native-gesture-handler"
import { View, StyleSheet, Animated, Platform } from "react-native"
import { Button } from "../Button"
import { IconLabel } from "../Icon"
import { random } from "../../util/random"
import { observer } from "mobx-react-lite"
import { tw, color } from "@free/tailwind"

export const Small: FC<any> = observer(({ store, button }) => {
  const winHeight =
    store.app.dimension.height - (Platform.OS == "web" ? 130 : 40)
  const insetsBottom = store.app.dimension.insets.bottom
  const boxHeight = winHeight - 116 - (button || []).length * 40
  const SNAP_POINTS_FROM_TOP = [boxHeight, winHeight]
  const START = SNAP_POINTS_FROM_TOP[0]
  const END = SNAP_POINTS_FROM_TOP[SNAP_POINTS_FROM_TOP.length - 1]
  const [lastSnap, setLastSnap] = useState(END)

  const wrapper = useRef(null)
  const drawer = useRef(null)
  const dragY = useRef(new Animated.Value(0)).current
  const offsetY = useRef(new Animated.Value(END)).current

  const translateY = Animated.add(offsetY, dragY).interpolate({
    inputRange: [START, END],
    outputRange: [START, END],
    extrapolate: "clamp",
  })

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: dragY } }],
    { useNativeDriver: false }
  )

  const onStateChange = ({ nativeEvent }: any) => {
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
      setLastSnap(destSnapPoint)
      offsetY.extractOffset()
      offsetY.setValue(translationY)
      offsetY.flattenOffset()
      dragY.setValue(0)
      Animated.spring(offsetY, {
        velocity: velocityY,
        tension: 68,
        friction: 12,
        toValue: destSnapPoint,
        useNativeDriver: true,
      }).start()
    }
  }

  return button ? (
    <View
      testID="BottomSheet"
      style={StyleSheet.flatten([StyleSheet.absoluteFillObject])}
      pointerEvents="box-none"
    >
      <TapGestureHandler ref={wrapper} maxDurationMs={100000}>
        <Animated.View
          style={[
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <PanGestureHandler
            ref={drawer}
            simultaneousHandlers={[wrapper]}
            shouldCancelWhenOutside={true}
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onStateChange}
          >
            <Animated.View>
              <IconLabel
                styleContainer={StyleSheet.flatten([styles.rootHeader])}
                name={"chevron-up"}
                color={"black"}
              />
            </Animated.View>
          </PanGestureHandler>
          <View style={[styles.rootContent, { paddingVertical: insetsBottom }]}>
            {button.map(({ icon, type, ...prop }: ObjectAny) => (
              <Button
                type={"transparent_bg"}
                {...prop}
                key={"act_" + random()}
                store={store}
                style={{ marginVertical: 2 }}
              />
            ))}
            <Button
              type={"transparent_bg"}
              store={store}
              style={{ marginTop: 12 }}
            >
              Close
            </Button>
          </View>
        </Animated.View>
      </TapGestureHandler>
    </View>
  ) : null
})

const styles = StyleSheet.create({
  rootHeader: tw("items-center justify-center h-10"),
  rootContent: tw("px-3 bg-black-300"),
})

import React, { FC, useRef, useState } from "react"
import { Animated, StyleSheet, View, Platform } from "react-native"
import {
  PanGestureHandler,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler"
import { observer } from "mobx-react-lite"
import { Button, IconLabel } from ".."
import { random } from "../../util/random"
import { tw } from "@free/tailwind"

const HEADER_HEIGHT = 20
const USE_NATIVE_DRIVER = Platform.OS !== "web"

const Single: FC<any> = observer(({ store, actions }) => {
  return (
    <Button
      {...actions[0]}
      store={store}
      style={styles.single}
      type={"single_button_bg"}
    />
  )
})
const Multi: FC<any> = observer(({ store, actions }) => {
  const isShow = actions.length != 0 && store.app.dimension.isMobile
  const padding = store.app.dimension.insets.bottom || 20
  const windowHeight = store.app.dimension.height - 5
  const SNAP_POINTS_FROM_TOP = [
    windowHeight - HEADER_HEIGHT - padding * 2 - (actions || []).length * 40,
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

  return isShow ? (
    <TapGestureHandler
      maxDurationMs={100000}
      ref={tapGesture}
      maxDeltaY={lastSnap - SNAP_POINTS_FROM_TOP[0]}
    >
      <View
        style={StyleSheet.absoluteFillObject}
        pointerEvents="box-none"
        testID="BottomSheet"
      >
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
            <Animated.View style={styles.header}>
              <IconLabel
                name={lastSnap === END ? "chevron-up" : "chevron-down"}
                color={"black"}
              />
            </Animated.View>
          </PanGestureHandler>
          <PanGestureHandler
            ref={drawer}
            simultaneousHandlers={tapGesture}
            shouldCancelWhenOutside={false}
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
          >
            <Animated.View
              style={StyleSheet.flatten([styles.container, { padding }])}
            >
              {actions.map(({ icon, type, ...prop }: ObjectAny) => (
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
  ) : null
})

export const Small: FC<any> = observer(({ store, actions }) => {
  actions = actions.filter(
    (act: ObjectAny) => act.children !== "Delete" && act.children !== "Close"
  )

  return actions.length == 0 ? null : actions.length == 1 ? (
    <Single store={store} actions={actions} />
  ) : (
    <Multi store={store} actions={actions} />
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(92,92,92,0.5)",
  },
  header: tw("items-center"),
  single: tw("absolute bottom-0 right-0 mb-3 mr-3 shadow-md h-12", {
    minWidth: 100,
  }),
})

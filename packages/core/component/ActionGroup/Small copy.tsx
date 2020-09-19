import React, { useRef, FC, useState, useEffect } from "react"
import {
  PanGestureHandler,
  TapGestureHandler,
  State,
} from "react-native-gesture-handler"
import { View, StyleSheet, Animated, Platform } from "react-native"
import { Button } from "../Button"
import { IconButton } from "../Icon"
import { random } from "../../util/random"
import { observer } from "mobx-react-lite"
import { tw, color } from "@free/tailwind"

export const Small: FC<any> = observer(({ store, button }) => {
  const winHeight =
    store.app.dimension.height - (Platform.OS == "web" ? 130 : 190)
  const boxHeight = winHeight - (button || []).length * 48 - 58
  const [isOpen, setOpen] = useState(false)
  const wrapper = useRef(null)
  const drawer = useRef(null)
  const dragY = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(winHeight)).current
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: dragY } }],
    { useNativeDriver: false }
  )

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isOpen ? boxHeight : winHeight,
      duration: 120,
      useNativeDriver: false,
    }).start()
  }, [isOpen])

  const onStateChange = ({ nativeEvent }: any) => {
    if (nativeEvent.oldState === State.BEGAN) {
      setOpen((dragY as any)._value < 0)
    }
  }

  return button ? (
    <View
      testID="BottomSheet"
      style={StyleSheet.flatten([
        StyleSheet.absoluteFillObject,
        styles.rootSheet,
      ])}
      pointerEvents="box-none"
    >
      <TapGestureHandler
        ref={wrapper}
        maxDurationMs={100000}
        maxDeltaY={boxHeight}
      >
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
            <View>
              <IconButton
                //              onPress={() => setOpen(!isOpen)}
                styleContainer={styles.rootHeader}
                name={isOpen ? "chevron-down" : "chevron-up"}
                color={color("bg-gray-600")}
              />
              <View style={styles.rootContent}>
                {button.map(({ icon, type, ...prop }: ObjectAny) => (
                  <Button
                    {...prop}
                    key={"act_" + random()}
                    store={store}
                    style={{ marginVertical: 2 }}
                  />
                ))}
                <Button
                  store={store}
                  style={{ marginTop: 8, marginBottom: 2 }}
                  onPress={() => setOpen(false)}
                >
                  Close
                </Button>
              </View>
            </View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    </View>
  ) : null
})

const styles = StyleSheet.create({
  rootSheet: tw("mx-1"),
  rootSmall: tw("absolute"),
  rootHeader: tw("items-center"),
  rootContent: tw("flex-1 p-3 bg-black-500 flex-col"),
})

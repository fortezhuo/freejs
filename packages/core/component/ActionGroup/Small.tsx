import React, { useRef, FC } from "react"
import { PanGestureHandler, State } from "react-native-gesture-handler"
import { View, StyleSheet, Animated, Platform } from "react-native"
import { Button } from "../Button"
import { Icon } from "../Icon"
import { random } from "../../util/random"
import { observer } from "mobx-react-lite"
import { tw, color } from "@free/tailwind"

export const Small: FC<any> = observer(({ store, button }) => {
  const drawer = useRef(null)
  const dragY = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(550)).current
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: dragY } }],
    { useNativeDriver: false }
  )
  const onStateChange = ({ nativeEvent }: any) => {
    if (nativeEvent.oldState === State.BEGAN) {
      if ((dragY as any)._value < 0) {
        Animated.timing(translateY, {
          toValue: 200,
          duration: 120,
          useNativeDriver: Platform.OS !== "web",
        }).start()
      } else {
        Animated.timing(translateY, {
          toValue: 550,
          duration: 120,
          useNativeDriver: Platform.OS !== "web",
        }).start()
      }
    }
  }

  return (
    <View
      testID="BottomSheet"
      style={StyleSheet.flatten([
        StyleSheet.absoluteFillObject,
        styles.rootSheet,
      ])}
      pointerEvents="box-none"
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
          shouldCancelWhenOutside={true}
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onStateChange}
        >
          <View>
            <View style={styles.rootHeader}>
              <Icon name="chevron-up" color={color("bg-gray-600")} />
            </View>
            {button && (
              <View style={styles.rootContent}>
                {button.map(({ icon, type, ...prop }: ObjectAny) => (
                  <Button
                    {...prop}
                    key={"act_" + random()}
                    store={store}
                    style={{ marginVertical: 2 }}
                  />
                ))}
              </View>
            )}
          </View>
        </PanGestureHandler>
      </Animated.View>
    </View>
  )
})

const styles = StyleSheet.create({
  rootSheet: tw("mx-1"),
  rootSmall: tw("absolute"),
  rootHeader: tw("items-center"),
  rootContent: tw("flex-1 bg-white"),
})

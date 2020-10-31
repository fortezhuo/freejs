import React, { useEffect, useMemo, FC } from "react"
import {
  Animated,
  View,
  StyleSheet,
  Easing,
  ViewStyle,
  Platform,
} from "react-native"
import { LinearGradient } from "../Gradient/Linear"
import { tw, color } from "@free/tailwind"

const GRADIENT_START = { x: 0, y: 0 }
const GRADIENT_END = { x: 1, y: 0 }
const backgroundColor = color("bg-gray-300")
const highlightColor = color("bg-gray-100")
const speed = 800

const Skeleton: FC<any> = ({ style }): JSX.Element => {
  const animatedValue = useMemo(() => new Animated.Value(0), [])
  const translateX = useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-350, 350],
      }),
    [animatedValue]
  )

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: speed,
        easing: Easing.ease,
        useNativeDriver: Platform.OS !== "web",
      })
    )
    loop.start()
    return () => loop.stop()
  }, [animatedValue, speed])

  const absoluteTranslateStyle = useMemo(
    () => ({ ...StyleSheet.absoluteFillObject, transform: [{ translateX }] }),
    [translateX]
  )
  const gradientColors = useMemo(
    () => [backgroundColor, highlightColor, backgroundColor],
    [backgroundColor, highlightColor]
  )

  const viewStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor,
      overflow: "hidden",
    }),
    [backgroundColor]
  )

  return (
    <View style={styles.viewSkeleton}>
      <View style={StyleSheet.flatten([style, styles.viewClear, viewStyle])}>
        <Animated.View style={absoluteTranslateStyle}>
          <LinearGradient
            colors={gradientColors}
            start={GRADIENT_START}
            end={GRADIENT_END}
            style={styles.gradient}
          />
        </Animated.View>
      </View>
    </View>
  )
}

export const Base: FC<any> = ({ isLoading, style, children }) => {
  return (
    <View
      style={StyleSheet.flatten([
        style,
        isLoading ? [styles.viewClear, styles.viewBase] : {},
      ])}
    >
      {isLoading ? <Skeleton style={style} /> : children}
    </View>
  )
}

const styles = StyleSheet.create({
  viewBase: {
    minWidth: undefined,
    width: undefined,
    backgroundColor: undefined,
  },
  viewClear: {
    borderWidth: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    flexDirection: undefined,
    alignItems: undefined,
  },
  viewSkeleton: tw("relative"),
  gradient: {
    flex: 1,
  },
})

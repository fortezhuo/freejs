import React from "react"
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
const backgroundColor = color("bg-gray-100")
const highlightColor = color("bg-gray-50")
const speed = 800

const Skeleton: React.FC<{ style?: JSONObject }> = ({ style }) => {
  const animatedValue = React.useMemo(() => new Animated.Value(0), [])
  const translateX = React.useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-350, 350],
      }),
    [animatedValue]
  )

  React.useEffect(() => {
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

  const absoluteTranslateStyle = React.useMemo(
    () => ({ ...StyleSheet.absoluteFillObject, transform: [{ translateX }] }),
    [translateX]
  )
  const gradientColors = React.useMemo(
    () => [backgroundColor, highlightColor, backgroundColor],
    [backgroundColor, highlightColor]
  )

  const viewStyle = React.useMemo<ViewStyle>(
    () => ({
      backgroundColor,
      overflow: "hidden",
    }),
    [backgroundColor]
  )

  return (
    <View style={s.viewSkeleton}>
      <View style={[style, s.viewClear, viewStyle]}>
        <Animated.View style={absoluteTranslateStyle}>
          <LinearGradient
            colors={gradientColors}
            start={GRADIENT_START}
            end={GRADIENT_END}
            style={s.gradient}
          />
        </Animated.View>
      </View>
    </View>
  )
}

interface Base {
  isLoading?: boolean
  style?: JSONObject
  children?: any
}

export const Base: React.FC<Base> = ({ isLoading, style, children }) => {
  return (
    <View style={[style, isLoading ? [s.viewClear, s.viewBase] : {}]}>
      {isLoading ? <Skeleton style={style} /> : children}
    </View>
  )
}

const s = StyleSheet.create({
  viewBase: {
    minWidth: undefined,
    width: undefined,
    backgroundColor: undefined,
  },
  viewClear: {
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    flexDirection: undefined,
    alignItems: undefined,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
  },
  viewSkeleton: tw("relative"),
  gradient: {
    flex: 1,
  },
})

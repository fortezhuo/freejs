import React from "react"
import Animated, { Easing } from "react-native-reanimated"

const {
  Value,
  block,
  startClock,
  Clock,
  cond,
  eq,
  timing,
  set,
  useCode,
  and,
} = Animated

interface Wrapper {
  children: React.ReactNode
  isExpand: any
  initOpen?: any
}

export const Wrapper: React.FC<Wrapper> = ({
  children,
  isExpand,
  initOpen = false,
}) => {
  const childrenHeight = React.Children.count(children) * 46
  const clock = new Clock()
  const height = new Value(childrenHeight)

  let { animatedHeight, initOpenDone } = React.useRef({
    animatedHeight: new Value(0),
    initOpenDone: new Value(0),
  }).current

  useCode(() => {
    const state = {
      position: animatedHeight,
      finished: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    }
    const config = {
      toValue: height,
      duration: 100,
      easing: Easing.linear,
    }

    return block([
      cond(and(eq(initOpen, 1), eq(initOpenDone, 0)), [
        set(animatedHeight, height),
        set(initOpenDone, 1),
      ]),
      cond(eq(isExpand, initOpen ? 0 : 1), [
        set(config.toValue, height),
        startClock(clock),
        timing(clock, state, config),
      ]),
      cond(eq(isExpand, initOpen ? 1 : 0), [
        set(config.toValue, 0),
        startClock(clock),
        timing(clock, state, config),
      ]),
    ])
  }, [isExpand])

  return (
    <Animated.View
      style={{
        overflow: "hidden",
        height: initOpen ? height : animatedHeight,
      }}
    >
      {children}
    </Animated.View>
  )
}

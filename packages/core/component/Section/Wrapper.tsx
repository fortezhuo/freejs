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
  style?: any
}

export const Wrapper: React.FC<Wrapper> = ({
  children,
  isExpand,
  initOpen = true,
}) => {
  const [isMount, setMount] = React.useState(false)
  const [h, setHeight] = React.useState(0)
  const clock = new Clock()

  const animatedHeight = React.useMemo(() => new Value(initOpen ? h : 0), [
    isMount,
  ])

  useCode(() => {
    const height = new Value(h)
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
      cond(eq(isExpand, initOpen ? 1 : 0), [
        set(config.toValue, height),
        startClock(clock),
        timing(clock, state, config),
      ]),
      cond(eq(isExpand, initOpen ? 0 : 1), [
        set(config.toValue, 0),
        startClock(clock),
        timing(clock, state, config),
      ]),
    ])
  }, [isExpand, h])

  return (
    <Animated.View
      collapsable={false}
      onLayout={(e) => {
        if (!isMount) {
          setHeight(e.nativeEvent.layout.height)
          setMount(true)
        }
      }}
      style={{
        overflow: "hidden",
        height: !isMount && initOpen ? undefined : animatedHeight,
      }}
    >
      {children}
    </Animated.View>
  )
}

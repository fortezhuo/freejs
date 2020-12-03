import React from "react"
import { View, useWindowDimensions } from "react-native"

export const LinearGradient: React.FC<any> = ({
  start = {
    x: 0.5,
    y: 0,
  },
  end = {
    x: 0.5,
    y: 1,
  },
  locations = [],
  colors = [],
  useAngle = false,
  angle = 0,
  angleCenter,
  style,
  children,
  testID,
  ...props
}) => {
  const { width, height } = useWindowDimensions()

  const getColors = React.useCallback(
    () =>
      colors
        .map((color: string, index: number) => {
          const location = locations[index]
          let locationStyle = ""
          if (location) {
            locationStyle = " " + location * 100 + "%"
          }
          return color + locationStyle
        })
        .join(","),
    [colors]
  )

  const getAngle = React.useCallback(() => {
    if (useAngle) {
      return angle + "deg"
    }

    return (
      Math.atan2(width * (end.y - start.y), height * (end.x - start.x)) +
      Math.PI / 2 +
      "rad"
    )
  }, [])

  return (
    <View
      {...props}
      style={[
        style,
        {
          backgroundImage: `linear-gradient(${getAngle()},${getColors()})`,
        },
      ]}
      testID={testID}
    >
      {children}
    </View>
  )
}

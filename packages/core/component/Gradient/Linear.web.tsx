import React from "react"
import { View, Dimensions } from "react-native"

interface LinearGradient {
  start?: JSONObject
  end?: JSONObject
  locations?: number[]
  colors?: string[]
  angle?: number
  style?: JSONObject
  testID?: string
}

export const LinearGradient: React.FC<LinearGradient> = ({
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
  angle,
  style,
  children,
  testID,
  ...props
}) => {
  const { width, height } = Dimensions.get("window")

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
    if (angle) {
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

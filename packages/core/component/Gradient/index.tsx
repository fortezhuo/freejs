import React, { FC } from "react"
import LinearGradient from "react-native-linear-gradient"
import { color } from "@free/tailwind"
import { GradientProps } from "@free/core"

export const Gradient: FC<GradientProps> = ({
  children,
  style,
  type = "horizontal",
  colors,
}) => {
  const gradient = colors.map((val: string) => color(val))
  const end = type === "vertical" ? { x: 0, y: 1 } : { x: 1, y: 0 }
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={end}
      colors={gradient}
      style={style}
    >
      {children}
    </LinearGradient>
  )
}

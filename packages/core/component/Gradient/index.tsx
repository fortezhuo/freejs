import React from "react"
import { LinearGradient } from "./Linear"
import { color } from "@free/tailwind"
import { GradientProps } from "@free/core"

export const Gradient: React.FC<GradientProps> = ({
  children,
  style,
  type = "horizontal",
  colors,
  testID,
}) => {
  const gradient = colors.map((val: string) => color(val))
  const end = type === "vertical" ? { x: 0, y: 1 } : { x: 1, y: 0 }
  return (
    <LinearGradient
      testID={testID}
      start={{ x: 0, y: 0 }}
      end={end}
      colors={gradient}
      style={style}
    >
      {children}
    </LinearGradient>
  )
}

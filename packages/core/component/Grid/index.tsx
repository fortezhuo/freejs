import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"
import { useHook } from "./hook"

interface Row {
  nowrap?: boolean
  dark?: boolean
  smHidden?: boolean
  mdHidden?: boolean
  lgHidden?: boolean
  xlHidden?: boolean
  children: React.ReactNode
  style?: JSONObject
}

// Col
interface Col {
  light?: boolean
  sm?: number
  smHidden?: boolean
  md?: number
  mdHidden?: boolean
  lg?: number
  lgHidden?: boolean
  xl?: number
  xlHidden?: boolean
  style?: JSONObject
  children?: any
}

export const Row: React.FC<Row> = ({
  nowrap,
  smHidden,
  mdHidden,
  lgHidden,
  xlHidden,
  style,
  children,
  dark = false,
  ...rest
}) => {
  const { isHidden } = useHook()
  const isShow = !isHidden({ smHidden, mdHidden, lgHidden, xlHidden })
  return isShow ? (
    <View
      {...rest}
      style={[
        style,
        s.viewRow,
        dark ? s.viewRowDark : {},
        {
          flexWrap: nowrap ? "nowrap" : "wrap",
        },
      ]}
    >
      {children}
    </View>
  ) : null
}

export const Col: React.FC<Col> = ({
  sm,
  smHidden,
  md,
  mdHidden,
  lg,
  lgHidden,
  xl,
  xlHidden,
  style,
  children,
  light,
  ...rest
}) => {
  const { isHidden, getWidth } = useHook()
  const isShow = !isHidden({ smHidden, mdHidden, lgHidden, xlHidden })
  const width = getWidth({
    xl: xl ? xl : lg ? lg : md ? md : sm || 12,
    lg: lg ? lg : md ? md : sm || 12,
    md: md ? md : sm || 12,
    sm: sm || 12,
  })
  return isShow ? (
    <View
      {...rest}
      style={[
        s.viewColumn,
        light ? s.viewColumnLight : {},
        style,
        tw(`${width}`),
      ]}
    >
      {children}
    </View>
  ) : null
}

export const Label: React.FC = ({ children }) => {
  return <Text style={s.textLabel}>{children}</Text>
}

const s = StyleSheet.create({
  viewRow: tw(`flex-row shadow-sm`, { margin: 1 }),
  viewRowDark: tw("bg-gray-100"),
  viewColumn: tw("p-2 flex-col justify-center"),
  viewColumnLight: tw("bg-white"),
  textLabel: tw(`${theme.default_text} p-1`),
})

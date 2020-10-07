import React, { FC } from "react"
import { View, StyleSheet, Text } from "react-native"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"
import { useHook } from "./hook"
import { observer } from "mobx-react-lite"
import { GridRowProps, GridColProps } from "@free/core"

export const Row: FC<GridRowProps> = observer(
  ({
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
        style={StyleSheet.flatten([
          style,
          styles.viewRow,
          dark ? styles.viewRowDark : {},
          {
            flexWrap: nowrap ? "nowrap" : "wrap",
          },
        ])}
      >
        {children}
      </View>
    ) : null
  }
)

export const Col: FC<GridColProps> = observer(
  ({
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
        style={StyleSheet.flatten([
          styles.viewColumn,
          light ? styles.viewColumnLight : {},
          style,
          tw(`${width}`),
        ])}
      >
        {children}
      </View>
    ) : null
  }
)

export const Label: FC = observer(({ children }) => {
  return <Text style={styles.textLabel}>{children}</Text>
})

const styles = StyleSheet.create({
  viewRow: tw(`flex-row shadow-sm`, { margin: 1 }),
  viewRowDark: { backgroundColor: "rgba(0,0,0,0.05)" },
  viewColumn: tw("p-2 flex-col justify-center"),
  viewColumnLight: tw("bg-white"),
  textLabel: tw(`${theme.input_text} p-1`),
})

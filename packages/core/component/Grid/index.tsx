import React, { FC } from "react"
import { View, StyleSheet, ScrollView, Text } from "react-native"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"
import { useHook } from "./hook"
import { observer } from "mobx-react-lite"
import { GridRowProps, GridColProps } from "@free/core"

export const Main: FC = ({ children }) => {
  return (
    <View style={styles.viewMain}>
      <ScrollView>{children}</ScrollView>
    </View>
  )
}

export const Row: FC<GridRowProps> = observer(
  ({
    nowrap,
    smHidden,
    mdHidden,
    lgHidden,
    xlHidden,
    style,
    children,
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
    input,
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
          input ? styles.viewInput : {},
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
  viewMain: tw("flex-1 p-1 mt-1 bg-white-700"),
  viewRow: { marginBottom: 1, ...tw(`flex-row`) },
  viewColumn: tw("flex-col p-2"),
  viewInput: tw(
    `${theme.grid_column_input_border} ${theme.grid_column_input_bg} py-3`
  ),
  textLabel: tw(`${theme.grid_label}`),
})

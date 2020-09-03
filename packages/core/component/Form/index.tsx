import React, { FC } from "react"
import { View, StyleSheet, ScrollView, Text } from "react-native"
import { theme } from "../../config/theme"
import { tw } from "@free/tailwind"
import { useHook } from "./hook"
import { observer } from "mobx-react-lite"
import { FormRowProps, FormColProps } from "@free/core"

export const Main: FC = ({ children }) => {
  return (
    <View style={styles.rootMain}>
      <ScrollView>{children}</ScrollView>
    </View>
  )
}

export const Row: FC<FormRowProps> = observer(
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
          styles.rootRow,
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

export const Col: FC<FormColProps> = observer(
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
          style,
          input ? styles.colInput : {},
          styles.rootCol,
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
  rootMain: tw("flex-1 p-1 mt-1 bg-white-700"),
  rootRow: tw(`${theme.bgFormRow} flex-row mb-1`),
  rootCol: tw("flex-col p-2"),
  colInput: tw(`${theme.borderFormCol} ${theme.bgFormInput}`),
  textLabel: tw(theme.textFormLabel),
})

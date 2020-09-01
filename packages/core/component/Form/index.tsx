import React, { FC } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { tw } from "@free/tailwind"
import { useHook } from "./hook"
import { observer } from "mobx-react-lite"
import { FormRowProps } from "@free/core"

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

export const Col: FC<any> = observer(
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
    ...rest
  }) => {
    const { isHidden, getWidth } = useHook()
    const isShow = !isHidden({ smHidden, mdHidden, lgHidden, xlHidden })
    const width = getWidth({ sm, md, lg, xl })
    return isShow ? (
      <View
        {...rest}
        style={StyleSheet.flatten([style, tw(`flex-col ${width}`)])}
      >
        {children}
      </View>
    ) : null
  }
)

const styles = StyleSheet.create({
  rootMain: tw("flex-1 p-1 mt-1 bg-white-700"),
  rootRow: tw("flex-row"),
})

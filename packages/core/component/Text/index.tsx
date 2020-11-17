import React from "react"
import { Text as RNText, StyleSheet, TextProps } from "react-native"
import { tw } from "@free/tailwind"

export const Text: React.FC<TextProps> = ({ children, style }) => {
  return (
    <RNText style={StyleSheet.flatten([styles.text, style])}>{children}</RNText>
  )
}

export const H1: React.FC<TextProps> = ({ children, style }) => {
  return (
    <RNText style={StyleSheet.flatten([styles.text, styles.h1, style])}>
      {children}
    </RNText>
  )
}

export const H2: React.FC<TextProps> = ({ children, style }) => {
  return (
    <RNText style={StyleSheet.flatten([styles.text, styles.h2, style])}>
      {children}
    </RNText>
  )
}
export const H3: React.FC<TextProps> = ({ children, style }) => {
  return (
    <RNText style={StyleSheet.flatten([styles.text, styles.h3, style])}>
      {children}
    </RNText>
  )
}

export const H4: React.FC<TextProps> = ({ children, style }) => {
  return (
    <RNText style={StyleSheet.flatten([styles.text, styles.h4, style])}>
      {children}
    </RNText>
  )
}

export const H5: React.FC<TextProps> = ({ children, style }) => {
  return (
    <RNText style={StyleSheet.flatten([styles.text, styles.h5, style])}>
      {children}
    </RNText>
  )
}

const styles = StyleSheet.create({
  text: tw("text-gray-900"),
  h1: tw("text-4xl"),
  h2: tw("text-3xl"),
  h3: tw("text-2xl"),
  h4: tw("text-xl"),
  h5: tw("text-lg"),
})

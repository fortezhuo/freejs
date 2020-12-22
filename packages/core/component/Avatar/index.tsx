import React from "react"
import { View, Image, StyleSheet } from "react-native"
import { IconLabel } from "../Icon"
import { tw } from "@free/tailwind"

export const Avatar: React.FC<any> = ({
  style,
  styleContainer,
  source,
  name,
  size = 24,
}) => {
  return name ? (
    <IconLabel
      size={size}
      name={name}
      styleContainer={StyleSheet.create([s.viewLogo, styleContainer])}
      style={style}
    />
  ) : (
    <View style={s.viewLogo}>
      <Image source={source} style={style} />
    </View>
  )
}

const s = StyleSheet.create({
  viewLogo: tw("self-center rounded-full p-2"),
})

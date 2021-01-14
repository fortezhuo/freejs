import React from "react"
import { View, Image, StyleSheet } from "react-native"
import { Icon } from "../Icon"
import { tw } from "@free/tailwind"

interface Avatar {
  style?: JSONObject
  styleContainer?: JSONObject
  source: any
  name?: string
  size?: number
}

export const Avatar: React.FC<Avatar> = ({
  style,
  styleContainer,
  source,
  name,
  size = 24,
}) => {
  return name ? (
    <View style={[s.viewLogo, styleContainer, style]}>
      <Icon size={size} name={name} />
    </View>
  ) : (
    <View style={s.viewLogo}>
      <Image source={source} style={style} />
    </View>
  )
}

const s = StyleSheet.create({
  viewLogo: tw("self-center rounded-full p-2"),
})

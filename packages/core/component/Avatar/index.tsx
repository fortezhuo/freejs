import React from "react"
import { View, Image, StyleSheet } from "react-native"
import { IconLabel } from "../Icon"
import { observer } from "mobx-react-lite"
import { tw } from "@free/tailwind"

export const Avatar: React.FC<any> = observer(
  ({ style, styleContainer, source, name, size = 24 }) => {
    return name ? (
      <IconLabel
        size={size}
        name={name}
        styleContainer={StyleSheet.create([styles.viewLogo, styleContainer])}
        style={style}
      />
    ) : (
      <View style={styles.viewLogo}>
        <Image source={source} style={style} />
      </View>
    )
  }
)

const styles = StyleSheet.create({
  viewLogo: tw("self-center rounded-full p-2"),
})

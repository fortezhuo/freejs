import React, { FC } from "react"
import { View, Image, StyleSheet } from "react-native"
import { IconLabel } from "../Icon"
import { observer } from "mobx-react-lite"
import { tw } from "@free/tailwind"

export const Avatar: FC<any> = observer(
  ({ style, styleContainer, source, name, size = 24 }) => {
    return name ? (
      <IconLabel
        size={size}
        name={name}
        styleContainer={StyleSheet.create([styles.iconLogo, styleContainer])}
        style={style}
      />
    ) : (
      <View style={styles.iconLogo}>
        <Image source={source} style={style} />
      </View>
    )
  }
)

const styles = StyleSheet.create({
  iconLogo: tw("self-center rounded-full p-2"),
})

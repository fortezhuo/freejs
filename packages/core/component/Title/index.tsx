import React, { FC } from "react"
import { configApp } from "@free/env"
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { useStore } from "../Store"
import { observer } from "mobx-react-lite"
import { TitleProps } from "@free/core"
import { theme } from "../../config/theme"
import logo from "../../img/logo.png"

const Logo: FC = () => {
  return <Image source={logo} style={styles.imgTitle} />
}

export const Title: FC<TitleProps> = observer(
  ({ children, testID = "Title" }) => {
    const disabled = false
    const { app } = useStore()
    return (
      <TouchableOpacity disabled={disabled} onPress={() => app.goto("/")}>
        <View style={styles.rootTitle} testID={testID}>
          <Logo />
          <View style={styles.groupTitle}>
            <Text style={styles.textTitle}>{configApp.displayName}</Text>
            {children && <Text style={styles.textSubTitle}>{children}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
)

const styles = StyleSheet.create({
  rootTitle: tw("flex-row items-center"),
  imgTitle: tw("h-10 w-10 mr-3"),
  groupTitle: tw("flex-col"),
  textTitle: tw(`${theme.textTitle} text-xl`),
  textSubTitle: tw(`${theme.textTitle} text-xs`),
})

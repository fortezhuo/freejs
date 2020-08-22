import React, { FC } from "react"
import { configApp } from "@free/env"
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { useStore } from "../Store"
import logo from "../../img/logo.png"
import { observer } from "mobx-react-lite"

const Logo: FC = () => {
  return <Image source={logo} style={styles.imgTitle} />
}

export const Title: FC = observer(({ children }) => {
  const disabled = false
  const { ui } = useStore()
  return (
    <TouchableOpacity disabled={disabled} onPress={() => ui.history.push("/")}>
      <View style={styles.rootTitle}>
        <Logo />
        <View style={styles.groupTitle}>
          <Text style={styles.textTitle}>{configApp.displayName}</Text>
          {children && <Text style={styles.textSubTitle}>{children}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  rootTitle: tw("flex-row items-center"),
  imgTitle: tw("h-10 w-10 mr-3"),
  groupTitle: tw("flex-col"),
  textTitle: tw("text-white text-xl"),
  textSubTitle: tw("text-white text-xs"),
})

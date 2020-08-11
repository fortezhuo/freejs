import React, { FC } from "react"
import { configApp } from "@free/config"
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { useHistory } from "../Router"
import logo from "../../img/logo.png"
import { observer } from "mobx-react-lite"

const Logo: FC = () => {
  return <Image source={logo} style={styles.imgTitle} />
}

export const Title: FC = observer(({ children }) => {
  const disabled = false
  const { push } = useHistory()
  return (
    <TouchableOpacity disabled={disabled} onPress={() => push("/")}>
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

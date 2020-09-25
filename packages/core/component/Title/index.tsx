import React, { FC } from "react"
import { configApp } from "@free/env"
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ViewProps,
} from "react-native"
import { tw } from "@free/tailwind"
import { useStore } from "../Store"
import { observer } from "mobx-react-lite"
import logo from "../../img/logo.png"

const Logo: FC = () => {
  return <Image source={logo} style={styles.imgTitle} />
}

export const Title: FC<ViewProps> = observer(({ testID = "Title" }) => {
  const disabled = false
  const { app } = useStore()
  return (
    <TouchableOpacity disabled={disabled} onPress={() => app.goto("/")}>
      <View style={styles.layoutTitle} testID={testID}>
        <Logo />
        <View style={styles.groupTitle}>
          <Text style={styles.textTitle}>{configApp.displayName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  layoutTitle: tw("flex-row items-center p-4 pl-5"),
  imgTitle: tw("h-10 w-10 mr-3"),
  groupTitle: tw("flex-col"),
  textTitle: tw(`text-xl`),
  textSubTitle: tw(`text-xs`),
})

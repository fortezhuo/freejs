import React from "react"
import { configApp } from "@free/env"
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import logo from "../../img/logo.png"

const Logo: React.FC = () => {
  return <Image source={logo} style={s.imgTitle} />
}

export const Title: React.FC<any> = observer(
  ({ testID = "Title", navigation }) => {
    const disabled = false
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => navigation.navigate("Index")}
      >
        <View style={s.layoutTitle} testID={testID}>
          <Logo />
          <View style={s.groupTitle}>
            <Text style={s.textTitle}>{configApp.displayName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
)

const s = StyleSheet.create({
  layoutTitle: tw("flex-row items-center p-4 pl-5"),
  imgTitle: tw("h-10 w-10 mr-3"),
  groupTitle: tw("flex-col"),
  textTitle: tw(`text-xl`),
  textSubTitle: tw(`text-xs`),
})

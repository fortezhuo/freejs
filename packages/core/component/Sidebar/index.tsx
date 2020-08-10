import React, { FC } from "react"
import { View, StyleSheet, Text } from "react-native"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { useHistory } from "../Router"

export const Sidebar: FC<any> = observer(({ toggle }) => {
  return (
    <View style={styles.rootSidebar}>
      <Text>Sidebar</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  rootSidebar: tw("flex-no-wrap w-64"),
})

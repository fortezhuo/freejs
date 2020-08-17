import React, { useRef, useEffect, FC } from "react"
import { View, ScrollView, Text, StyleSheet, TextInput } from "react-native"
import { useMenu } from "../../component/Menu"
import { observer } from "mobx-react-lite"
import { tw } from "@free/tailwind"

const Home = observer(() => {
  const { show, hide, Menu } = useMenu()

  return (
    <View style={styles.rootHome}>
      <ScrollView>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Menu
          anchor={
            <Text style={{ width: 100 }} onPress={show}>
              Hello
            </Text>
          }
        >
          <View style={{ height: 200, width: 200, backgroundColor: "red" }}>
            <TextInput style={{ backgroundColor: "white" }} />
            <Text>2</Text>
            <Text>2</Text>
            <Text>2</Text>
            <Text>2</Text>
            <Text>2</Text>
            <Text>2</Text>
            <Text>2</Text>
          </View>
        </Menu>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
      </ScrollView>
    </View>
  )
})

const styles = StyleSheet.create({
  rootHome: tw("flex-1"),
})

export default Home

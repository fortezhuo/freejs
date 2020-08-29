import React, { FC } from "react"
import { View, ScrollView, Text, StyleSheet, TextInput } from "react-native"
import { useMenu } from "../../component/Menu"
import { Layout } from "../../component/Layout"
import { observer, useLocalStore } from "mobx-react-lite"
import { tw } from "@free/tailwind"

const PageHome: FC = observer(() => {
  const { show, hide, Menu } = useMenu()
  const store = useLocalStore(() => ({
    title: "Main",
    drawer: true,
  }))

  return (
    <Layout store={store}>
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
    </Layout>
  )
})

const styles = StyleSheet.create({
  rootHome: tw("flex-1"),
})

export default PageHome

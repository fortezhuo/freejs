import React from "react"
import { H3, H5, Text } from "../../component/Text"
import { Layout } from "../../component/Layout"
import { Avatar } from "../../component/Avatar"
import { Button } from "../../component/Button"
import { View, StyleSheet, ScrollView } from "react-native"
import { useHook } from "./hook"
import logo from "../../img/logo.png"
import { tw } from "@free/tailwind"
import { observer, useLocalStore } from "mobx-react-lite"

const PageError = observer(() => {
  const store = useHook()
  const state = useLocalStore(() => ({
    isShow: false,
    toggle() {
      state.isShow = !state.isShow
    },
  }))
  const fatalError = (store?.fatalError as any)?.data || {}
  return (
    <Layout store={store}>
      <View style={styles.rootPageError}>
        <Avatar
          source={logo}
          styleContainer={styles.rootAvatar}
          style={styles.imgAvatar}
        />
        <H3 style={styles.titleError}>Oops...</H3>
        <H5>{fatalError.message}</H5>
        <View style={styles.buttonGroup}>
          <Button
            type="primary"
            icon="home"
            store={store}
            onPress={() => {
              store.set("fatalError", undefined)
              store.goto("/")
            }}
          >
            Back to Home
          </Button>
          <Button
            store={store}
            type="danger"
            icon="layers"
            onPress={state.toggle}
          >
            Show Stack Information
          </Button>
        </View>
        {state.isShow && (
          <View style={styles.rootStack} testID="Stack">
            <ScrollView>
              <Text>{fatalError.stack}</Text>
            </ScrollView>
          </View>
        )}
      </View>
    </Layout>
  )
})

const styles = StyleSheet.create({
  rootPageError: tw("flex-1 mt-5 items-center"),
  rootAvatar: tw("border-2 border-solid border-white bg-blue-500"),
  titleError: tw("mt-5 mb-3"),
  buttonGroup: tw("flex-row m-5 justify-evenly w-1/3"),
  rootStack: tw("flex-1 w-full p-2 bg-white-500"),
  imgAvatar: tw("w-20 h-20"),
})

export default PageError

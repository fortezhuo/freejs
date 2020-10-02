import React from "react"
import { View, StyleSheet } from "react-native"
import { H4, Text } from "../../component/Text"
import { Layout } from "../../component/Layout"
import { useHook } from "./hook"
import { observer } from "mobx-react-lite"
import { tw } from "@free/tailwind"

const PageHome = observer(() => {
  const store = useHook()
  return (
    <>
      <Layout store={store}>
        <View>
          <H4 style={styles.textTitle}>JUDUL 1111</H4>
        </View>
        <View>
          <Text>TEST</Text>
        </View>
      </Layout>
    </>
  )
})

const styles = StyleSheet.create({
  textTitle: tw("text-white"),
})

export default PageHome

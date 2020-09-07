import React from "react"
import { H3, H5, Text } from "../../component/Text"
import { Layout } from "../../component/Layout"
import { View, StyleSheet } from "react-native"
import { useHook } from "./hook"
import { tw } from "@free/tailwind"

const PageError = () => {
  const store = useHook()
  const fatalError = (store?.fatalError as any)?.data
  return (
    <Layout store={store} form>
      <H3>Fatal Error</H3>
      <View style={styles.rootStack}>
        <H5>{fatalError.message}</H5>
        <Text>{fatalError.stack}</Text>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  rootStack: tw("flex-1"),
})

export default PageError

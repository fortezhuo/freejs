import React from "react"
import { StyleSheet } from "react-native"
import { Text, Layout, useStore } from "../../component"
import { observer } from "mobx-react-lite"
import { tw } from "@free/tailwind"

const PageHome: React.FC<any> = observer(({ navigation }) => {
  const { app } = useStore()
  const [isModalVisible, setModalVisible] = React.useState(false)
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }
  return (
    <Layout transparent store={app}>
      <Text>TESTING</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
    </Layout>
  )
})

export default PageHome

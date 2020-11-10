import React, { useState, FC } from "react"
import { View, StyleSheet, TouchableHighlight } from "react-native"
import {
  H4,
  Text,
  Layout,
  Modal,
  IconButton,
  LayoutFull,
} from "../../component"
import { useHook } from "./hook"
import { observer } from "mobx-react-lite"
import { tw } from "@free/tailwind"

const PageHome: FC<any> = observer(({ navigation }) => {
  const store = useHook()
  const [isModalVisible, setModalVisible] = useState(false)
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }
  return (
    <Layout store={store}>
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

const styles = StyleSheet.create({
  textTitle: tw("text-white"),
})

export default PageHome

import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { H4, Text, Layout, Modal, IconButton } from "../../component"
import { useHook } from "./hook"
import { observer } from "mobx-react-lite"
import { tw } from "@free/tailwind"

const PageHome = observer(() => {
  const store = useHook()
  const [isModalVisible, setModalVisible] = useState(false)
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }
  return (
    <>
      <Layout store={store}>
        <View>
          <H4 style={styles.textTitle}>JUDUL </H4>
          <View style={{ flex: 1 }}>
            <IconButton
              onPress={toggleModal}
              style={{ backgroundColor: "white" }}
            >
              Button
            </IconButton>

            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
              <Text>Hello!</Text>

              <IconButton onPress={toggleModal}>Hide</IconButton>
            </Modal>
          </View>
        </View>
      </Layout>
    </>
  )
})

const styles = StyleSheet.create({
  textTitle: tw("text-white"),
})

export default PageHome

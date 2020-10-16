import React, { useState } from "react"
import { View, StyleSheet, Button } from "react-native"
import { H4, Text, Layout, ModalAnimated } from "../../component"
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
            <Button title="Show modal" onPress={toggleModal} />

            <ModalAnimated isVisible={isModalVisible}>
              <View style={{ flex: 1 }}>
                <Text>Hello!</Text>

                <Button title="Hide modal" onPress={toggleModal} />
              </View>
            </ModalAnimated>
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

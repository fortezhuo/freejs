import React from "react"
import { Text, Layout, Button, H5 } from "../../component"
import { View, StyleSheet } from "react-native"
import { useApp } from "../../state"
import { tw } from "@free/tailwind"
import { useNavigation } from "@react-navigation/native"

const Page500: React.FC = () => {
  const { error, setError } = useApp()
  const navigation = useNavigation()

  const onClear = React.useCallback(() => {
    setError({})
  }, [])

  React.useEffect(() => {
    if (!error.message) {
      navigation.navigate("Drawer", {
        screen: "Index",
      })
    }
  }, [error.message])

  return (
    <Layout transparent>
      <View style={s.viewLayout}>
        <H5 style={s.textTitle}>{error.message}</H5>
        <Text style={s.textStack}>{`${error.stack}`}</Text>
        <Button type={"danger_bg"} onPress={onClear}>
          CLEAR
        </Button>
      </View>
    </Layout>
  )
}

const s = StyleSheet.create({
  viewLayout: tw("flex-col bg-white rounded-lg p-2"),
  textTitle: tw("py-2"),
  textStack: tw("py-2"),
})

export default Page500

import React from "react"
import { View, Text } from "react-native"
import { Button } from "../../component/Button"
import { observer } from "mobx-react-lite"
import { useStore } from "../../store"

const Home = observer(() => {
  const state = useStore("ui")

  return (
    <View>
      <Button onPress={() => state.toggleDrawer()}></Button>
      <Text>{`${state.isDrawerOpen}`}</Text>
    </View>
  )
})

export default Home

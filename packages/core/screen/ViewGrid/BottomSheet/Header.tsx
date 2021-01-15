import React from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { Button } from "../../../component/Button"

export const Header: React.FC<{
  isSimple: boolean
  setSimple: any
  refBottomSheet: any
}> = React.memo(({ isSimple, setSimple, refBottomSheet }) => {
  const onTapSimple = React.useCallback(() => {
    setSimple(true)
    refBottomSheet.current.open("default")
  }, [])

  const onTapAdvance = React.useCallback(() => {
    setSimple(false)
    refBottomSheet.current.open("top")
  }, [])

  return (
    <View style={s.viewHeader}>
      <View style={{ flex: 1 }}>
        <Button
          type={isSimple ? "danger_bg" : "disabled_bg"}
          onPress={onTapSimple}
        >
          Simple Search
        </Button>
      </View>
      <View style={{ width: 10 }} />
      <View style={{ flex: 1 }}>
        <Button
          type={!isSimple ? "danger_bg" : "disabled_bg"}
          onPress={onTapAdvance}
        >
          Advance Search
        </Button>
      </View>
    </View>
  )
})

const s = StyleSheet.create({
  viewHeader: tw(
    "p-3 border-b border-gray-400 bg-white flex-row rounded-t-2xl justify-between"
  ),
})

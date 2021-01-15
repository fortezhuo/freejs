import React from "react"
import { StyleSheet, View } from "react-native"
import { Modalize } from "react-native-modalize"
import { Button } from ".."
import { useApp } from "../../state"
import { tw } from "@free/tailwind"

export const Small: React.FC<{
  actions: JSONObject[]
  isLoading?: boolean
}> = ({ actions, isLoading }) => {
  const app = useApp()
  const modalizeRef = React.useRef<Modalize>(null)
  actions = actions.filter((act) => act.children !== "Delete")
  const isShow = actions.length != 0 && app.temp.isMobile

  return (
    <>
      {isShow && (
        <Button
          icon="zap"
          onPress={() => modalizeRef.current?.open()}
          style={s.single}
          type={"danger_bg"}
        ></Button>
      )}
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        modalStyle={s.container}
      >
        <View
          style={{
            height: actions.length * 44 + 44,
            margin: 10,
            marginBottom: 20,
            justifyContent: "space-evenly",
            flexDirection: "column",
          }}
        >
          {actions.map(({ icon, type, key, ...prop }: JSONObject) => (
            <Button
              {...{ type, key: `m_${key}`, ...prop }}
              style={{ borderRadius: 10 }}
            />
          ))}
          <Button
            isLoading={isLoading}
            type={"disabled_bg"}
            style={{ borderRadius: 10, marginTop: 10 }}
            onPress={() => modalizeRef.current?.close()}
          >
            Close
          </Button>
        </View>
      </Modalize>
    </>
  )
}

const s = StyleSheet.create({
  container: tw("bg-white"),
  header: tw("items-center"),
  single: tw("absolute bottom-0 right-0 mb-3 mr-3 shadow-md h-12", {
    minWidth: 50,
  }),
})

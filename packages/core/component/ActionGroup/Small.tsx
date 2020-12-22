import React from "react"
import { StyleSheet, View } from "react-native"
import { Modalize } from "react-native-modalize"
import { Button } from ".."
import { random } from "../../util"
import { tw } from "@free/tailwind"

export const Small: React.FC<any> = ({ store, actions }) => {
  const modalizeRef = React.useRef<Modalize>(null)
  actions = actions.filter((act: ObjectAny) => act.children !== "Delete")
  const isShow = actions.length != 0 && store.app.dimension.isMobile

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
          {actions.map(({ icon, type, ...prop }: ObjectAny) => (
            <Button
              type={type}
              style={{ borderRadius: 10 }}
              {...prop}
              key={"act_" + random()}
            />
          ))}
          <Button
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

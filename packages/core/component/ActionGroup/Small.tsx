import React from "react"
import { StyleSheet, View } from "react-native"
import { Modalize } from "react-native-modalize"

import { observer } from "mobx-react-lite"
import { Button } from ".."
import { random } from "../../util/random"
import { tw } from "@free/tailwind"
import { useEffect } from "react"

export const Small: React.FC<any> = observer(({ store, actions }) => {
  const modalizeRef = React.useRef<Modalize>(null)
  actions = actions.filter((act: ObjectAny) => act.children !== "Delete")
  const isShow = actions.length != 0 && store.app.dimension.isMobile

  useEffect(() => {
    if (!isShow) {
      modalizeRef.current?.close()
    }
  }, [isShow])

  return (
    <>
      {isShow && (
        <Button
          icon="zap"
          onPress={() => modalizeRef.current?.open()}
          store={store}
          style={StyleSheet.flatten([styles.single])}
          type={"single_button_bg"}
        ></Button>
      )}
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        modalStyle={styles.container}
      >
        <View
          style={{
            height: actions.length * 44 + 54,
            marginHorizontal: 6,
            justifyContent: "space-evenly",
            flexDirection: "column",
          }}
        >
          {actions.map(({ icon, type, ...prop }: ObjectAny) => (
            <Button
              type={"transparent_bg"}
              style={{ borderRadius: 10 }}
              {...prop}
              key={"act_" + random()}
              store={store}
            />
          ))}
          <Button
            type={"transparent_bg"}
            style={{ borderRadius: 10, marginTop: 10 }}
            styleText={{ color: "red" }}
            store={store}
            onPress={() => modalizeRef.current?.close()}
          >
            Close
          </Button>
        </View>
      </Modalize>
    </>
  )
})

const styles = StyleSheet.create({
  container: tw("bg-gray-700"),
  header: tw("items-center"),
  single: tw("absolute bottom-0 right-0 mb-3 mr-3 shadow-md h-12", {
    minWidth: 50,
  }),
})

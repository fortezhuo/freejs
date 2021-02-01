import React from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { Modalize } from "react-native-modalize"
import { Button, ButtonIcon } from "../Button"
import { useApp } from "../../state"
import { useKeyboard } from "../../state/hook"
import { tw } from "@free/tailwind"

export const Small: React.FC<{
  actions: JSONObject[]
  isLoading?: boolean
}> = ({ actions, isLoading }) => {
  const [isOpen, setOpen] = React.useState(false)
  const app = useApp()
  const isKeyboardShow = useKeyboard()
  const modalizeRef = React.useRef<Modalize>(null)
  actions = actions.filter((act) => act.children !== "Delete")
  const isShow =
    actions.length != 0 && app.temp.isMobile && !isKeyboardShow && !isOpen

  const onOpen = React.useCallback(() => {
    setOpen(true)
  }, [])

  const onClosed = React.useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <>
      {isShow && (
        <ButtonIcon
          icon="lightning"
          onPress={() => modalizeRef.current?.open()}
          style={s.single}
          type={"danger_bg"}
        />
      )}
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        modalStyle={s.container}
        {...{ onClosed, onOpen }}
      >
        <View
          style={{
            height: actions.length * 44 + 44,
            zIndex: 10,
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
  single: tw(`absolute bottom-0 right-0 mb-8 mr-8 shadow-md h-14 w-14`),
})

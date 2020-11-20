import React from "react"
import { Modalize } from "react-native-modalize"
import { Dimensions } from "react-native"
import { observer, useLocalObservable } from "mobx-react-lite"
import { Text, H5 } from ".."

export const useMessage = () => {
  const ref = React.useRef<Modalize>(null)
  const { height } = Dimensions.get("window")
  const state = useLocalObservable(() => ({
    title: "",
    content: "",
    set(object: any) {
      Object.keys(object).map((name) => {
        ;(state as any)[name] = object[name]
      })
    },
  }))
  const show = React.useCallback((title, content) => {
    state.set({ title, content })
    ref.current?.open()
  }, [])

  const Message: React.FC<any> = observer(() => {
    return (
      <Modalize
        ref={ref}
        withHandle={false}
        modalStyle={{
          marginHorizontal: 10,
          marginBottom: "auto",
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
        modalHeight={height / 2}
      >
        <H5>{state.title}</H5>
        <Text>{state.content}</Text>
      </Modalize>
    )
  })

  return { message: { show }, Message }
}

import React from "react"
import { Modalize } from "react-native-modalize"
import { Dimensions } from "react-native"
import { Text, H5, IconButton } from ".."
import { useLocalObservable, observer } from "mobx-react-lite"

export const useMessage = () => {
  const ref: any = React.useRef<Modalize>(null)
  const refContent: any = React.useRef({})

  const { height } = Dimensions.get("window")

  const show = React.useCallback((props: any) => {
    refContent.current = props
    ref.current.open()
  }, [])

  const Message: React.FC<any> = observer(() => {
    return (
      <Modalize
        ref={ref}
        withHandle={false}
        panGestureEnabled={false}
        withOverlay={true}
        customRenderer={<Text>{refContent.current.title}</Text>}
        HeaderComponent={() => <H5>{refContent.current.title}</H5>}
        FooterComponent={() =>
          (refContent.current.actions || []).map((action: any, i: number) => {
            return (
              <IconButton
                styleContainer={{ backgroundColor: "red" }}
                name={"home"}
                key={"action_message_" + i}
                onPress={action.onPress}
              >
                {action.label}
              </IconButton>
            )
          })
        }
        modalStyle={{
          marginHorizontal: 10,
          marginBottom: "auto",
          padding: 10,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
        modalHeight={height / 2}
      />
    )
  })

  return { message: { show }, Message }
}

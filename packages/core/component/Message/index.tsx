import React from "react"
import { Modalize } from "react-native-modalize"
import { Dimensions } from "react-native"
import { Text, H5, IconButton } from ".."

export const useMessage = () => {
  const ref: any = React.useRef<Modalize>(null)
  const refAction: any = React.useRef({})
  const [state, setState] = React.useState({
    title: "",
    message: "",
    type: "",
  })

  const { height } = Dimensions.get("window")

  const show = function ({ title, message, type, ...props }: any) {
    setState({ title, message, type })
    refAction.current = props
    ref.current.open()
  }

  const Message: React.FC<any> = () => {
    return (
      <Modalize
        ref={ref}
        closeOnOverlayTap={false}
        withHandle={false}
        withOverlay={true}
        children={<Text>{state.message}</Text>}
        HeaderComponent={() => <H5>{state.title}</H5>}
        FooterComponent={() =>
          (refAction.current.actions || []).map((action: any, i: number) => {
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
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
        modalHeight={height / 2}
      />
    )
  }

  return { message: { show }, Message }
}

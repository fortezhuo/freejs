import React from "react"
import { Dimensions, Text } from "react-native"
import { Modalize } from "react-native-modalize"
import { H5, IconButton } from ".."

export const Message: React.FC<any> = React.forwardRef((_props, ref) => {
  const refModalize = React.useRef<Modalize>(null)
  const refProps = React.useRef({ title: "", message: "", actions: [] })
  const { height } = Dimensions.get("window")

  const show = React.useCallback((props: any) => {
    refProps.current = props
    refModalize.current?.open()
  }, [])

  React.useImperativeHandle(ref, () => ({
    show,
  }))

  const customRenderer: any = () => (
    <Text>{refProps?.current?.message || ""}</Text>
  )

  return (
    <Modalize
      ref={refModalize}
      withHandle={false}
      panGestureEnabled={false}
      withOverlay={true}
      customRenderer={customRenderer}
      HeaderComponent={() => (
        <>
          <H5>{refProps.current.title}</H5>
        </>
      )}
      FooterComponent={() =>
        refProps.current.actions.map((action: any, i: number) => {
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

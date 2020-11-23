import React from "react"
import { Text, useWindowDimensions, Image, View } from "react-native"
import { Modalize } from "react-native-modalize"
import { H1, IconButton } from ".."
import { getScreenSize } from "../../util"
import iconInfo from "../../img/info.png"
import iconQuestion from "../../img/question.png"
import iconError from "../../img/error.png"

export const Message: React.FC<any> = React.forwardRef((_props, ref) => {
  const refModalize = React.useRef<Modalize>(null)
  const refProps = React.useRef({
    title: "",
    type: undefined,
    message: "",
    actions: [],
  })

  const onClosed = React.useCallback(() => {
    refProps.current = {
      title: "",
      type: undefined,
      message: "",
      actions: [],
    }
  }, [])

  const { height, width } = useWindowDimensions()
  const screen = getScreenSize(width)

  const show = React.useCallback(async (props: any) => {
    const hasPrevMessage = !!refProps.current.title
    if (hasPrevMessage) {
      refModalize.current?.close()
    }

    setTimeout(
      () => {
        refProps.current = props
        refModalize.current?.open()
      },
      hasPrevMessage ? 300 : 0
    )
  }, [])

  const error = React.useCallback((props: any) => {
    return show({ type: "error", ...props })
  }, [])

  const info = React.useCallback((props: any) => {
    return show({ type: "info", ...props })
  }, [])

  const confirm = React.useCallback((props: any) => {
    return show({ type: "confirm", ...props })
  }, [])

  const headerComponent = React.useCallback(() => {
    const type = refProps.current.type || "info"
    const logo =
      type == "info"
        ? iconInfo
        : type == "error"
        ? iconError
        : type == "confirm"
        ? iconQuestion
        : undefined

    return (
      <View>
        {logo && <Image source={logo} style={{ width: 100, height: 100 }} />}
        <H1>{refProps.current.title}</H1>
      </View>
    )
  }, [])

  React.useImperativeHandle(ref, () => ({
    show,
    info,
    confirm,
    error,
  }))

  const customRenderer: any = () => (
    <Text>{refProps?.current?.message || ""}</Text>
  )

  return (
    <Modalize
      ref={refModalize}
      onClosed={onClosed}
      withHandle={false}
      panGestureEnabled={false}
      withOverlay={true}
      customRenderer={customRenderer}
      HeaderComponent={headerComponent}
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
        alignSelf: "center",
        marginHorizontal: 20,
        marginBottom: "auto",
        padding: 10,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        width: screen !== "sm" ? 700 : width - 20,
      }}
      modalHeight={height / 2 + 50}
    />
  )
})

import React from "react"
import {
  useWindowDimensions,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native"
import { Modalize } from "react-native-modalize"
import { H1, Text } from ".."
import { getScreenSize, random } from "../../util"
import { tw } from "@free/tailwind"
import { theme } from "../../config/theme"

import iconInfo from "../../img/info.png"
import iconQuestion from "../../img/question.png"
import iconError from "../../img/error.png"

export const Alert: React.FC<any> = React.forwardRef((_props, ref) => {
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

  const { width } = useWindowDimensions()
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

  const close = React.useCallback(() => {
    refModalize.current?.close()
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

  const header = React.useCallback(() => {
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
      <>
        {logo && <Image source={logo} style={s.imgLogo} />}
        <H1 style={s.textTitle}>{refProps.current.title}</H1>
      </>
    )
  }, [])

  const footer = React.useCallback(
    () => (
      <View testID="Footer" style={s.viewFooter}>
        {refProps.current.actions.map((action: any, i: number) => {
          return (
            <TouchableOpacity
              style={[
                s.buttonAction,
                tw(theme[`${action.type || "secondary"}_bg`]),
              ]}
              key={"action_" + random()}
              onPress={action.onPress}
            >
              <Text style={s.textAction}>{action.label}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    ),
    []
  )

  React.useImperativeHandle(ref, () => ({
    close,
    confirm,
    error,
    info,
    show,
  }))

  const body: any = React.useCallback(
    () => (
      <View style={s.viewBody}>
        <Text numberOfLines={2} style={s.textMessage}>
          {refProps?.current?.message || ""}
        </Text>
      </View>
    ),
    []
  )

  return (
    <Modalize
      ref={refModalize}
      onClosed={onClosed}
      withHandle={false}
      panGestureEnabled={false}
      withOverlay={true}
      customRenderer={body}
      HeaderComponent={header}
      FooterComponent={footer}
      modalStyle={[
        s.viewModal,
        {
          width: screen !== "sm" ? 600 : width - 20,
        },
      ]}
      modalHeight={350}
    />
  )
})

const s = StyleSheet.create({
  imgLogo: { height: 128, width: 128, alignSelf: "center" },
  textTitle: tw("text-center my-2"),
  textMessage: tw("font-thin text-2xl text-center"),
  viewBody: tw("flex-1 justify-center", { marginTop: -15 }),
  viewModal: tw("self-center rounded-2xl p-3 pb-4 mx-8 items-center", {
    marginBottom: "auto",
  }),
  viewFooter: tw("flex-row"),
  buttonAction: tw("rounded-2xl bg-red-500 px-6 py-3 mx-2 items-center", {
    minWidth: 100,
  }),
  textAction: tw("text-lg text-white"),
})

import React from "react"
import {
  useWindowDimensions,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native"
import { Modalize } from "react-native-modalize"
import { Text } from "../Text"
import { getScreenSize } from "../../util"
import { tw } from "@free/tailwind"
import { theme } from "../../config/theme"

import iconInfo from "../../img/info.png"
import iconQuestion from "../../img/question.png"
import iconError from "../../img/error.png"

const defaultProps = {
  title: "",
  closeOutside: true,
  fullScreen: false,
  type: undefined,
  message: "",
  actions: [],
}

export const Alert = React.forwardRef((_props, ref) => {
  const refModalize = React.useRef<Modalize>(null)
  const refProps = React.useRef(defaultProps)

  const onClosed = React.useCallback(() => {
    refProps.current = defaultProps
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
        refProps.current = { ...defaultProps, ...props }
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
        <Text style={s.textTitle}>{refProps.current.title}</Text>
      </>
    )
  }, [])

  const footer = React.useCallback(
    () => (
      <View testID="Footer" style={s.viewFooter}>
        {refProps.current.actions.map(
          ({ key, type, label, onPress }: any, i: number) => {
            return (
              <TouchableOpacity
                style={[s.buttonAction, tw(theme[`${type || "secondary"}_bg`])]}
                {...{ key, onPress }}
              >
                <Text style={s.textAction}>{label}</Text>
              </TouchableOpacity>
            )
          }
        )}
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
      adjustToContentHeight
      ref={refModalize}
      onClosed={onClosed}
      withHandle={false}
      withOverlay={true}
      panGestureEnabled={false}
      closeOnOverlayTap={refProps.current.closeOutside}
      customRenderer={body}
      HeaderComponent={header}
      FooterComponent={footer}
      modalStyle={[
        s.viewModal,
        {
          width:
            !refProps.current.fullScreen && screen !== "sm" ? 530 : width - 20,
        },
      ]}
    />
  )
})

const s = StyleSheet.create({
  imgLogo: tw("self-center mb-4 mt-3", { height: 88, width: 88 }),
  textTitle: tw("text-center mb-4 text-3xl font-bold"),
  textMessage: tw("text-lg text-center"),
  viewBody: tw("mb-8"),
  viewModal: tw("self-center rounded-2xl p-5 mx-8 items-center", {
    marginBottom: "auto",
  }),
  viewFooter: tw("flex-row mb-4"),
  buttonAction: tw("rounded-lg bg-red-500 px-6 py-3 mx-2 items-center", {
    minWidth: 100,
  }),
  textAction: tw("text-lg text-white"),
})

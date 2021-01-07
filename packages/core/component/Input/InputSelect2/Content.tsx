import React from "react"
import { Button, H4 } from "../.."
import { Display } from "./Display"
import { View, StyleSheet } from "react-native"
import { theme } from "../../../config/theme"
import { tw } from "@free/tailwind"

export const Content: React.FC<any> = (props) => {
  const {
    placeholder,
    onCancel,
    onCommit,
    isMobile,
    getDisplayProps,
    children,
  } = props
  return (
    <View style={isMobile ? s.viewMenuMobile : s.viewMenuDesktop}>
      {isMobile && (
        <>
          <H4>{placeholder}</H4>
          <View style={s.viewInput}>
            <Display {...{ ...getDisplayProps(), clearable: false }} />
          </View>
        </>
      )}
      <View style={[s.viewWrapper, isMobile ? s.viewWrapperMobile : {}]}>
        {children}
      </View>
      {isMobile && (
        <View style={s.viewButton}>
          <Button type={"primary_1_bg"} icon="check" onPress={onCommit}>
            OK
          </Button>
          <Button type={"danger_bg"} icon="x" onPress={onCancel}>
            Cancel
          </Button>
        </View>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  viewButton: tw("flex-row justify-evenly self-end", { width: 200 }),
  viewMenuDesktop: {
    marginTop: 1,
    height: 181,
  },
  viewMenuMobile: tw("bg-white p-3 rounded-lg shadow-lg"),
  viewInput: tw(
    `${theme.default_bg} ${theme.input_border} w-full h-10 flex-row my-2`
  ),
  viewWrapper: tw(`${theme.default_bg} ${theme.input_border}`, {
    paddingTop: 3,
  }),
  viewWrapperMobile: tw("mb-2", { height: 181 }),
})
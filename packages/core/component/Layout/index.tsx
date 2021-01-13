import React from "react"
import { View, StyleSheet, TextInput } from "react-native"
import { theme } from "../../config/theme"
import { Gradient, KeyboardAwareScrollView } from "../"
import { tw } from "@free/tailwind"
import { useController } from "react-hook-form"

const HiddenInput: React.FC<{ name: string; control: any }> = ({
  name,
  control,
}) => {
  const {
    field: { ref, onChange, value },
  } = useController({
    name,
    control,
    defaultValue: ["*"],
  })

  return <TextInput onChangeText={onChange} value={value} />
}

interface Wrapper {
  scroll?: boolean
  testID?: string
  children: React.ReactNode
}

const Wrapper: React.FC<Wrapper> = ({
  scroll = true,
  testID = undefined,
  children,
}) => {
  if (!scroll) return <>{children}</>
  return (
    <KeyboardAwareScrollView testID={testID}>
      {children}
    </KeyboardAwareScrollView>
  )
}

interface GradientWrapper {
  transparent?: boolean
  children: React.ReactNode
}

const GradientWrapper: React.FC<GradientWrapper> = ({
  transparent,
  children,
}) => {
  const colors = [theme.primary_1_bg, theme.primary_2_bg]
  return transparent ? (
    <View style={s.viewTransparent}>{children}</View>
  ) : (
    <Gradient colors={colors} style={s.viewLayout}>
      {children}
    </Gradient>
  )
}

interface LayoutFull {
  testID?: string
  children: React.ReactNode
  scroll?: boolean
  transparent?: boolean
}

export const LayoutFull: React.FC<LayoutFull> = ({
  testID = "LayoutFull",
  children,
  scroll = true,
  transparent = false,
}) => {
  return (
    <GradientWrapper transparent={transparent}>
      <Wrapper testID={testID} scroll={scroll}>
        {children}
      </Wrapper>
    </GradientWrapper>
  )
}

interface Layout extends LayoutFull {
  stickyLeft?: React.ReactNode
  stickyRight?: React.ReactNode
  style?: JSONObject
  document?: any
}

export const Layout: React.FC<Layout> = ({
  testID = "Layout",
  children,
  stickyLeft,
  stickyRight,
  transparent = false,
  scroll = true,
  document,
  style,
}) => {
  return (
    <LayoutFull transparent={transparent} scroll={false}>
      <View style={s.viewWrapper1}></View>
      <View style={s.viewWrapper2}>
        <View style={s.viewWrapper21}></View>
        <View style={s.viewWrapper22}></View>
      </View>
      <View style={s.viewAction}>
        {stickyLeft || <View></View>}
        {stickyRight}
      </View>
      <Wrapper scroll={scroll}>
        <View style={[s.viewChildren, style]} testID={testID}>
          {children}
          {document && (
            <>
              <View style={{ height: 150 }} />
              <View style={s.viewHidden}>
                <HiddenInput name="_docAuthors" control={document.control} />
                <HiddenInput name="_docReaders" control={document.control} />
              </View>
            </>
          )}
        </View>
      </Wrapper>
    </LayoutFull>
  )
}

const s = StyleSheet.create({
  viewLayout: tw("flex-1"),
  viewTransparent: tw("flex-1 bg-transparent"),
  viewAction: tw("flex-row justify-between px-4 pb-1", { height: 48 }),
  viewWrapper1: tw("h-1 absolute"),
  viewWrapper2: tw("w-full h-full absolute flex-1"),
  viewWrapper21: tw("h-20 bg-transparent"),
  viewWrapper22: tw("flex-1 bg-gray-200"),
  viewHeader: tw("px-6 pb-3"),
  viewChildren: tw("p-5 pt-0"),
  viewHidden: tw("opacity-0 h-0"),
})

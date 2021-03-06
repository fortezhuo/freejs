import React from "react"
import { View, StyleSheet } from "react-native"
import { SectionAdmin } from "../SectionAdmin"
import { theme } from "../../config/theme"
import { Gradient } from "../Gradient"
import { KeyboardAwareScrollView } from "../KeyboardAwareScrollView"
import { tw } from "@free/tailwind"
import { useApp } from "../../state"

interface Wrapper {
  scroll?: boolean
  testID?: string
  children: React.ReactNode
}

const Wrapper: React.FC<Wrapper> = ({ scroll = true, children }) => {
  const { refScroll } = useApp()

  React.useEffect(() => {
    if (scroll) {
      refScroll.current.scrollTo({ x: 0, y: 1, animated: false })
    }
  }, [])

  if (!scroll) return <>{children}</>
  return <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
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
  admin?: any
}

export const Layout: React.FC<Layout> = ({
  testID = "Layout",
  children,
  stickyLeft,
  stickyRight,
  transparent = false,
  scroll = true,
  document,
  admin,
  style,
}) => {
  const { temp, can } = useApp()
  const isMobile = ["md", "sm"].indexOf(temp.screen) >= 0
  const isNotAdmin = !can("read", "SETTING")

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
        <View
          style={[isMobile ? s.viewMobile : s.viewDesktop, style]}
          testID={testID}
        >
          {children}
          {document && (
            <>
              <View style={isMobile || isNotAdmin ? s.viewHidden : {}}>
                <SectionAdmin document={document}>{admin}</SectionAdmin>
              </View>

              <View style={{ height: 150 }} />
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
  viewDesktop: tw("p-5 pt-0"),
  viewMobile: tw("p-2 pt-0"),
  viewHidden: tw("opacity-0 h-0"),
})

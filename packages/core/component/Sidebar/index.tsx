import React from "react"
import { StyleSheet, View, Text, Image, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Accordion, AccordionItem } from "../Accordion"
import { Link } from "../Link"
import { Gradient } from "../Gradient"
import { getMenu } from "../../config/menu"
import { useApp } from "../../state"
import { tw } from "@free/tailwind"
import { configApp } from "@free/env"
import logo from "../../img/logo.png"

const colors = ["bg-gray-200", "bg-gray-200", "bg-gray-200", "bg-gray-300"]

const Logo: React.FC = () => {
  return <Image source={logo} style={s.imgTitle} />
}

export const Title: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <Link navigation={navigation} name={"Index"}>
      <View style={s.layoutTitle}>
        <Logo />
        <View style={s.groupTitle}>
          <Text style={s.textTitle}>{configApp.displayName}</Text>
        </View>
      </View>
    </Link>
  )
}

const Content: React.FC<JSONObject> = (props) => {
  const app = useApp()
  const activeName = props.state.routeNames[props.state.index]

  const allowedMenu = React.useMemo(
    () => getMenu(app).filter((menu) => menu.visible),
    [app.data?.auth?.username]
  )

  return (
    <ScrollView {...props} scrollEnabled={true} stickyHeaderIndices={[0]}>
      <Title navigation={props.navigation} />
      {allowedMenu.map(({ key, label, icon, children }, i: number) => {
        const active = children
          ? children.filter((sub: any) => sub.component === activeName)
              .length !== 0
          : false
        return (
          <Accordion {...{ key, label, icon }} active={active}>
            {children &&
              children
                .filter(({ visible }: JSONObject) => visible)
                .map(
                  (
                    { key, component, icon, label, params }: JSONObject,
                    j: number
                  ) => {
                    return (
                      <AccordionItem
                        {...{ key, component, icon, params }}
                        active={component === activeName}
                        navigation={props.navigation}
                      >
                        {label}
                      </AccordionItem>
                    )
                  }
                )}
          </Accordion>
        )
      })}
      <View style={{ height: 100 }} />
    </ScrollView>
  )
}

export const Sidebar: React.FC<JSONObject> = (props) => {
  return (
    <Gradient type="vertical" colors={colors} style={{ flex: 1 }}>
      <SafeAreaView style={s.layoutSidebar} testID="Sidebar">
        <Content {...props} />
      </SafeAreaView>
    </Gradient>
  )
}

const s = StyleSheet.create({
  layoutSidebar: tw(`flex-1`),
  imageSidebar: tw(`flex-1`),
  rootContent: tw("p-1"),
  layoutTitle: tw(`${colors[0]} flex-row items-center pt-3 pb-4 pl-5`),
  imgTitle: tw("h-10 w-10 mr-3"),
  groupTitle: tw("flex-col"),
  textTitle: tw(`text-xl`),
  textSubTitle: tw(`text-xs`),
})

import React from "react"
import { StyleSheet, ImageBackground } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Accordion, AccordionItem, Title } from "../"
import { observer } from "mobx-react-lite"
import { getMenu } from "../../config/menu"
import { random } from "../../util"
import { DrawerContentScrollView } from "@react-navigation/drawer"
import { tw } from "@free/tailwind"
import imageSidebar from "../../img/sidebar.jpg"

const Content: React.FC<any> = observer((props) => {
  const allowedMenu = getMenu().filter((menu) => menu.visible)
  const activeName =
    props.state.routes[0].state?.routes[props.state.routes[0].state.index || 0]
      .name

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1 }}
    >
      {allowedMenu.map((menu) => {
        const active = menu.children
          ? menu.children.filter((sub: any) => sub.component === activeName)
              .length !== 0
          : false
        return (
          <Accordion
            active={active}
            key={`menu_${random()}`}
            label={menu.label}
            icon={menu.icon}
          >
            {menu.children &&
              menu.children
                .filter((sub: any) => sub.visible)
                .map((sub: any) => {
                  return (
                    <AccordionItem
                      key={"sidebar_" + random()}
                      active={sub.component === activeName}
                      navigation={props.navigation}
                      component={sub.component}
                      icon={sub.icon}
                    >
                      {sub.label}
                    </AccordionItem>
                  )
                })}
          </Accordion>
        )
      })}
    </DrawerContentScrollView>
  )
})

export const Sidebar: React.FC<any> = observer((props) => {
  React.useEffect(() => {
    props.setProgress(props.progress)
  }, [props.progress])

  return (
    <ImageBackground
      testID="Sidebar"
      source={imageSidebar}
      style={s.imageSidebar}
    >
      <SafeAreaView style={s.layoutSidebar}>
        <Title navigation={props.navigation} />
        <Content {...props} />
      </SafeAreaView>
    </ImageBackground>
  )
})

const s = StyleSheet.create({
  layoutSidebar: tw(`bg-white-800 flex-1`),
  imageSidebar: tw(`flex-1`),
  rootContent: tw("flex-no-wrap p-1"),
})

import React from "react"
import { View, StyleSheet, ImageBackground } from "react-native"
import { tw } from "@free/tailwind"
import { Accordion, AccordionItem, Title } from "../"
import { observer } from "mobx-react-lite"
import { getMenu } from "../../config/menu"
import { random } from "../../util/random"
import { DrawerContentScrollView } from "@react-navigation/drawer"

import imageSidebar from "../../img/sidebar.jpg"

const Content: React.FC<any> = observer((props) => {
  const allowedMenu = getMenu().filter((menu) => menu.visible)

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1 }}
    >
      {allowedMenu.map((menu) => {
        const active = false
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
      style={styles.imageSidebar}
    >
      <View style={styles.layoutSidebar}>
        <Title navigation={props.navigation} />
        <Content {...props} />
      </View>
    </ImageBackground>
  )
})

const styles = StyleSheet.create({
  layoutSidebar: tw(`bg-white-800 flex-1`),
  imageSidebar: tw(`flex-1`),
  rootContent: tw("flex-no-wrap p-1"),
})

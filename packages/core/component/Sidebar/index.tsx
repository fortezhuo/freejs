import React, { FC, useEffect, useRef } from "react"
import { View, StyleSheet, ScrollView, Animated, Platform } from "react-native"
import { tw } from "@free/tailwind"
import { Accordion, AccordionItem } from "../Accordion"
import { SidebarProps } from "@free/core"
import { observer } from "mobx-react-lite"
import { useStore } from "../Store"
import { getMenu } from "../../config/menu"
import { random } from "../../util/random"

const Content: FC = observer(() => {
  const { app } = useStore()
  const pathname = app.routerLocation
  const allowedMenu = getMenu().filter((menu) => menu.visible)

  return (
    <View style={styles.rootContent}>
      {allowedMenu.map((menu) => {
        const active = menu.children
          ? menu.children.filter((sub) => sub.path === pathname).length !== 0
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
                .filter((sub) => sub.visible)
                .map((sub) => {
                  return (
                    <AccordionItem
                      pathname={sub.path}
                      key={`sub_${random()}`}
                      icon={sub.icon}
                    >
                      {sub.label}
                    </AccordionItem>
                  )
                })}
          </Accordion>
        )
      })}
    </View>
  )
})

export const Sidebar: FC<SidebarProps> = observer(
  ({ isOpen, testID = "Sidebar" }) => {
    const opacity = useRef(new Animated.Value(1)).current
    const width = opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, tw("w-64").width],
    })

    useEffect(() => {
      Animated.timing(opacity, {
        toValue: isOpen ? 1 : 0,
        duration: 120,
        useNativeDriver: Platform.OS !== "web",
      }).start()
    }, [isOpen])

    return (
      <Animated.View
        testID={testID}
        style={StyleSheet.flatten([styles.rootSidebar, { opacity, width }])}
      >
        <ScrollView>
          <Content />
        </ScrollView>
      </Animated.View>
    )
  }
)

const styles = StyleSheet.create({
  rootSidebar: tw(`shadow-md flex-col bg-white-200`),
  rootContent: tw("flex-no-wrap w-64 p-1 bg-white"),
})

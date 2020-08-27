import React, { FC } from "react"
import { View, StyleSheet, ScrollView, ViewProps } from "react-native"
import { tw } from "@free/tailwind"
import { useSpring, animated } from "react-spring/native"
import { Accordion, AccordionItem } from "../Accordion"
import { SidebarProps } from "@free/core"
import { observer } from "mobx-react-lite"
import { useStore } from "../Store"
import { getMenu } from "../../config/menu"
import { random } from "../../util/random"

const Content: FC = observer(() => {
  const { ui } = useStore()
  const pathname = ui.app.location
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
      <AccordionItem header icon="help-circle">
        About Application
      </AccordionItem>
    </View>
  )
})

const AnimatedView = animated<React.ElementType<ViewProps>>(View)
export const Sidebar: FC<SidebarProps> = observer(({ isOpen }) => {
  const animatedStyle = useSpring({
    config: { duration: 100 },
    from: { width: tw("w-64").width },
    to: {
      width: isOpen ? tw("w-64").width : 0,
    },
  })

  return (
    <AnimatedView
      testID="Sidebar"
      style={StyleSheet.flatten([styles.rootSidebar, animatedStyle])}
    >
      <ScrollView>
        <Content />
      </ScrollView>
    </AnimatedView>
  )
})

const styles = StyleSheet.create({
  rootSidebar: tw(`shadow-2xl flex-col`),
  rootContent: tw("flex-no-wrap w-64"),
})

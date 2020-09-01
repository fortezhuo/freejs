import React, { FC, Children } from "react"
import { View, TouchableOpacity, StyleSheet, ViewProps } from "react-native"
import { theme } from "../../config/theme"
import { useSpring, animated } from "react-spring/native"
import { IconLabel, Icon } from "../Icon"
import { tw } from "@free/tailwind"
import { observer, useLocalStore } from "mobx-react-lite"
import { useStore } from "../Store"
import { AccordionProps, AccordionItemProps } from "@free/core"

const AnimatedView = animated<React.ElementType<ViewProps>>(View)
const { color } = tw("text-gray-600")
const noop = () => {}

export const Accordion: FC<AccordionProps> = observer(
  ({ testID = "Accordion", icon, label, active = false, children }) => {
    const state = useLocalStore(() => ({
      isExpand: active,
      toggle() {
        state.isExpand = !state.isExpand
      },
    }))

    const height = Children.count(children) * 47
    const accordionProps = useSpring({
      config: { duration: 120 },
      from: active ? { opacity: 1, height } : { opacity: 0, height: 0 },
      to: {
        opacity: state.isExpand ? 1 : 0,
        height: state.isExpand ? height : 0,
      },
    })
    return (
      <TouchableOpacity onPress={state.toggle}>
        <View style={styles.rootAccordion} testID={testID}>
          <View style={styles.groupAccordion}>
            <IconLabel
              name={icon}
              styleContainer={styles.groupLabel}
              styleText={styles.textAccordion}
            >
              {label}
            </IconLabel>
            <Icon
              size={20}
              name={`chevron-${state.isExpand ? "up" : "down"}`}
            />
          </View>
          <AnimatedView
            style={StyleSheet.flatten([styles.groupItem, accordionProps])}
          >
            {children}
          </AnimatedView>
        </View>
      </TouchableOpacity>
    )
  }
)

export const AccordionItem: FC<AccordionItemProps> = observer(
  ({
    testID = "AccordionItem",
    icon,
    header = false,
    pathname,
    children,
    onPress = noop,
  }) => {
    const { app } = useStore()
    const active = pathname === app?.location
    const onClose = () => {
      if (app.dimension.isMobile) app.setDrawerOpen(false)
    }
    onPress = pathname ? () => app.goto(pathname) : onPress

    return (
      <TouchableOpacity
        onPress={() => {
          onClose()
          onPress()
        }}
      >
        {header ? (
          <View
            testID={testID}
            style={StyleSheet.flatten([
              styles.rootAccordion,
              styles.groupAccordion,
            ])}
          >
            <IconLabel
              name={icon}
              styleContainer={styles.groupLabel}
              styleText={styles.textAccordion}
            >
              {children}
            </IconLabel>
          </View>
        ) : (
          <IconLabel
            name={icon}
            size={20}
            color={active ? "#fff" : color}
            styleContainer={StyleSheet.flatten([
              styles.rootAccordionItem,
              active ? styles.rootAccordionItemActive : {},
            ])}
            styleText={StyleSheet.flatten([
              styles.textAccordionItem,
              active ? styles.textAccordionItemActive : {},
            ])}
          >
            {children}
          </IconLabel>
        )}
      </TouchableOpacity>
    )
  }
)

const styles = StyleSheet.create({
  rootAccordion: tw("flex-col shadow-md z-10"),
  rootAccordionItem: tw(
    `flex-row shadow-md ${theme.bgAccordionItem} ${theme.borderAccordion} px-4 py-3 items-center`
  ),
  rootAccordionItemActive: tw(`${theme.bgAccordionItemActive}`),
  groupAccordion: tw(
    `flex-row z-10 ${theme.bgAccordion} ${theme.borderAccordion} px-4 py-3 items-center`
  ),
  groupLabel: tw("flex-grow flex-row items-center"),
  groupItem: tw("flex-col flex-shrink z-0"),
  textAccordion: tw(`px-2 ${theme.textAccordion}`),
  textAccordionItem: tw(`px-2 ${theme.textAccordionItem}`),
  textAccordionItemActive: tw(`${theme.textAccordionItemActive}`),
  iconChevron: tw("mr-2"),
})
import React, { FC, Children, useRef, useEffect } from "react"
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native"
import { theme } from "../../config/theme"
import { IconLabel, Icon } from "../Icon"
import { tw, color } from "@free/tailwind"
import { observer, useLocalStore } from "mobx-react-lite"
import { useStore } from "../Store"
import { AccordionProps, AccordionItemProps } from "@free/core"

const activeColor = color(theme.accordion_bg_active)
const textColor = color(theme.accordion_text)
const noop = () => {}

export const Accordion: FC<AccordionProps> = observer(
  ({ testID = "Accordion", icon, label, active = false, children }) => {
    const state = useLocalStore(() => ({
      isExpand: active,
      toggle() {
        state.isExpand = !state.isExpand
      },
    }))
    const itemHeight = 46
    const childHeight = Children.count(children) * itemHeight

    const opacity = useRef(new Animated.Value(0)).current
    const height = opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, childHeight],
    })

    useEffect(() => {
      Animated.timing(opacity, {
        toValue: state.isExpand ? 1 : 0,
        duration: 120,
        useNativeDriver: false,
      }).start()
    }, [state.isExpand])

    return (
      <TouchableOpacity onPress={state.toggle}>
        <View style={styles.accordion} testID={testID}>
          <View style={styles.group}>
            <IconLabel
              name={icon}
              color={state.isExpand ? activeColor : textColor}
              style={StyleSheet.flatten([
                styles.icon,
                state.isExpand ? styles.iconExpand : {},
              ])}
              styleContainer={styles.label}
              styleText={StyleSheet.flatten([
                styles.textAccordion,
                state.isExpand ? { color: activeColor } : {},
              ])}
            >
              {label}
            </IconLabel>
            <Icon
              size={20}
              color={state.isExpand ? activeColor : textColor}
              name={`chevron-${state.isExpand ? "up" : "down"}`}
            />
          </View>
          <Animated.View
            style={StyleSheet.flatten([styles.groupItem, { height, opacity }])}
          >
            {children}
          </Animated.View>
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
    const active = pathname === app?.routerLocation
    const onClose = () => {
      if (app.dimension.isMobile) app.set("isDrawerOpen", false)
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
            style={StyleSheet.flatten([styles.accordion, styles.group])}
          >
            <IconLabel
              name={icon}
              styleContainer={styles.label}
              styleText={styles.textAccordion}
            >
              {children}
            </IconLabel>
          </View>
        ) : (
          <IconLabel
            name={icon}
            size={20}
            color={active ? activeColor : textColor}
            styleContainer={StyleSheet.flatten([
              styles.item,
              active ? styles.itemActive : {},
            ])}
            styleText={StyleSheet.flatten([
              styles.itemText,
              { color: active ? activeColor : textColor },
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
  accordion: tw("flex-col z-10"),
  icon: tw("p-2 shadow-xl bg-white rounded"),
  iconExpand: tw(theme.accordion_border_icon_active),
  item: tw(`flex-row px-4 py-3 pl-10 items-center`),
  itemActive: { backgroundColor: "rgba(0,0,0,0.03)" },
  itemText: tw(`px-2`),
  group: tw(`flex-row px-4 py-3 items-center`),
  label: tw("flex-grow flex-row items-center"),
  groupItem: tw("flex-col flex-shrink z-0"),
  textAccordion: tw(`px-2`),
})

import React, { FC, Children, useRef, useEffect } from "react"
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from "react-native"
import { theme } from "../../config/theme"
import { IconLabel, Icon } from "../Icon"
import { tw, color } from "@free/tailwind"
import { observer, useLocalStore } from "mobx-react-lite"
import { useStore } from "../Store"
import { AccordionProps, AccordionItemProps } from "@free/core"

const { color: textColor } = tw(theme.textAccordionItem)
const { color: iconColor } = tw(theme.textAccordion)
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
        useNativeDriver: Platform.OS !== "web",
      }).start()
    }, [state.isExpand])

    return (
      <TouchableOpacity onPress={state.toggle}>
        <View style={styles.rootAccordion} testID={testID}>
          <View
            style={StyleSheet.flatten([
              styles.groupAccordion,
              state.isExpand ? styles.accordionExpand : {},
            ])}
          >
            <IconLabel
              name={icon}
              color={iconColor}
              styleContainer={styles.groupLabel}
              styleText={styles.textAccordion}
            >
              {label}
            </IconLabel>
            <Icon
              size={20}
              color={iconColor}
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
            color={textColor}
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
  accordionExpand: {
    borderLeftColor: color(theme.primary),
    ...tw(`border-l border-l-4`),
  },
  rootAccordionItem: tw(`flex-row px-4 py-3 items-center`),
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

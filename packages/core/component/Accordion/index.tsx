import React, { FC, Children } from "react"
import { View, TouchableOpacity, StyleSheet, ViewProps } from "react-native"
import { theme } from "../../config/theme"
import { useSpring, animated } from "react-spring/native"
import { IconLabel, Icon } from "../Icon"
import { tw, adjust, border, text } from "@free/tailwind"
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
    const { ui } = useStore()
    const active = pathname === ui.app.location
    const onClose = () => {
      if (ui.dimension.isMobile) ui.setDrawerOpen(false)
    }
    onPress = pathname ? () => ui.app.goto(pathname) : onPress

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
              styles.rootItem,
              active ? styles.rootItemActive : {},
            ])}
            styleText={StyleSheet.flatten([
              styles.textItem,
              active ? styles.textActive : {},
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
  rootItem: tw(
    `flex-row shadow-md ${adjust(theme.default, -3)} border-b ${border(
      adjust(theme.default, -2)
    )} px-4 py-3 items-center`
  ),
  rootItemActive: tw(`${adjust(theme.primary, -1)}`),
  groupAccordion: tw(
    `flex-row z-10 ${theme.primary} border-b ${border(
      adjust(theme.primary, -2)
    )} px-4 py-3 items-center`
  ),
  groupLabel: tw("flex-grow flex-row items-center"),
  groupItem: tw("flex-col flex-shrink z-0"),
  textAccordion: tw("px-2 text-white"),
  textItem: tw("px-2 text-gray-600"),
  textActive: tw(`text-white`),
  iconChevron: tw("mr-2"),
})

import React, { FC, Children } from "react"
import { View, TouchableOpacity, StyleSheet, ViewProps } from "react-native"
import { theme } from "../../config/theme"
import { useSpring, animated } from "react-spring/native"
import { IconLabel, Icon } from "../Icon"
import { tw, adjust, border } from "@free/tailwind"
import { observer, useLocalStore } from "mobx-react-lite"
import { useStore } from "../../store"

const AnimatedView = animated<React.ElementType<ViewProps>>(View)
const { color } = tw("text-gray-600")
const noop = () => {}

export const Accordion: FC<Accordion> = observer(
  ({ icon, label, children }) => {
    const state = useLocalStore(() => ({
      isExpand: false,
      toggle() {
        state.isExpand = !state.isExpand
      },
    }))

    const height = Children.count(children) * 47
    const accordionProps = useSpring({
      from: { opacity: 0, height: 0 },
      to: {
        opacity: state.isExpand ? 1 : 0,
        height: state.isExpand ? height : 0,
      },
    })
    return (
      <TouchableOpacity onPress={state.toggle}>
        <View style={styles.rootAccordion}>
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

export const AccordionItem: FC<AccordionItem> = observer(
  ({ icon, header = false, children, onPress = noop }) => {
    const state = useStore("ui")
    const onClose = () => {
      if (state.isMobile) state.setDrawerOpen(false)
    }

    return (
      <TouchableOpacity
        onPress={() => {
          onClose()
          onPress()
        }}
      >
        {header ? (
          <View
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
            color={color}
            styleContainer={styles.rootItem}
            styleText={styles.textItem}
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
  groupAccordion: tw(
    `flex-row z-10 ${theme.primary} border-b ${border(
      adjust(theme.primary, -2)
    )} px-4 py-3 items-center`
  ),
  groupLabel: tw("flex-grow flex-row items-center"),
  groupItem: tw("flex-col flex-shrink z-0"),
  textAccordion: tw("px-2 text-white"),
  textItem: tw("px-2 text-gray-600"),
  iconChevron: tw("mr-2"),
})

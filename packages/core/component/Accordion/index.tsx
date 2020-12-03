import React from "react"
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native"
import { theme } from "../../config/theme"
import { IconLabel, Icon, Link } from ".."
import { tw, color } from "@free/tailwind"
import { observer, useLocalObservable } from "mobx-react-lite"
import { AccordionProps, AccordionItemProps } from "@free/core"

const activeColor = color(theme.accordion_icon_active_bg)
const defaultColor = color(theme.default_text)

export const Accordion: React.FC<AccordionProps> = observer(
  ({ testID = "Accordion", icon, label, active = false, children }) => {
    const state = useLocalObservable(() => ({
      isExpand: active,
      toggle() {
        state.isExpand = !state.isExpand
      },
    }))
    const itemHeight = 46
    const childHeight = React.Children.count(children) * itemHeight
    const opacity = React.useRef(new Animated.Value(0)).current
    const height = opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, childHeight],
    })

    React.useEffect(() => {
      Animated.timing(opacity, {
        toValue: state.isExpand ? 1 : 0,
        duration: 120,
        useNativeDriver: false,
      }).start()
    }, [state.isExpand])

    return (
      <TouchableOpacity onPress={state.toggle}>
        <View style={s.viewAccordion} testID={testID}>
          <View style={s.viewWrapper}>
            <IconLabel
              name={icon}
              color={state.isExpand ? activeColor : defaultColor}
              style={[s.icon, state.isExpand ? s.iconExpand : {}]}
              styleContainer={s.viewIcon}
              styleText={[
                s.textIcon,
                { color: state.isExpand ? activeColor : defaultColor },
              ]}
            >
              {label}
            </IconLabel>
            <Icon
              size={20}
              color={state.isExpand ? activeColor : defaultColor}
              name={`chevron-${state.isExpand ? "up" : "down"}`}
            />
          </View>
          <Animated.View style={[s.viewChildren, { height, opacity }]}>
            {children}
          </Animated.View>
        </View>
      </TouchableOpacity>
    )
  }
)

export const AccordionItem: React.FC<AccordionItemProps> = observer(
  ({
    testID = "AccordionItem",
    active,
    icon,
    children,
    navigation,
    component,
  }) => {
    return (
      <Link navigation={navigation} testID={testID} name={component}>
        <IconLabel
          name={icon}
          size={20}
          color={active ? activeColor : defaultColor}
          styleContainer={s.viewIconItem}
          styleText={[
            s.textIconItem,
            { color: active ? activeColor : defaultColor },
          ]}
        >
          {children}
        </IconLabel>
      </Link>
    )
  }
)

const s = StyleSheet.create({
  viewAccordion: tw("flex-col z-10"),
  viewWrapper: tw(`flex-row px-4 py-3 items-center`),
  viewChildren: tw("flex-col flex-shrink z-0"),
  viewIcon: tw("flex-grow flex-row items-center"),
  viewIconItem: tw(`flex-row px-4 py-3 pl-10 items-center`),
  icon: tw("p-2 shadow-md bg-white rounded"),
  iconExpand: tw(theme.accordion_icon_active_border),
  textIconItem: tw(`px-2`),
  textIcon: tw(`px-2`),
})

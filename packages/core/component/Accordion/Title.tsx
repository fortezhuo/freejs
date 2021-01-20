import React from "react"
import { View, StyleSheet } from "react-native"
import { Icon } from "../Icon"
import { Text } from "../Text"
import { theme } from "../../config/theme"
import { tw, color } from "@free/tailwind"

const activeColor = color(theme.accordion_icon_active_bg)
const defaultColor = color(theme.default_text)

interface Title {
  isExpand: boolean
  icon: string
  testID?: string
  label: string
}

export const Title: React.FC<Title> = ({ isExpand, icon, testID, label }) => {
  return (
    <View style={[s.viewAccordion, s.viewWrapper]} testID={testID}>
      <View style={[s.icon, isExpand ? s.iconExpand : {}]}>
        <Icon
          size={24}
          color={isExpand ? activeColor : defaultColor}
          name={icon}
        />
      </View>
      <Text
        style={[s.textIcon, { color: isExpand ? activeColor : defaultColor }]}
      >
        {label}
      </Text>
      <View style={{ position: "absolute", right: 10 }}>
        <Icon
          size={20}
          color={isExpand ? activeColor : defaultColor}
          name={`chevron-${isExpand ? "up" : "down"}`}
        />
      </View>
    </View>
  )
}

interface SubTitle {
  icon: string
  active?: boolean
  children: React.ReactNode
}

export const SubTitle: React.FC<SubTitle> = ({ icon, active, children }) => {
  return (
    <View style={s.viewIconItem}>
      <Icon name={icon} size={20} color={active ? activeColor : defaultColor} />
      <Text
        style={[s.textIconItem, { color: active ? activeColor : defaultColor }]}
      >
        {children}
      </Text>
    </View>
  )
}

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

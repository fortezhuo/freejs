import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { theme } from "../../config/theme"
import { Icon } from "../Icon"
import { H5 } from "../Text"
import { tw, color } from "@free/tailwind"

const defaultColor = color(theme.disabled_text)
export const Section: React.FC<{
  testID?: string
  label: string
  show?: boolean
  children: React.ReactNode
  right?: React.ReactNode
}> = ({ testID = "Section", label, show = true, children, right }) => {
  const [isExpand, setExpand] = React.useState(show)
  const Title = () =>
    React.useMemo(() => <H5 style={s.textSection}>{label}</H5>, [])

  return (
    <View style={s.rootSection} testID={testID}>
      <TouchableOpacity onPress={() => setExpand(isExpand ? false : true)}>
        <View style={s.groupSection}>
          <Icon
            color={defaultColor}
            size={20}
            name={`chevron-${isExpand ? "up" : "down"}`}
          />
          <Title />
          {right}
        </View>
      </TouchableOpacity>
      <View
        style={[
          s.groupItem,
          isExpand ? { height: undefined } : { height: 0, opacity: 0 },
        ]}
      >
        {children}
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  rootSection: tw(
    `flex-col shadow-md border-t border-gray-100 bg-white rounded-t-md my-1`
  ),
  groupSection: tw(
    `flex-row z-10 p-3 py-1 items-center border-b border-gray-300`
  ),
  groupLabel: tw("flex-grow flex-row items-center"),
  groupItem: tw(`bg-white flex-col`),
  textSection: tw(`px-2 ${theme.disabled_text} flex-grow`),
})

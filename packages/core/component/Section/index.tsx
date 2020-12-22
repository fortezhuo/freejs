import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { theme } from "../../config/theme"
import { Icon, H5 } from ".."
import { tw, color } from "@free/tailwind"
import { SectionProps } from "@free/core"
import { Wrapper } from "./Wrapper"

const defaultColor = color(theme.disabled_text)
export const Section: React.FC<SectionProps> = ({
  testID = "Section",
  label,
  show = true,
  children,
}) => {
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
        </View>
      </TouchableOpacity>
      <Wrapper {...{ isExpand }} style={s.groupItem}>
        {children}
      </Wrapper>
    </View>
  )
}

const s = StyleSheet.create({
  rootSection: tw(
    `flex-col shadow-md border-t border-gray-100 bg-white rounded-t-md my-1`
  ),
  groupSection: tw(`flex-row z-10 p-3 items-center border-b border-gray-400`),
  groupLabel: tw("flex-grow flex-row items-center"),
  groupItem: tw(`bg-white flex-col`),
  textSection: tw(`px-2 ${theme.disabled_text}`),
})

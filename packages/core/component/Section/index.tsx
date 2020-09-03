import React, { FC } from "react"
import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { theme } from "../../config/theme"
import { Icon } from "../Icon"
import { tw } from "@free/tailwind"
import { observer, useLocalStore } from "mobx-react-lite"
import { SectionProps } from "@free/core"

const { color } = tw(theme.textSection)
export const Section: FC<SectionProps> = observer(
  ({ testID = "Section", label, show = true, children }) => {
    const state = useLocalStore(() => ({
      isExpand: show,
      toggle() {
        state.isExpand = !state.isExpand
      },
    }))

    return (
      <View style={styles.rootSection} testID={testID}>
        <TouchableOpacity onPress={state.toggle}>
          <View style={styles.groupSection}>
            <Icon
              color={color}
              size={20}
              name={`chevron-${state.isExpand ? "up" : "down"}`}
            />
            <Text style={styles.textSection}>{label}</Text>
          </View>
        </TouchableOpacity>
        {state.isExpand && <View style={styles.groupItem}>{children}</View>}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  rootSection: tw(
    `flex-col mb-3 shadow-md border-l border-r ${theme.borderSection}`
  ),
  groupSection: tw(
    `flex-row z-10 ${theme.bgSection} border-t border-b ${theme.borderSection} p-3 items-center`
  ),
  groupLabel: tw("flex-grow flex-row items-center"),
  groupItem: tw(
    `bg-white flex-col flex-shrink z-0 p-2 border-b ${theme.borderSection}`
  ),
  textSection: tw(`px-2 ${theme.textSection}`),
})

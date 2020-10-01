import React, { FC } from "react"
import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { theme } from "../../config/theme"
import { Icon } from "../Icon"
import { tw, color } from "@free/tailwind"
import { observer, useLocalStore } from "mobx-react-lite"
import { SectionProps } from "@free/core"

const textColor = color(theme.input_text)
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
              color={textColor}
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
    `flex-col shadow-md border-t border-gray-100 bg-white rounded-t-md my-1`
  ),
  groupSection: tw(`flex-row z-10 p-3 items-center border-b border-gray-400`),
  groupLabel: tw("flex-grow flex-row items-center"),
  groupItem: tw(`bg-white flex-col`),
  textSection: tw(`px-2 font-bold ${theme.input_text}`),
})

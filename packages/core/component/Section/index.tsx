import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { theme } from "../../config/theme"
import { Icon, H5 } from ".."
import { tw, color } from "@free/tailwind"
import { observer, useLocalObservable } from "mobx-react-lite"
import { SectionProps } from "@free/core"

const defaultColor = color(theme.disabled_text)
export const Section: React.FC<SectionProps> = observer(
  ({ testID = "Section", label, show = true, children }) => {
    const state = useLocalObservable(() => ({
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
              color={defaultColor}
              size={20}
              name={`chevron-${state.isExpand ? "up" : "down"}`}
            />
            <H5 style={styles.textSection}>{label}</H5>
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
  textSection: tw(`px-2 ${theme.disabled_text}`),
})

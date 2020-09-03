import React, { FC } from "react"
import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { theme } from "../../config/theme"
import { Icon } from "../Icon"
import { tw } from "@free/tailwind"
import { observer, useLocalStore } from "mobx-react-lite"
//import { SectionProps, SectionItemProps } from "@free/core"

const { color } = tw(theme.textSection)
export const Section: FC<any> = observer(
  ({ testID = "Section", label, active = false, children }) => {
    const state = useLocalStore(() => ({
      isExpand: active,
      toggle() {
        state.isExpand = !state.isExpand
      },
    }))

    return (
      <TouchableOpacity onPress={state.toggle}>
        <View style={styles.rootSection} testID={testID}>
          <View style={styles.groupSection}>
            <Icon
              color={color}
              size={20}
              name={`chevron-${state.isExpand ? "up" : "down"}`}
            />
            <Text style={styles.textSection}>{label}</Text>
          </View>
          {state.isExpand && <View style={styles.groupItem}>{children}</View>}
        </View>
      </TouchableOpacity>
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
  groupItem: tw(`flex-col flex-shrink z-0 p-2 border-b ${theme.borderSection}`),
  textSection: tw(`px-2 ${theme.textSection}`),
})

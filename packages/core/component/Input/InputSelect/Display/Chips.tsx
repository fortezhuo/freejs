import React from "react"
import { Text } from "../../../Text"
import { Icon } from "../../../Icon"
import { StyleSheet, View, Platform, TouchableOpacity } from "react-native"
import { tw, color } from "@free/tailwind"
import { Clear } from "./Clear"
import { theme } from "../../../../config/theme"

interface Chip {
  onDeselect: VoidFunction
  children: any
}

const defaultColor = color(theme.default_text)

const Chip: React.FC<Chip> = React.memo(({ onDeselect, children }) => {
  return Platform.OS === "web" ? (
    <View style={s.viewChip}>
      {onDeselect && <Clear onPress={() => onDeselect(children)} />}
      <Text style={s.textChip}>{children}</Text>
    </View>
  ) : (
    <TouchableOpacity onPress={() => onDeselect(children)}>
      <View style={s.viewChip}>
        <Icon color={defaultColor} name="x" size={16} />
        <Text style={s.textChip}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
})

export const Chips = React.memo(({ children, onDeselect }: Chip) =>
  children.map((v: string, i: number) => (
    <Chip {...{ onDeselect, key: `chip_${i}` }}>{v}</Chip>
  ))
)

const s = StyleSheet.create({
  viewChip: tw(
    "rounded-lg flex-row flex-grow-0 h-8 items-center px-1 bg-gray-200",
    {
      margin: 1,
      marginHorizontal: 2,
    }
  ),
  textChip: tw(`${theme.default_text} mx-1`),
})

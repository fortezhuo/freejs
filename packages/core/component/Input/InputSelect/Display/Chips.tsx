import React from "react"
import { Text } from "../../.."
import { StyleSheet, View } from "react-native"
import { tw } from "@free/tailwind"
import { Clear } from "./Clear"
import { theme } from "../../../../config/theme"

interface Chip {
  onDeselect: VoidFunction
  children: any
  disabled?: boolean
}

const Chip: React.FC<Chip> = React.memo(
  ({ onDeselect, children, disabled }) => {
    return (
      <View style={s.viewChip}>
        {!disabled && <Clear onPress={() => onDeselect(children)} />}
        <Text style={s.textChip}>{children}</Text>
      </View>
    )
  }
)

export const Chips = React.memo(({ children, disabled, onDeselect }: Chip) =>
  children.map((v: string, i: number) => (
    <Chip {...{ onDeselect, disabled, key: `chip_${i}` }}>{v}</Chip>
  ))
)

const s = StyleSheet.create({
  viewChip: tw("rounded-lg flex-row flex-grow-0 h-8 items-center px-1", {
    margin: 1,
    marginHorizontal: 2,
    backgroundColor: "rgba(0,0,0,0.1)",
  }),
  textChip: tw(`${theme.default_text} mx-1`),
})

import React, { FC, memo } from "react"
import { IconButton } from "../../Icon"
import { StyleSheet } from "react-native"
import { tw } from "@free/tailwind"

export const Chip: FC<any> = memo(({ onPress, children }) => {
  return (
    <IconButton
      icon="x-square"
      style={styles.rootChip}
      styleText={styles.textChip}
      styleIcon={styles.iconChip}
      iconSize={12}
      iconColor={"#888"}
      onPress={onPress}
    >
      {children}
    </IconButton>
  )
})

const styles: any = StyleSheet.create({
  rootChip: {
    margin: 1,
    marginHorizontal: 2,
    ...tw("rounded bg-gray-400 flex-row h-5 items-center px-1"),
  },
  iconChip: { marginTop: 1, ...tw("mr-1") },
  textChip: tw("text-xs text-gray-700"),
})

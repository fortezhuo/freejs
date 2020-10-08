import React, { FC } from "react"
import { IconButton } from "../../Icon"
import { StyleSheet, Text, View } from "react-native"
import { observer } from "mobx-react-lite"
import { tw, color } from "@free/tailwind"
import { StateComponent } from "@free/core"
import { theme } from "../../../config/theme"
import { random } from "../../../util/random"

const Chip: FC<any> = observer(({ onPress, children }) => {
  return (
    <IconButton
      name="x-square"
      styleContainer={styles.viewChip}
      styleText={styles.textChip}
      style={styles.iconChip}
      size={16}
      color={"#888"}
      onPress={onPress}
    >
      {children}
    </IconButton>
  )
})

const Placeholder: FC<StateComponent> = observer(({ state }) => {
  return <Text style={styles.textPlaceholder}>{state.placeholder}</Text>
})

const Clear: FC<StateComponent> = observer(({ state }) => {
  const onClear = () => {
    state.onChange(undefined)
  }

  return state.value == null ? (
    <View />
  ) : (
    <IconButton
      color={color("bg-gray-700")}
      name="x"
      size={16}
      onPress={onClear}
    />
  )
})

export const Display: FC<StateComponent> = observer(({ state }) => {
  const { multi, display } = state

  return (
    <View style={styles.viewDisplay}>
      <View style={styles.viewValue} testID="ViewValue">
        {display ? (
          multi ? (
            display.map((_value: any) => (
              <Chip key={"chip_" + random()}>{_value}</Chip>
            ))
          ) : (
            <Text style={styles.textSingle}>{display}</Text>
          )
        ) : (
          <Placeholder state={state} />
        )}
      </View>
      {!state.disabled && <Clear state={state} />}
    </View>
  )
})

const styles = StyleSheet.create({
  viewDisplay: tw("flex-1 flex-row items-center"),
  viewValue: tw("flex-1 flex-row flex-wrap"),
  textSingle: tw(`flex-grow ml-2 ${theme.input_text}`),
  textPlaceholder: tw(`${theme.input_disabled_text} ml-2`),
  viewChip: tw("rounded-lg flex-row flex-grow-0 h-8 items-center px-1", {
    margin: 1,
    marginHorizontal: 2,
    backgroundColor: "rgba(0,0,0,0.1)",
  }),
  iconChip: tw("mr-1", { marginTop: 1 }),
  textChip: tw(`${theme.input_text}`),
})

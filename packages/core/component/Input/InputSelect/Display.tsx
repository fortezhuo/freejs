import React, { FC } from "react"
import { IconButton } from "../../Icon"
import { StyleSheet, Text, View } from "react-native"
import { observer } from "mobx-react-lite"
import { tw, color } from "@free/tailwind"
import { StateComponent } from "@free/core"
import { theme } from "../../../config/theme"

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
  const value = state.value
  return (
    <>
      {value ? (
        <Text style={styles.textSingle}>{value}</Text>
      ) : (
        <Placeholder state={state} />
      )}
      {!state.disabled && <Clear state={state} />}
    </>
  )
})

const styles = StyleSheet.create({
  textSingle: tw(`flex-grow ${theme.input_text}`),
  textPlaceholder: tw(theme.input_disabled_text),
})

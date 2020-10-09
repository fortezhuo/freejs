import React, { FC, useCallback } from "react"
import { Icon, IconButton, Text } from "../.."
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { tw, color } from "@free/tailwind"
import { StateComponent } from "@free/core"
import { theme } from "../../../config/theme"
import { random } from "../../../util/random"

const defaultColor = color(theme.default_text)

const Chip: FC<any> = observer(({ state, children }) => {
  const onClear = useCallback((val) => state.onClear(val), [])
  return (
    <View style={styles.viewChip}>
      <TouchableOpacity onPress={() => onClear(children)}>
        <Icon name="x" size={16} color={defaultColor}></Icon>
      </TouchableOpacity>
      <Text style={styles.textChip}>{children}</Text>
    </View>
  )
})

const Placeholder: FC<StateComponent> = observer(({ state }) => {
  return <Text style={styles.textPlaceholder}>{state.placeholder}</Text>
})

const Clear: FC<StateComponent> = observer(({ state }) => {
  const { multi, value } = state
  const onClear = useCallback(() => {
    state.onChange(multi ? [] : "")
  }, [])

  return (multi ? value.length == 0 : value === "") ? (
    <View />
  ) : (
    <IconButton color={defaultColor} name="x" size={16} onPress={onClear} />
  )
})

export const Display: FC<StateComponent> = observer(({ state }) => {
  const { multi, display } = state

  return (
    <View
      style={StyleSheet.flatten([
        styles.viewDisplay,
        multi ? styles.viewMulti : {},
      ])}
    >
      <View style={styles.viewValue} testID="ViewValue">
        {display ? (
          multi ? (
            display.map((_value: any) => (
              <Chip state={state} key={"chip_" + random()}>
                {_value}
              </Chip>
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
  viewDisplay: tw("flex-1 flex-row items-center mx-4"),
  viewMulti: tw("mt-1 ml-1 mb-1"),
  viewValue: tw("flex-1 flex-row flex-wrap"),
  textSingle: tw(`flex-grow ${theme.default_text}`),
  textPlaceholder: tw(`${theme.disabled_text}`),
  viewChip: tw("rounded-lg flex-row flex-grow-0 h-8 items-center px-1", {
    margin: 1,
    marginHorizontal: 2,
    backgroundColor: "rgba(0,0,0,0.1)",
  }),
  textChip: tw(`${theme.default_text} mx-1`),
})

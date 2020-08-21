import React, { FC } from "react"
import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { IconButton } from "../../Icon"
import { random } from "../../../helper/util"
import { Chip } from "./Chip"
import { tw } from "@free/tailwind"
import { view } from "@risingstack/react-easy-state"
import _isArray from "lodash/isArray"
import _isEmpty from "lodash/isEmpty"

export const Anchor: FC<any> = view((props) => {
  const { open, parent, onLayout } = props
  const { state, model, name, disabled } = parent
  const parentValue = state ? (state[model] ? state[model][name] : "") : ""

  return (
    <TouchableOpacity disabled={disabled} onPress={open}>
      <View
        style={StyleSheet.flatten([
          styles.rootAnchor,
          parent.disabled ? styles.rootDisabled : {},
        ])}
        onLayout={onLayout}
      >
        {_isEmpty(parentValue) ? (
          <Text style={styles.textPlaceholder}>{parent.placeholder}</Text>
        ) : (
          <>
            {parent.multi ? (
              (parentValue
                ? _isArray(parentValue)
                  ? parentValue
                  : [parentValue]
                : []
              ).map((v, i) => {
                return (
                  <Chip
                    key={"chip_" + random()}
                    onPress={() => parent.onClear(v)}
                  >
                    {v}
                  </Chip>
                )
              })
            ) : (
              <>
                <Text>{parentValue}</Text>
                {parent.clearable && (
                  <IconButton
                    icon="x"
                    style={styles.rootClear}
                    onPress={parent.onClear}
                  ></IconButton>
                )}
              </>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  rootAnchor: tw(
    "bg-white p-2 flex-row items-start flex-wrap border rounded border-gray-300",
    { minHeight: 35 }
  ),
  rootDisabled: tw("bg-gray-400"),
  textPlaceholder: { color: "#777" },
  rootClear: tw("absolute right-0"),
})

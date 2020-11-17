import React from "react"
import { IconButton } from "../../Icon"
import { StyleSheet } from "react-native"
import { theme } from "../../../config/theme"
import { tw, color } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { InputCheckboxProps } from "@free/core"

const defaultColor = color(theme.default_text)

export const InputCheckbox: React.FC<InputCheckboxProps> = observer(
  ({
    testID = "InputCheckbox",
    multi = true,
    model = "data",
    store,
    name,
    value,
    color,
    style,
    disabled,
    onChange,
    children,
  }) => {
    let stored = store[model].get(name)
    stored = multi ? (stored ? stored : []) : stored ? stored : ""

    const checked = multi ? stored.indexOf(value) >= 0 : stored === value
    const onPress = async () => {
      if (checked) {
        store[model].set(
          name,
          multi ? stored.filter((v: string) => v !== value) : ""
        )
      } else {
        store[model].set(name, multi ? stored.concat([value]) : value)
      }
      if (onChange) await onChange()
    }

    return (
      <IconButton
        testID={testID}
        disabled={disabled}
        style={StyleSheet.flatten([styles.iconCheckbox, style])}
        name={checked ? "check-square" : "square"}
        color={color || defaultColor}
        size={18}
        onPress={onPress}
      >
        {children}
      </IconButton>
    )
  }
)

const styles = StyleSheet.create({
  iconCheckbox: { paddingTop: 1, ...tw("h-6") },
})

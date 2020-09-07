import React, { FC } from "react"
import FeatherIcon from "react-native-vector-icons/Feather"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { theme } from "../../config/theme"
import { color } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { IconProps, IconLabelProps, IconButtonProps } from "@free/core"
import { tw } from "@free/tailwind"

const disabledColor = color(theme.textDisabled)
const iconColor = color(theme.primary)

export const Icon: FC<IconProps> = observer(
  ({ name, size = 24, color = iconColor }) => {
    return name ? (
      <FeatherIcon name={name} size={size} color={color} />
    ) : (
      <View />
    )
  }
)

export const IconLabel: FC<IconLabelProps> = observer(
  ({
    testID = "IconLabel",
    name,
    size,
    color,
    style,
    styleContainer,
    styleText,
    children,
  }) => {
    return (
      <View style={styleContainer} testID={testID}>
        <View style={style}>
          {name && <Icon size={size} color={color} name={name} />}
        </View>
        {children && <Text style={styleText}>{children}</Text>}
      </View>
    )
  }
)

export const IconButton: FC<IconButtonProps> = observer(
  ({
    testID = "IconButton",
    name,
    color,
    size,
    style,
    styleContainer,
    styleText,
    children,
    disabled,
    onPress,
  }) => {
    return (
      <TouchableOpacity testID={testID} disabled={disabled} onPress={onPress}>
        <IconLabel
          style={style}
          styleContainer={StyleSheet.flatten([
            styleContainer,
            disabled ? styles.disabledContainer : {},
          ])}
          styleText={StyleSheet.flatten([
            styleText,
            disabled ? styles.disabledText : {},
          ])}
          name={name}
          size={size}
          color={disabled ? disabledColor : color}
        >
          {children}
        </IconLabel>
      </TouchableOpacity>
    )
  }
)

export const IconLink: FC<IconButtonProps> = observer(() => {
  return <IconButton size={20} name="link" color={color(theme.primary)} />
})

const styles = StyleSheet.create({
  disabledContainer: tw(theme.bgDisabled),
  disabledText: tw(theme.textDisabled),
})

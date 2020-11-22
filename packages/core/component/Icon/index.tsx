import React from "react"
import FeatherIcon from "react-native-vector-icons/Feather"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { Base } from "../Base"
import { theme } from "../../config/theme"
import { color } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { IconProps, IconLabelProps, IconButtonProps } from "@free/core"
import { tw } from "@free/tailwind"

const disabledColor = color(theme.disabled_text)
const iconColor = "white"

export const Icon: React.FC<IconProps> = observer(
  ({ name, size = 24, color = iconColor }) => {
    return name ? (
      <FeatherIcon name={name} size={size} color={color} />
    ) : (
      <View />
    )
  }
)

export const IconLabel: React.FC<IconLabelProps> = observer(
  ({
    testID = "IconLabel",
    store,
    name,
    size,
    color,
    style,
    styleContainer,
    styleText,
    children,
  }) => {
    return (
      <Base
        isLoading={store ? store.isLoading : false}
        style={styleContainer}
        testID={testID}
      >
        <View style={style}>
          {name && <Icon size={size} color={color} name={name} />}
        </View>
        {children && <Text style={styleText}>{children}</Text>}
      </Base>
    )
  }
)

export const IconButton: React.FC<IconButtonProps> = observer(
  ({
    testID = "IconButton",
    store,
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
          store={store}
          style={style}
          styleContainer={[styleContainer, disabled ? s.viewDisabled : {}]}
          styleText={[styleText, disabled ? s.disabled_text : {}]}
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

export const IconLink: React.FC<IconButtonProps> = observer(() => {
  return <IconButton size={20} name="link" color={color(theme.primary)} />
})

const s = StyleSheet.create({
  viewDisabled: tw(theme.disabled_bg),
  disabled_text: tw(theme.disabled_text),
})

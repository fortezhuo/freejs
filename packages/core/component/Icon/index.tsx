import React, { FC } from "react"
import FeatherIcon from "react-native-vector-icons/Feather"
import { TouchableOpacity, View, Text } from "react-native"
import { theme } from "../../config/theme"
import { color } from "@free/tailwind"
import { observer } from "mobx-react-lite"

const disabledColor = color("bg-gray-600")

export const Icon: FC<Icon> = observer(
  ({ name, size = 24, color = "white" }) => {
    return <FeatherIcon name={name} size={size} color={color} />
  }
)

export const IconLabel: FC<IconLabel> = observer(
  ({ name, size, color, style, styleContainer, styleText, children }) => {
    return (
      <View style={styleContainer}>
        <View style={style}>
          {name && <Icon size={size} color={color} name={name} />}
        </View>
        {children && <Text style={styleText}>{children}</Text>}
      </View>
    )
  }
)

export const IconButton: FC<IconButton> = observer(
  ({ name, color, size, style, styleText, children, disabled, onPress }) => {
    return (
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        <IconLabel
          style={style}
          styleText={styleText}
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

export const IconLink: FC<IconButton> = observer(() => {
  return <IconButton size={20} name="link" color={color(theme.primary)} />
})

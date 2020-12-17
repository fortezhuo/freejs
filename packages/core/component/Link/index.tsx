import React from "react"
import { TouchableOpacity } from "react-native"
import { useLink } from "./helper"

export const Link: React.FC<any> = ({
  target,
  name,
  params,
  disabled,
  navigation,
  children,
}) => {
  const onPress = useLink(name, params, navigation)
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

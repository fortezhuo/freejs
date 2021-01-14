import React from "react"
import { TouchableOpacity } from "react-native"
import { useLink } from "./helper"

interface Link {
  target?: string
  name: string
  params?: JSONObject
  disabled?: boolean
  navigation: any
  children: React.ReactNode
}
export const Link: React.FC<Link> = ({
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

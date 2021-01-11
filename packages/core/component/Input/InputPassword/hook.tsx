import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { Icon } from "../../Icon"

const { color } = tw("text-gray-700")

export const useEyeToggle = () => {
  const [secure, setSecure] = React.useState<boolean>(true)
  const toggle = React.useCallback(() => setSecure((prev) => !prev), [])

  const Eye: React.FC = React.memo(() => (
    <TouchableOpacity style={s.eye} onPress={toggle}>
      <Icon color={color} size={16} name={secure ? "eye" : "eye-off"} />
    </TouchableOpacity>
  ))

  return [secure, Eye]
}

const s: any = StyleSheet.create({
  eye: tw("mt-1 mr-3"),
})

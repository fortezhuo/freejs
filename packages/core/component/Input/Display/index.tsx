import React from "react"
import { useController } from "react-hook-form"
import { Text, TextProps } from "react-native"

interface InputDisplay extends TextProps {
  name: string
  control: any
  defaultValue?: any
}

export const InputDisplay: React.FC<InputDisplay> = ({
  name,
  control,
  style,
  defaultValue = "",
}) => {
  const {
    field: { value },
  } = useController({
    name,
    control,
    defaultValue,
  })

  const strValue = typeof value === "string" ? value : JSON.stringify(value)

  return <Text style={style}>{strValue}</Text>
}

import React from "react"
import { Text } from "react-native"
import { useController } from "react-hook-form"
import _startCase from "lodash/startCase"

export const Title: React.FC<{
  document: JSONObject
  name: string
  defaultValue: string
}> = React.memo(({ document, name, defaultValue }) => {
  const {
    field: { ref, value },
  } = useController({
    name,
    control: document.control,
    defaultValue,
  })

  return (
    <Text style={{ fontSize: 18, marginVertical: 3 }}>{_startCase(value)}</Text>
  )
})

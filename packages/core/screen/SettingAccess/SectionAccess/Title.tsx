import React from "react"
import { TextInput } from "react-native"
import { useController } from "react-hook-form"
import _startCase from "lodash/startCase"

export const Title: React.FC<any> = React.memo(
  ({ control, name, defaultValue }) => {
    const {
      field: { ref, value },
    } = useController({
      name,
      control,
      defaultValue,
    })

    return (
      <TextInput
        value={_startCase(value)}
        editable={false}
        style={{ fontSize: 18, marginVertical: 3 }}
      />
    )
  }
)

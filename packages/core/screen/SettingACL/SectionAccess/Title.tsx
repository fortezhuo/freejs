import React from "react"
import { TextInput } from "react-native"
import { useController } from "react-hook-form"

export const Title: React.FC<any> = React.memo(
  ({ control, name, defaultValue }) => {
    const {
      field: { ref, onChange: onChangeText, value },
    } = useController({
      name,
      control,
      defaultValue,
    })

    return (
      <TextInput
        {...{ value, onChangeText }}
        editable={false}
        style={{ fontSize: 18, marginVertical: 3 }}
      />
    )
  }
)

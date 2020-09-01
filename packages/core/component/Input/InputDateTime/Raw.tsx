import React, { FC } from "react"
import RNDateTimePicker from "@react-native-community/datetimepicker"

export const DateTimePicker: FC<any> = ({
  value,
  type = "date",
  onChange,
  ...rest
}) => {
  return (
    <RNDateTimePicker
      testID="dateTimePicker"
      value={value}
      mode={type}
      is24Hour={true}
      display="default"
      onChange={onChange}
      {...rest}
    />
  )
}

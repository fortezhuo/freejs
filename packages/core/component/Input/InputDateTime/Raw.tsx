import React from "react"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { theme } from "../../../config/theme"
import { useMenu } from "../../Menu"
import { Text, StyleSheet, View, TouchableWithoutFeedback } from "react-native"
import { tw } from "@free/tailwind"
import dayjs from "dayjs"

export const DateTimePicker: React.FC<any> = ({
  value,
  disabled,
  type = "date",
  onChange,
}) => {
  const [date, setDate] = React.useState(new Date())
  const { Menu, show, hide } = useMenu()
  const onChangeDate = (e: any, selectedDate: any) => {
    const currentDate = selectedDate || date
    setDate(currentDate)
    onChange(currentDate)
    hide()
  }
  const format = (value: any) =>
    dayjs(value).format(type ? "DD MMM YYYY" : "HH:mm")

  return (
    <Menu
      anchor={
        <TouchableWithoutFeedback disabled={disabled} onPress={show}>
          <View style={[s.viewAnchor, disabled ? s.inputDisabled : {}]}>
            <Text style={s.textAnchor}>{value ? format(value) : ""}</Text>
          </View>
        </TouchableWithoutFeedback>
      }
    >
      <View style={s.viewDatePicker}>
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={type}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      </View>
    </Menu>
  )
}

const s = StyleSheet.create({
  viewDatePicker: tw(theme.default_bg),
  viewAnchor: tw(
    `${theme.input_border} ${theme.default_bg} p-2 w-full flex-row`
  ),
  textAnchor: tw(theme.default_text),
  inputDisabled: tw(theme.disabled_bg),
})

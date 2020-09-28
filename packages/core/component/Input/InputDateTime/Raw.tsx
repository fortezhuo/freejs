import React, { FC, useState } from "react"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { theme } from "../../../config/theme"
import { useMenu } from "../../Menu"
import { Text, StyleSheet, View, TouchableWithoutFeedback } from "react-native"
import { tw } from "@free/tailwind"
import dayjs from "dayjs"

export const DateTimePicker: FC<any> = ({
  value,
  disabled,
  type = "date",
  onChange,
}) => {
  const [date, setDate] = useState(new Date())
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
          <View
            style={StyleSheet.flatten([
              styles.rootAnchor,
              disabled ? styles.inputDisabled : {},
            ])}
          >
            <Text style={styles.textAnchor}>{value ? format(value) : ""}</Text>
          </View>
        </TouchableWithoutFeedback>
      }
    >
      <View style={styles.rootMenu}>
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

const styles = StyleSheet.create({
  rootMenu: tw(theme.input_bg),
  rootAnchor: tw(`${theme.input_border} ${theme.input_bg} p-2 w-full flex-row`),
  textAnchor: tw(theme.input_text),
  inputDisabled: tw(theme.input_disabled_bg),
  inputError: tw(theme.input_error_bg),
})

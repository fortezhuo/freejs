import React, { FC } from "react"
import WebDateTimePicker from "react-flatpickr"

export const DateTimePicker: FC<any> = ({
  value,
  type = "date",
  onChange,
  ...rest
}) => {
  return (
    <WebDateTimePicker
      options={{
        time_24hr: true,
        enableTime: type == "time",
        noCalendar: type == "time",
        dateFormat: type == "time" ? "H:i" : "d M Y",
      }}
      value={value}
      onChange={onChange}
      className="flatpickr-freejs"
      {...rest}
    />
  )
}

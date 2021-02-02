import React from "react"
import WebDateTimePicker from "react-flatpickr"

const Picker: any = WebDateTimePicker
export const DateTimePicker: React.FC<JSONObject> = ({
  value,
  type = "date",
  onChange,
  ...rest
}) => {
  return (
    <Picker
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

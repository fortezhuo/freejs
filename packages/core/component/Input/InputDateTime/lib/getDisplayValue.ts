import { formatDate, formatTime } from "../../../../util"

export const getDisplayValue = (value: any, type: string) => {
  return type == "date" ? formatDate(value) : formatTime(value)
}

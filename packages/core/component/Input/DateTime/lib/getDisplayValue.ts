import { formatDate, formatTime } from "../../../../util"

export const getDisplayValue = (value: any, type: string) => {
  return value ? (type == "date" ? formatDate(value) : formatTime(value)) : ""
}

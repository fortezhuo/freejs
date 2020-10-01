import { Config } from "@free/core"
import { adjust } from "@free/tailwind"

/* Banpu */
/*
Purple : bg-purple-800
Blue   : bg-blue-400
Plum   : bg-pink-800
Pink   : bg-pink-600
Green  : bg-green-400
Gray   : bg-gray-400
Black  : bg-gray-900
*/

let theme: Config = {
  primary_1_bg: "bg-purple-800",
  primary_2_bg: "bg-blue-400",
  secondary_1_bg: "bg-gray-600",
  secondary_2_bg: "bg-gray-400",
  danger_bg: "bg-pink-800",
  success_bg: "bg-green-400",
  warning_bg: "bg-yellow-500",
}

theme = {
  ...theme,
  accordion_icon_active_border: "border border-pink-200",
  accordion_icon_active_bg: "bg-pink-600",
  accordion_text: "bg-gray-900",
  grid_column_input_bg: "bg-white",
  grid_column_input_border: "border border-gray-300",
  grid_label: "text-gray-900",
  input_bg: "bg-white",
  input_border: "border rounded-lg border-gray-400",
  input_text: "text-gray-900",
  input_disabled_bg: theme.secondary_2_bg,
  input_disabled_text: "text-gray-600",
  input_error_bg: "bg-red-200",
}

export { theme }

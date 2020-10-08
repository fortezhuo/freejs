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
  danger_bg: "bg-pink-800",
  success_bg: "bg-green-400",
  warning_bg: "bg-yellow-500",
  default_bg: "bg-white",
  default_border: "border-gray-400",
  default_text: "text-gray-900",
  disabled_bg: "bg-gray-400",
  disabled_text: "text-gray-600",
}

theme = {
  ...theme,
  accordion_icon_active_border: "border border-pink-200",
  accordion_icon_active_bg: "bg-pink-600",
  input_border: `border rounded-lg ${theme.default_border}`,
  input_error_bg: "bg-red-200",
  single_button_bg: theme.danger_bg,
}

export { theme }

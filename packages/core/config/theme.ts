import { Config } from "@free/core"
import { adjust, text } from "@free/tailwind"

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
  primary_1: "bg-purple-800",
  primary_2: "bg-blue-400",
  secondary_1: "bg-gray-600",
  secondary_2: "bg-gray-400",
  accordion_border_icon_active: "border border-pink-200",
  accordion_bg_active: "bg-pink-600",
  accordion_text: "bg-gray-900",

  primary: "bg-blue-500",
  warning: "bg-yellow-500",
  default: "bg-gray-300",
  danger: "bg-red-700",
  success: "bg-green-500",
  disabled: "bg-gray-400",
}

theme = {
  ...theme,
  // Accordion
  bgAccordionItemActive: "bg-black-100",
  borderAccordion: `border-b border-gray-300`,
  textAccordion: text(theme.primary),
  textAccordionItem: "text-gray-700",
  textAccordionItemActive: "text-gray-700",
  // Action Bar
  bgActionBar: "bg-white-700",
  // Footer
  bgFooter: "bg-black-500",
  textFooter: "text-white",
  // Form
  bgFormInput: "bg-white",
  bgFormRow: "bg-gray-300",
  borderFormCol: "border border-gray-300",
  textFormLabel: "text-gray-700",
  // Header
  bgHeader: theme.primary,
  // Input
  bgDisabled: theme.disabled,
  bgError: "bg-red-200",
  textDisabled: "text-gray-600",
  bgInput: "bg-white",
  borderInput: "border rounded border-gray-300",
  textInput: "text-gray-900",
  // Menu
  bgMenuItemActive: adjust(theme.primary, -3),
  borderMenuItem: "border-solid border-t border-gray-300",
  textMenuItem: "text-gray-700",
  // Section
  bgSection: "bg-gray-200",
  borderSection: "border-gray-400",
  textSection: "text-gray-700",
  // Snackbar
  textSnackbar: "text-white",
  // Table
  bgTable: "bg-white-800",
  bgRowDark: adjust(theme.primary, -4),
  bgRowFilter: "bg-red-200",
  borderTable: "border-gray-400 border-solid",
  textCell: "text-gray-900",
  // Title
  textTitle: "text-white",
}

export { theme }

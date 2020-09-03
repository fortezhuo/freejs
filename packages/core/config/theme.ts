import { Config } from "@free/core"
import { adjust, border } from "@free/tailwind"

let theme: Config = {
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
  bgAccordion: theme.primary,
  bgAccordionItem: adjust(theme.primary, -4),
  bgAccordionItemActive: adjust(theme.primary, -1),
  borderAccordion: `border-b ${border(adjust(theme.primary, -3))}`,
  textAccordion: "text-white",
  textAccordionItem: "text-gray-600",
  textAccordionItemActive: "text-white",
  // Action Bar
  bgActionBar: "bg-white-700",
  // Footer
  bgFooter: theme.primary,
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
  bgRowDark: "bg-gray-300",
  bgRowFilter: "bg-red-200",
  borderTable: "border-gray-400 border-solid",
  textCell: "text-gray-900",
  // Title
  textTitle: "text-white",
}

export { theme }

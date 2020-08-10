type ListStore =
  | {
      [key: string]: any
    }
  | undefined

interface Icon {
  name: string
  size?: number
  color?: string
}

interface IconLabel extends Icon {
  style?: any
  styleContainer?: any
  styleText?: any
  children?: string
}

interface IconButton extends IconLabel {
  disabled?: boolean
  onPress?: VoidFunction
}

interface Accordion {
  icon: string
  label: string
  children: JSX.Element | JSX.Element[]
}

interface AccordionItem {
  icon: string
  header?: boolean
  children: string
  onPress?: VoidFunction
  onClose?: VoidFunction
}

interface Sidebar extends ViewProps {
  isOpen: boolean
}

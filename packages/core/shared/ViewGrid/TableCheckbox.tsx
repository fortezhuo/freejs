import React from "react"
import { Icon } from "../../component"
import { TouchableOpacity } from "react-native"
import { theme } from "../../config/theme"
import { color } from "@free/tailwind"
const defaultColor = color(theme.default_text)

export const TableCheckbox = React.forwardRef(
  ({ indeterminate, checked, onChange }: any, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef: any = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <TouchableOpacity ref={resolvedRef} onPress={onChange}>
        <Icon
          name={
            indeterminate ? "minus-square" : checked ? "check-square" : "square"
          }
          color={defaultColor}
          size={18}
        />
      </TouchableOpacity>
    )
  }
)

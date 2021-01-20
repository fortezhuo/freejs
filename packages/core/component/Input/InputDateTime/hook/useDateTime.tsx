import React from "react"
import { getDisplayValue } from "../lib/getDisplayValue"

export const useDateTime = ({
  value = null,
  type = "date",
  disabled = false,
}: JSONObject) => {
  const [focus, setFocus] = React.useState<boolean>(false)

  const snapshot = React.useMemo(() => {
    return {
      display: getDisplayValue(value, type),
      focus,
      value,
      disabled,
    }
  }, [value, disabled, focus])

  const onShow = React.useCallback(() => {
    setFocus(true)
  }, [setFocus])

  const onHide = React.useCallback(() => {
    setFocus(false)
  }, [setFocus])

  return [snapshot, { onShow, onHide }] as any
}

import React from "react"
import numeral from "numeral"

export const useNumber = ({ value, onChange }: JSONObject): [string, any] => {
  const [formatted, setFormatted] = React.useState("")

  const onChangeText = React.useCallback(
    (formatted: string) => {
      onChange(numeral(formatted).value())
      setFormatted(formatted)
    },
    [setFormatted]
  )

  React.useEffect(() => {
    setFormatted(`${value}`)
  }, [value])

  return [formatted, onChangeText]
}

import React from "react"
import { Platform, TextInput } from "react-native"
import { getOptions } from "../lib/getOptions"
import { getDisplayValue } from "../lib/getDisplayValue"
import { useFetch } from "./useFetch"
import { getValues } from "../lib/getValues"
import { valueToArray } from "../lib/valueToArray"

const highlightReducer = function (
  highlighted: any,
  { key, options }: any
): any {
  const max = options.length - 1

  if (key === "Reset") return 0

  let newHighlighted = key === "ArrowDown" ? highlighted + 1 : highlighted - 1

  if (newHighlighted < 0) {
    newHighlighted = max
  } else if (newHighlighted > max) {
    newHighlighted = 0
  }

  return newHighlighted
}

export function useSelect({
  keyValue = "value",
  keyLabel = "label",
  value = null,
  options: defaultOptions = [],
  search: canSearch = false,
  multiple = false,
  disabled = false,
  closeOnSelect = true,
  loadOptions = null,
  onChange = (...args: any) => {},
  debounce = 0,
}) {
  const ref = React.useRef<TextInput>(null)
  const refSelected = React.useRef<any>(null)
  const [selected, setSelect]: any = React.useState(null)
  const [search, setSearch] = React.useState("")
  const [focus, setFocus] = React.useState(false)
  const [highlighted, dispatchHighlighted] = React.useReducer(
    highlightReducer,
    0
  )

  const filterOptions = React.useCallback(
    (options: JSONObject[]) => {
      return (text: string) => {
        const regex = !text.length ? undefined : new RegExp(text, "i")
        const aValue = !!value ? valueToArray(value) : []
        return options.filter(
          (o) =>
            aValue.indexOf(o[keyValue]) < 0 &&
            (regex ? regex.test(o[keyLabel]) : true)
        )
      }
    },
    [value]
  )

  const { options, isFetching } = useFetch(search, defaultOptions, {
    keyLabel,
    loadOptions,
    filterOptions: canSearch ? filterOptions : null,
    debounceTime: debounce,
  })

  React.useEffect(() => {
    if (focus) {
      setTimeout(() => {
        ref.current?.focus()
      }, 100)
    }
  }, [focus])

  React.useEffect(() => {
    if (refSelected.current == value) return
    refSelected.current = value

    const selected = getOptions(
      value,
      [],
      [...defaultOptions, ...options],
      multiple,
      keyValue
    )
    setSelect(selected)
  }, [value])

  const snapshot = React.useMemo(() => {
    return {
      options,
      display: getDisplayValue(selected, keyLabel, multiple),
      value: getValues(selected, keyValue, multiple),
      keyValue,
      keyLabel,
      search,
      isFetching,
      focus,
      highlighted,
      disabled,
    }
  }, [disabled, isFetching, focus, highlighted, search, selected, options])

  const onShow = React.useCallback(() => {
    dispatchHighlighted({ key: "Reset", options })
    setFocus(true)
  }, [setFocus, options])

  const onHide = React.useCallback(() => {
    setFocus(false)
  }, [setFocus])

  const onSelect = React.useCallback(
    (newValue) => {
      const newSelect = getOptions(
        newValue,
        selected,
        options,
        multiple,
        keyValue
      )
      const newValues = getValues(newSelect, keyValue, multiple)
      setSelect(newSelect)
      onChange(newValues, newSelect)

      if (closeOnSelect) {
        onHide()
      }
    },
    [
      closeOnSelect,
      multiple,
      onChange,
      onHide,
      selected,
      snapshot.options,
      keyValue,
    ]
  )

  const onKeyPress = React.useCallback(
    (e) => {
      if (Platform.OS !== "web") return undefined
      const { key } = e.nativeEvent

      if (key === "Enter") {
        const selected = options[highlighted]
        if (selected) {
          onSelect(selected[keyValue])
        }
        if (closeOnSelect) {
          onHide()
        }
      }

      if (["ArrowDown", "ArrowUp"].includes(key)) {
        dispatchHighlighted({ key, options })
      }
    },
    [options, highlighted, closeOnSelect, onSelect]
  )

  const searchProps = React.useMemo(() => {
    const webProps =
      Platform.OS === "web"
        ? {
            onKeyPress,
          }
        : {}

    return {
      ...webProps,
      editable: canSearch,
      onBlur: onHide,
      onChangeText: canSearch ? (text: string) => setSearch(text) : undefined,
      disabled,
      ref,
    }
  }, [canSearch, onKeyPress, disabled, ref])

  return [snapshot, { onShow, onHide, onSelect, searchProps }, setSelect]
}

import React from "react"
import { Platform, TextInput } from "react-native"
import { getOptions, getDefaultOptions } from "../lib/getOptions"
import { getDisplayValue } from "../lib/getDisplayValue"
import { useFetch } from "./useFetch"
import { getValues } from "../lib/getValues"

const highlightReducer = function (
  highlighted: any,
  { key, options, index }: any
): any {
  const max = options.length - 1
  let newHighlighted =
    key === "Selected" && !!index
      ? index
      : key === "ArrowDown"
      ? highlighted + 1
      : highlighted - 1

  if (newHighlighted < 0) {
    newHighlighted = max
  } else if (newHighlighted > max) {
    newHighlighted = 0
  }

  const option = options[newHighlighted]

  if (option && option.disabled) {
    return highlightReducer(newHighlighted, { key, options, index })
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
  const valueRef = React.useRef(undefined)
  const [selected, setSelect]: any = React.useState(null)
  const [search, setSearch] = React.useState("")
  const [focus, setFocus] = React.useState(false)
  const [highlighted, dispatchHighlighted] = React.useReducer(
    highlightReducer,
    -1
  )

  const filterOptions = React.useCallback((options: JSONObject[]) => {
    return (text: string) => {
      if (!text.length) {
        return options
      }

      const regex = new RegExp(text, "i")
      return options.filter((o) => regex.test(o[keyLabel]))
    }
  }, [])

  const { options, fetching } = useFetch(search, defaultOptions, {
    keyLabel,
    loadOptions,
    filterOptions: canSearch ? filterOptions : null,
    debounceTime: debounce,
  })

  React.useEffect(() => {
    if (valueRef.current === value) {
      return
    }
    ;(valueRef.current as any) = value

    const selected = getDefaultOptions(value, options, multiple, keyValue)

    setSelect(selected)
  }, [value, multiple, options, keyValue])

  const snapshot = React.useMemo(() => {
    return {
      options,
      display: getDisplayValue(selected, keyLabel, multiple),
      value: getValues(selected, keyValue, multiple),
      keyValue,
      keyLabel,
      search,
      fetching,
      focus,
      highlighted,
      disabled,
    }
  }, [disabled, fetching, focus, highlighted, search, selected, options])

  const onHide = React.useCallback(() => {
    const chosen = getDefaultOptions(selected, options, multiple, keyValue)
    if (chosen) {
      dispatchHighlighted({ key: "Selected", index: chosen.index, options })
    }

    setFocus(false)
  }, [dispatchHighlighted, setFocus, options, selected, multiple, keyValue])

  const onSelect = React.useCallback(
    (newValue) => {
      const newOption = getOptions(
        newValue,
        selected,
        Array.isArray(selected) ? [...selected, ...options] : options,
        multiple,
        keyValue
      )

      setSelect(newOption)
      onChange(getValues(newOption, keyValue, multiple), newOption)
      dispatchHighlighted({ key: "Selected", index: newOption.index, options })

      if (closeOnSelect) {
        onHide()
      }
    },
    [closeOnSelect, multiple, onChange, onHide, selected, options, keyValue]
  )

  const onShow = React.useCallback(() => {
    setFocus(true)
  }, [setFocus])

  const onSelectOption = React.useCallback(
    (value) => {
      onSelect(value)
    },
    [onSelect]
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

  React.useEffect(() => {
    if (focus) {
      setTimeout(() => {
        ref.current?.focus()
      }, 100)
    }
  }, [focus])

  return [snapshot, { onShow, onHide, onSelectOption, searchProps }, setSelect]
}

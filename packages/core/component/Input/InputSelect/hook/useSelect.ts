import React from "react"
import { Platform, TextInput } from "react-native"
import { getOptions } from "../lib/getOptions"
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
  value: defaultValue = null,
  options: defaultOptions = [],
  search: canSearch = false,
  multiple = false,
  disabled = false,
  closeOnSelect = true,
  getOptions: getOptionsFn = null,
  onChange = (...args: any) => {},
  debounce = 0,
}) {
  const ref = React.useRef<TextInput>(null)
  const valueRef = React.useRef(undefined)
  const [value, setValue]: any = React.useState(null)
  const [search, setSearch] = React.useState("")
  const [focus, setFocus] = React.useState(false)
  const [highlighted, dispatchHighlighted] = React.useReducer(
    highlightReducer,
    -1
  )

  const filterOptions = React.useCallback((options: JSONObject[]) => {
    return (value: any) => {
      if (!value.length) {
        return options
      }

      const regex = new RegExp(value, "i")
      return options.filter((o) => regex.test(o[keyLabel]))
    }
  }, [])

  const { options, fetching } = useFetch(search, defaultOptions, {
    keyLabel,
    getOptions: getOptionsFn,
    filterOptions: canSearch ? filterOptions : null,
    debounceTime: debounce,
  })
  const snapshot = React.useMemo(() => {
    return {
      options,
      option: value,
      displayValue: getDisplayValue(value, keyLabel, multiple),
      value: getValues(value, keyValue),
      keyValue,
      keyLabel,
      search,
      fetching,
      focus,
      highlighted,
      disabled,
    }
  }, [disabled, fetching, focus, highlighted, search, value, options])

  const onHide = React.useCallback(() => {
    const selected = getOptions(value, null, options, multiple, keyValue)
    dispatchHighlighted({ key: "Selected", index: selected.index, options })
    setFocus(false)
  }, [dispatchHighlighted, setFocus, options, value, multiple, keyValue])

  const onSelect = React.useCallback(
    (newValue) => {
      const newOption = getOptions(
        newValue,
        value,
        Array.isArray(value) ? [...value, ...options] : options,
        multiple,
        keyValue
      )

      setValue(newOption)
      onChange(getValues(newOption, keyValue), newOption)
      dispatchHighlighted({ key: "Selected", index: newOption.index, options })

      if (closeOnSelect) {
        onHide()
      }
    },
    [closeOnSelect, multiple, onChange, onHide, value, options, keyValue]
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
    if (valueRef.current === defaultValue) {
      return
    }
    ;(valueRef.current as any) = defaultValue

    const value = getOptions(defaultValue, null, options, multiple, keyValue)

    setValue(value)
  }, [defaultValue, multiple, options])

  React.useEffect(() => {
    if (focus) {
      setTimeout(() => {
        ref.current?.focus()
      }, 100)
    }
  }, [focus])

  return [snapshot, { onShow, onHide, onSelectOption, searchProps }, setValue]
}

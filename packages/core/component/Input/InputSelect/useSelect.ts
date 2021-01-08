import React, {
  useEffect,
  useMemo,
  useState,
  useReducer,
  useRef,
  useCallback,
} from "react"
import {
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native"
import { highlightReducer } from "./highlightReducer"
import { getOptions } from "./lib/getOptions"
import { getDisplayValue } from "./lib/getDisplayValue"
import { useFetch } from "./useFetch"
import { getValues } from "./lib/getValues"

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
  const filterOptions = React.useCallback((options: JSONObject[]) => {
    return (value: any) => {
      if (!value.length) {
        return options
      }

      const regex = new RegExp(value, "i")
      return options.filter((o) => regex.test(o[keyLabel]))
    }
  }, [])

  const ref = useRef(null)
  const valueRef = useRef(undefined)
  const [value, setValue]: any = useState(null)
  const [search, setSearch] = useState("")
  const [focus, setFocus] = useState(false)
  const [highlighted, dispatchHighlighted] = useReducer(highlightReducer, -1)
  const { options, fetching } = useFetch(search, defaultOptions, {
    keyLabel,
    getOptions: getOptionsFn,
    filterOptions: canSearch ? filterOptions : null,
    debounceTime: debounce,
  })
  const snapshot = useMemo(
    () => ({
      options,
      option: value,
      displayValue: getDisplayValue(value, keyLabel),
      value: getValues(value, keyValue),
      keyValue,
      keyLabel,
      search,
      fetching,
      focus,
      highlighted,
      disabled,
    }),
    [disabled, fetching, focus, highlighted, search, value, options]
  )

  const onSelect = useCallback(
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
        ;(ref.current as any).blur()
      }
    },
    [closeOnSelect, multiple, onChange, value, options]
  )

  const onBlur = useCallback(() => {
    const selected = getOptions(value, null, options, multiple, keyValue)
    dispatchHighlighted({ key: "Selected", index: selected.index, options })
    setFocus(false)
  }, [dispatchHighlighted, setFocus, options, value, multiple])

  const onSelectOption = useCallback(
    (value) => {
      onSelect(value)
    },
    [onSelect]
  )

  const onKeyPress = useCallback(
    (e) => {
      if (Platform.OS !== "web") return undefined
      const { key } = e.nativeEvent

      if (key === "Enter") {
        const selected = options[highlighted]
        if (selected) {
          onSelect(selected[keyValue])
        }
        if (closeOnSelect) {
          ;(ref.current as any).blur()
        }
      }
      if (key === "Escape") {
        ;(ref.current as any).blur()
      }
      if (["ArrowDown", "ArrowUp"].includes(key)) {
        dispatchHighlighted({ key, options })
      }
    },
    [options, highlighted, closeOnSelect, onSelect]
  )

  const valueProps = useMemo(() => {
    const webProps =
      Platform.OS === "web"
        ? {
            onKeyPress,
          }
        : {}

    return {
      ...webProps,
      editable: canSearch,
      onFocus: () => {
        setFocus(true)
      },
      onBlur,
      onChangeText: canSearch ? (text: string) => setSearch(text) : undefined,
      disabled,
      ref,
    }
  }, [canSearch, onKeyPress, disabled, ref])

  useEffect(() => {
    if (valueRef.current === defaultValue) {
      return
    }

    ;(valueRef.current as any) = defaultValue

    setValue(getOptions(defaultValue, null, options, multiple, keyValue))
  }, [defaultValue, multiple, options])

  return [snapshot, valueProps, onSelectOption, setValue]
}

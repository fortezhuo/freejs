import React, {
  useEffect,
  useMemo,
  useState,
  useReducer,
  useRef,
  useCallback,
} from "react"
import { Platform } from "react-native"
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
      value: getValues(value),
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
      onChange(getValues(newOption), newOption)

      if (closeOnSelect) {
        ;(ref.current as any).blur()
      }
    },
    [closeOnSelect, multiple, onChange, value, options]
  )

  const onSelectOption = useCallback(
    (value) => {
      onSelect(value)
    },
    [onSelect]
  )

  const onKeyDown = useCallback(
    (e) => {
      const { key } = e

      if (["ArrowDown", "ArrowUp"].includes(key)) {
        e.preventDefault()
        dispatchHighlighted({ key, options })
      }
    },
    [options]
  )

  const onKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault()

        const selected = options[highlighted]

        if (selected) {
          onSelect(selected[keyValue])
        }

        if (closeOnSelect) {
          ;(ref.current as any).blur()
        }
      }
    },
    [options, highlighted, closeOnSelect, onSelect]
  )

  const valueProps = useMemo(() => {
    const webProps =
      Platform.OS === "web"
        ? {
            onKeyPress,
            onKeyDown,
            onKeyUp: (e: any) => {
              if (e.key === "Escape") {
                e.preventDefault()
                ;(ref.current as any).blur()
              }
            },
          }
        : {}

    return {
      ...webProps,
      editable: canSearch,
      onFocus: (e: any) => {
        setFocus(true)
      },
      onBlur: (e: any) => {
        setFocus(false)
      },
      onChangeText: canSearch ? (text: string) => setSearch(text) : undefined,
      disabled,
      ref,
    }
  }, [canSearch, onKeyPress, onKeyDown, disabled, ref])

  useEffect(() => {
    if (valueRef.current === defaultValue) {
      return
    }

    ;(valueRef.current as any) = defaultValue

    setValue(getOptions(defaultValue, null, options, multiple, keyValue))
  }, [defaultValue, multiple, options])

  return [snapshot, valueProps, onSelectOption, setValue]
}

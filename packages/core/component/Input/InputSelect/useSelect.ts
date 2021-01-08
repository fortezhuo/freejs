import {
  useEffect,
  useMemo,
  useState,
  useReducer,
  useRef,
  useCallback,
} from "react"
import { highlightReducer } from "./highlightReducer"
import { getOptions } from "./lib/getOptions"
import { getDisplayValue } from "./lib/getDisplayValue"
import { useFetch } from "./useFetch"
import { getValues } from "./lib/getValues"
import { fuzzySearch } from "./fuzzySearch"

export function useSelect({
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
  const ref = useRef(null)
  const valueRef = useRef(undefined)
  const [value, setValue]: any = useState(null)
  const [search, setSearch] = useState("")
  const [focus, setFocus] = useState(false)
  const [highlighted, dispatchHighlighted] = useReducer(highlightReducer, -1)
  const { options, fetching } = useFetch(search, defaultOptions, {
    getOptions: getOptionsFn,
    filterOptions: canSearch ? fuzzySearch : null,
    debounceTime: debounce,
  })
  const snapshot = useMemo(
    () => ({
      options,
      option: value,
      displayValue: getDisplayValue(value),
      value: getValues(value),
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
        multiple
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
          onSelect(selected.value)
        }

        if (closeOnSelect) {
          ;(ref.current as any).blur()
        }
      }
    },
    [options, highlighted, closeOnSelect, onSelect]
  )

  const valueProps = useMemo(
    () => ({
      tabIndex: "0",
      readOnly: !canSearch,
      onFocus: (e: any) => {
        setFocus(true)
      },
      onBlur: (e: any) => {
        setFocus(false)
      },
      onKeyPress,
      onKeyDown,
      onKeyUp: (e: any) => {
        if (e.key === "Escape") {
          e.preventDefault()
          ;(ref.current as any).blur()
        }
      },
      onChange: canSearch ? ({ target }: any) => setSearch(target.value) : null,
      disabled,
      ref,
    }),
    [canSearch, onKeyPress, onKeyDown, disabled, ref]
  )

  useEffect(() => {
    if (valueRef.current === defaultValue) {
      return
    }

    ;(valueRef.current as any) = defaultValue

    setValue(getOptions(defaultValue, null, options, multiple))
  }, [defaultValue, multiple, options])

  return [snapshot, valueProps, onSelectOption, setValue]
}

import React from "react"
import {
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native"

import { useState } from "../../../state/hook"

export const useSelect = (props: any) => {
  const {
    multi,
    creatable,
    clearable,
    searchable,
    value,
    placeholder = "Select ...",
    onChange,
    keyLabel,
    keyValue,
    options,
    disabled,
    style,
    isLoading,
    refSearch,
    refScroll,
    refWrapper,
  } = props

  const isMobile = true //Platform.OS !== "web"
  const [state, setState] = useState({})

  // MODAL
  const show = React.useCallback(() => {
    refWrapper.current.open()
  }, [refWrapper.current])

  const hide = React.useCallback(() => {
    refWrapper.current.hide()
  }, [refWrapper.current])

  React.useEffect(() => {
    let display = options.filter((option: any) =>
      multi
        ? (value || []).indexOf(option[keyValue]) >= 0
        : option[keyValue] === value || ""
    )
    display = multi ? display : display[0] || ""
    setState({ display })
  }, [options, isLoading])

  React.useEffect(() => {
    const { search = "", display = [] } = state
    const displayValue = multi
      ? display.map(({ [keyValue]: v }: any) => v)
      : display[keyValue] || ""

    const filterOptions = options.filter((opt: any) => {
      const regex = new RegExp(search, "i")
      return (
        regex.test(opt[keyLabel]) && displayValue.indexOf(opt[keyValue]) < 0
      )
    })
    const newOptions =
      filterOptions.length === 0 &&
      creatable &&
      displayValue.indexOf(search) < 0 &&
      search !== ""
        ? [{ [keyLabel]: search, [keyValue]: search, __creatable: true }]
        : []

    setState({ options: filterOptions.concat(newOptions) })
  }, [state.search, state.display, options])

  React.useEffect(() => {
    const { display } = state
    if (!!display) {
      const value = multi
        ? display.map(({ [keyValue]: v }: any) => v)
        : display[keyValue]
      onChange(value)
    }
  }, [state.display])

  // INPUT SEARCH
  const onChangeSearch = React.useCallback(
    (search) => {
      setState({ search, index: 0 })
    },
    [setState]
  )

  const onChangeIndex = React.useCallback(
    (i: number) => {
      const { options = [], index = 0 } = state
      if ((index <= 0 && i === -1) || (index >= options.length - 1 && i === +1))
        return
      setState({ index: index + i })
    },
    [setState, state.index, state.options, state.search]
  )

  const onEnter = React.useCallback(() => {
    const { options = [], index = 0 } = state
    const option = index < options.length ? options[index] : undefined
    if (option) {
      onSelect(option)
    }
  }, [state.index, state.options])

  const onBackSpace = React.useCallback(() => {
    if (multi) {
      setState({ display: state.display.slice(0, -1), index: 0 })
    }
  }, [state.display, setState])

  const onSelect = React.useCallback(
    (option) => {
      setState({
        display: multi ? state.display.concat(option) : option,
        index: 0,
      })
    },
    [state.display, setState]
  )

  const onKeyPress =
    Platform.OS !== "web"
      ? undefined
      : (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
          const { key } = e.nativeEvent
          if (key == "ArrowUp" || key == "ArrowDown") {
            onChangeIndex(key == "ArrowUp" ? -1 : 1)
          } else if (key == "Escape") {
            hide()
          } else if (key == "Backspace" && multi && !state.search) {
            onBackSpace()
          } else if (key == "Enter") {
            onEnter()
            hide()
          }
        }

  // DISPLAY

  const onClear = React.useCallback(() => {
    setState({ display: multi ? [] : {} })
  }, [state.display, setState])

  const onClearChip = React.useCallback(
    (option) => {
      setState({
        display: state.display.filter(
          ({ [keyValue]: value }: any) => value !== option[keyValue]
        ),
      })
    },
    [state.display, setState]
  )

  const getAnchorProps = () => {
    return {
      show,
      style,
      isLoading,
      isMobile,
      disabled,
      getDisplayProps,
    }
  }

  const getDisplayProps = () => {
    return {
      onClear,
      searchable,
      multi,
      disabled,
      keyLabel,
      display: state.display,
      onClearChip,
      placeholder,
      value,
      clearable,
    }
  }

  const getSearchProps = () => {
    return {
      hide,
      onChangeText: onChangeSearch,
      onKeyPress,
      value: state.search || "",
    }
  }

  const getContentProps = () => {
    return {
      isMobile,
      placeholder: `${
        placeholder.toLowerCase().indexOf("select") >= 0 ? "" : "Select "
      }${placeholder}`,
      onCancel: hide,
      onCommit: () => {
        hide()
      },
      getDisplayProps,
    }
  }

  const getOptionsProps = () => {
    return {
      hide,
      value,
      onSelect,
      refScroll,
      searchable,
      options: state.options,
      creatable,
      isMobile,
      keyLabel,
      keyValue,
      index: state.index || 0,
    }
  }

  return {
    isMobile,
    state,
    setState,
    refSearch,
    getAnchorProps,
    getContentProps,
    getSearchProps,
    getOptionsProps,
  }
}

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
    searchable,
    value,
    placeholder,
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

  const isMobile = false
  const [state, setState] = useState({ search: "" })

  const show = React.useCallback(() => {
    refWrapper.current.open()
  }, [refWrapper.current])

  const hide = React.useCallback(() => {
    refWrapper.current.hide()
  }, [refWrapper.current])

  React.useEffect(() => {
    if (!!state.search) {
      const display: any = []
      const { search } = state
      const filterOptions = options.filter((opt: any) => {
        const regex = new RegExp(search, "i")
        return regex.test(opt[keyLabel]) && display.indexOf(opt[keyLabel]) < 0
      })
      const newOptions =
        filterOptions.length === 0 &&
        creatable &&
        display.indexOf(search) < 0 &&
        search !== ""
          ? [{ [keyLabel]: search, [keyValue]: search, __creatable: true }]
          : []

      setState({ options: filterOptions.concat(newOptions) })
    } else {
      setState({ options })
    }
  }, [state.search])

  React.useEffect(() => {
    setState({ options })
  }, [setState, options])

  // SEARCH

  const onChangeSearch = React.useCallback(
    (search) => {
      setState({ search, index: 1 })
    },
    [setState]
  )

  const onChangeIndex = React.useCallback(
    (i: number) => {
      const { options = [], index = 0 } = state
      if ((index <= 0 && i === -1) || (index >= options.length - 1 && i === +1))
        return
      console.log(index + i)
      setState({ index: index + i })
    },
    [setState, state.index, state.options, state.search]
  )

  const onEnter = React.useCallback(async () => {
    const { options, index } = state
    const option = index < options.length ? options[index] : undefined
    //    await state.onSelect(option)
  }, [])

  const onBackSpace = React.useCallback(async () => {
    /*    
    let { value } = state
    value.pop()
    await state.onChange(value)
    */
  }, [])

  const onKeyPress =
    Platform.OS !== "web"
      ? undefined
      : (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
          const { key } = e.nativeEvent
          if (key == "ArrowUp" || key == "ArrowDown") {
            onChangeIndex(key == "ArrowUp" ? -1 : 1)
          } else if (key == "Escape") {
            hide()
          } else if (key == "Backspace" && multi && state.search == "") {
            onBackSpace()
          } else if (key == "Enter") {
            onEnter()
            hide()
          }
        }

  const getAnchorProps = React.useCallback(() => {
    return {
      show,
      style,
      isLoading,
      isMobile,
      disabled,
      getDisplayProps,
    }
  }, [style, isLoading, disabled, isMobile])

  const getDisplayProps = React.useCallback(() => {
    return {}
  }, [])

  const getSearchProps = () => {
    return {
      hide,
      onChangeText: onChangeSearch,
      onKeyPress,
      value: state.search,
    }
  }

  const getContentProps = React.useCallback(() => {
    return {
      isMobile,
      placeholder: `${
        placeholder.toLowerCase().indexOf("select") >= 0 ? "" : "Select "
      }${state.placeholder}`,
      onCancel: hide,
      onCommit: () => {
        hide()
      },
      getDisplayProps,
    }
  }, [])

  const getOptionsProps = () => {
    return {
      hide,
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
    state,
    setState,
    refSearch,
    getAnchorProps,
    getContentProps,
    getSearchProps,
    getOptionsProps,
  }
}

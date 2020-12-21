import React from "react"
import { Platform } from "react-native"

import { useMenuDropdown, useMenuDialog } from "../../Menu"
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
  const [state, setState] = useState({})

  const show = React.useCallback(() => {
    refWrapper.current.open()
  }, [refWrapper.current])

  const hide = React.useCallback(() => {
    refWrapper.current.hide()
  }, [refWrapper.current])

  // SEARCH

  const onChangeSearch = React.useCallback(
    (search) => {
      setState({ search })
    },
    [setState]
  )

  const onChangeIndex = React.useCallback((index: number) => {
    if (
      (state.index <= 0 && index === -1) ||
      (state.index >= state.options.length - 1 && index === +1)
    )
      return
    setState({ index: state.index + index })
  }, [])

  const onEnter = React.useCallback(async () => {
    const { options, index } = state
    const option = index < options.length ? options[index] : undefined
    //    await state.onSelect(option)
  }, [])

  const onBackSpace = React.useCallback(async () => {
    let { value } = state
    value.pop()
    await state.onChange(value)
  }, [])

  const getWrapperProps = () => {
    return {
      onShow: () => {
        setTimeout(() => {
          refSearch.current?.focus()
        }, 100)
      },
      allowBackDrop: !isMobile,
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
      options,
      hide,
      refScroll,
      refSearch,
      searchable,
      creatable,
      isMobile,
      keyLabel,
      index: state.index || 0,
    }
  }

  return {
    state,
    setState,
    refSearch,
    getAnchorProps,
    getWrapperProps,
    getContentProps,
    getSearchProps,
    getOptionsProps,
  }
}

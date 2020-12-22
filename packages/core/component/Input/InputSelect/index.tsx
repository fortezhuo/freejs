import React from "react"
import { useSelect } from "./hook"
import { Search } from "./Search"
import { Options } from "./Options"
import { Anchor } from "./Anchor"
import { Content } from "./Content"
import { DisplayError } from "../DisplayError"
import { MenuDropdown } from "../../Menu"
import { useController } from "react-hook-form"
import { TextInput, ScrollView } from "react-native"

export const InputSelectRaw: React.FC<any> = ({
  isLoading = false,
  disabled = false,
  searchable = true,
  creatable = false,
  clearable = false,
  placeholder = "Select ...",
  keyLabel = "label",
  keyValue = "value",
  multi = false,
  options = [],
  value,
  onChange,
  style,
}) => {
  const refWrapper = React.useRef(null)
  const refSearch = React.useRef<TextInput>(null)
  const refScroll = React.useRef<ScrollView>(null)

  const {
    getAnchorProps,
    getContentProps,
    getSearchProps,
    getOptionsProps,
  } = useSelect({
    isLoading,
    disabled,
    searchable,
    creatable,
    clearable,
    placeholder,
    multi,
    keyLabel,
    keyValue,
    options,
    value,
    onChange,
    style,
    refSearch,
    refWrapper,
    refScroll,
  })

  return (
    <MenuDropdown
      ref={refWrapper}
      isCompact={!searchable}
      onShow={() => {
        setTimeout(() => {
          refSearch.current?.focus()
        }, 100)
      }}
      anchor={<Anchor {...getAnchorProps()} />}
    >
      {(!isLoading || !disabled) && (
        <Content {...getContentProps()}>
          {searchable && <Search refSearch={refSearch} {...getSearchProps()} />}
          <Options {...getOptionsProps()} />
        </Content>
      )}
    </MenuDropdown>
  )
}

export const InputSelect: React.FC<any> = ({
  control,
  name,
  rules,
  defaultValue,
  multi = false,
  ...props
}) => {
  defaultValue = defaultValue ? defaultValue : multi ? [] : ""

  const {
    field: { ref, onChange, value, ...inputProps },
    meta: { invalid },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  })
  return (
    <>
      <InputSelectRaw {...{ onChange, value, ...props }} />
      <DisplayError error={invalid} />
    </>
  )
}

/*
 
      */

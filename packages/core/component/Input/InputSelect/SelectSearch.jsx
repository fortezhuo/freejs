import React, { forwardRef, memo } from "react"
import { useSelect } from "./useSelect"
import { View } from "react-native"
import { Options } from "./component/Options"

const SelectSearch = forwardRef(
  (
    {
      value: defaultValue,
      disabled,
      placeholder,
      multiple,
      search,
      autoFocus,
      autoComplete,
      options: defaultOptions,
      onChange,
      onFocus,
      onBlur,
      printOptions,
      closeOnSelect,
      getOptions,
      filterOptions,
      debounce,
      emptyMessage,
    },
    ref
  ) => {
    const [snapshot, valueProps, onSelectOption] = useSelect({
      options: defaultOptions,
      value:
        defaultValue === null && (placeholder || multiple) ? "" : defaultValue,
      multiple,
      disabled,
      search,
      onChange,
      onFocus,
      onBlur,
      closeOnSelect:
        closeOnSelect &&
        (!multiple || ["on-focus", "always"].includes(printOptions)),
      getOptions,
      filterOptions,
      debounce,
    })

    let shouldRenderOptions

    switch (printOptions) {
      case "never":
        shouldRenderOptions = false
        break
      case "always":
        shouldRenderOptions = true
        break
      case "on-focus":
        shouldRenderOptions = snapshot.focus
        break
      default:
        shouldRenderOptions = !disabled && (snapshot.focus || multiple)
        break
    }

    const shouldRenderValue = !multiple || placeholder || search
    const props = {
      ...valueProps,
      placeholder,
      autoFocus,
      autoComplete,
      value: snapshot.focus && search ? snapshot.search : snapshot.displayValue,
    }

    return (
      <View ref={ref}>
        {shouldRenderValue && (
          <View>
            <input {...props} />
          </View>
        )}
        {shouldRenderOptions && (
          <Options
            options={snapshot.options}
            onSelectOption={onSelectOption}
            snapshot={snapshot}
            emptyMessage={emptyMessage}
          />
        )}
      </View>
    )
  }
)

SelectSearch.defaultProps = {
  // Data
  getOptions: null,
  filterOptions: null,
  value: null,

  // Interaction
  multiple: false,
  search: true,
  disabled: false,
  printOptions: "auto",
  closeOnSelect: true,
  debounce: 0,

  // Attributes
  placeholder: null,
  id: null,
  autoFocus: false,
  autoComplete: "on",

  // Design
  className: "select-search",

  // Renderers
  renderOption: undefined,
  renderGroupHeader: undefined,
  renderValue: undefined,
  emptyMessage: null,

  // Events
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
}

export default memo(SelectSearch)

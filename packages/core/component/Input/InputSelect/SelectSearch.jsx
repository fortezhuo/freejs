import React, { forwardRef, memo } from "react"
import useSelect from "./useSelect"
import { Options } from "./Components/Options"
import useClassName from "./useClassName"
import classes from "./lib/classes"

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
      id,
      onChange,
      onFocus,
      onBlur,
      printOptions,
      closeOnSelect,
      className,
      renderValue,
      renderOption,
      renderGroupHeader,
      getOptions,
      filterOptions,
      debounce,
      emptyMessage,
    },
    ref
  ) => {
    const cls = useClassName(className)
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

    const wrapperClass = classes({
      [cls("container")]: true,
      [cls("is-disabled")]: disabled,
      [cls("is-loading")]: snapshot.fetching,
      [cls("has-focus")]: snapshot.focus,
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
      <div ref={ref} className={wrapperClass} id={id}>
        {shouldRenderValue && (
          <div className={cls("value")}>
            {renderValue && renderValue(props, snapshot, cls("input"))}
            {!renderValue && <input {...props} className={cls("input")} />}
          </div>
        )}
        {shouldRenderOptions && (
          <Options
            options={snapshot.options}
            onSelectOption={onSelectOption}
            snapshot={snapshot}
            cls={cls}
            emptyMessage={emptyMessage}
            renderOption={renderOption}
            renderGroupHeader={renderGroupHeader}
          />
        )}
      </div>
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
  search: false,
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

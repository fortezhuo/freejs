import React, { forwardRef, memo } from "react"
import { useSelect } from "./useSelect"
import { View, TextInput } from "react-native"
import { Options } from "./component/Options"

const SelectSearch = forwardRef(
  (
    {
      keyValue = "value",
      keyLabel = "name",
      value: defaultValue = null,
      disabled = false,
      placeholder = null,
      multiple = false,
      search = true,
      autoFocus = false,
      autoComplete = "on",
      options: defaultOptions,
      onChange = (...args) => {},
      printOptions,
      closeOnSelect = true,
      getOptions = null,
      debounce,
      emptyMessage = "No match found",
    },
    ref
  ) => {
    const [snapshot, valueProps, onSelectOption] = useSelect({
      keyValue,
      keyLabel,
      options: defaultOptions,
      value:
        defaultValue === null && (placeholder || multiple) ? "" : defaultValue,
      multiple,
      disabled,
      search,
      onChange,
      closeOnSelect:
        closeOnSelect &&
        (!multiple || ["on-focus", "always"].includes(printOptions)),
      getOptions,
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
            <TextInput
              {...props}
              style={{ padding: 3, backgroundColor: "white" }}
            />
          </View>
        )}
        {shouldRenderOptions && (
          <Options
            keyValue={keyValue}
            keyLabel={keyLabel}
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

export default memo(SelectSearch)

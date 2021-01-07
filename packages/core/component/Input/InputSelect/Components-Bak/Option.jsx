import React, { memo } from "react"
import classes from "../lib/classes"

const Option = ({
  optionProps,
  highlighted,
  selected,
  option,
  cls,
  renderOption,
}) => {
  const props = {
    ...optionProps,
    value: option.value,
    disabled: option.disabled,
  }
  const className = classes({
    [cls("option")]: true,
    [cls("is-selected")]: selected,
    [cls("is-highlighted")]: highlighted,
  })

  return (
    <li
      className={cls("row")}
      role="menuitem"
      data-index={option.index}
      data-value={escape(option.value)}
      key={option.value}
    >
      {renderOption &&
        renderOption(props, option, { selected, highlighted }, className)}
      {!renderOption && (
        <button type="button" className={className} {...props}>
          {option.name}
        </button>
      )}
    </li>
  )
}

Option.defaultProps = {
  renderOption: null,
}

export default memo(Option)

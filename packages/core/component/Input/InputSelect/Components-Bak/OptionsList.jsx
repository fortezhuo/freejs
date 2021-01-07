import React, { memo } from "react"
import Option from "./Option"
import isSelected from "../lib/isSelected"

const OptionsList = ({
  options,
  optionProps,
  snapshot,
  renderOption,
  renderGroupHeader,
  cls,
}) => (
  <ul className={cls("options")}>
    {options.map((o) => {
      if (o.type === "group") {
        return (
          <li role="none" className={cls("row")} key={o.groupId}>
            <div className={cls("group")}>
              <div className={cls("group-header")}>
                {renderGroupHeader ? renderGroupHeader(o.name) : o.name}
              </div>
              <ul className={cls("options")}>
                <OptionsList
                  optionProps={optionProps}
                  snapshot={snapshot}
                  options={o.items}
                  renderOption={renderOption}
                  renderGroupHeader={renderGroupHeader}
                  cls={cls}
                />
              </ul>
            </div>
          </li>
        )
      }

      return (
        <Option
          key={o.value}
          selected={isSelected(o, snapshot.option)}
          highlighted={snapshot.highlighted === o.index}
          option={o}
          optionProps={optionProps}
          cls={cls}
          renderOption={renderOption}
        />
      )
    })}
  </ul>
)

export default memo(OptionsList)

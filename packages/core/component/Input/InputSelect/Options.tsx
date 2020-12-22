import React from "react"
import { ScrollView } from "react-native"
import { tw } from "@free/tailwind"
import { MenuItem } from "../../Menu"
import { random } from "../../../util"
import _escapeRegexp from "lodash/escapeRegExp"

export const Options: React.FC<any> = (props) => {
  const {
    options,
    hide,
    refScroll,
    searchable,
    keyLabel,
    isMobile,
    index,
    onSelect,
    value,
  } = props

  return (
    <>
      {options.length != 0 && (
        <ScrollView ref={refScroll} keyboardShouldPersistTaps="handled">
          {options.map((opt: any, i: number) => (
            <MenuItem
              style={searchable ? {} : tw("p-1")}
              key={"option_" + random()}
              active={i === index}
              onPress={() => {
                onSelect(opt)
                !isMobile && hide()
              }}
            >
              {opt.__creatable ? `Create : "${opt[keyLabel]}"` : opt[keyLabel]}
            </MenuItem>
          ))}
        </ScrollView>
      )}
      {options.length == 0 && <MenuItem disabled>No option</MenuItem>}
    </>
  )
}

type Options = {
  refScroll: any
  menu: any
  state: any
}

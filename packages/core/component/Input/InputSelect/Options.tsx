import React from "react"
import { ScrollView } from "react-native"
import { tw } from "@free/tailwind"
import { MenuItem } from "../../Menu"
import { random } from "../../../util"
import _escapeRegexp from "lodash/escapeRegExp"

export const Options: React.FC<any> = (props) => {
  const {
    options,
    refSearch,
    hide,
    refScroll,
    searchable,
    keyLabel,
    creatable,
    isMobile,
    index,
  } = props

  const refOptions = React.useRef(options)

  React.useEffect(() => {
    console.log(refSearch.curent)
  }, [refSearch.current])

  /*
  refScroll={refScroll} state={state} menu={{ show, hide }}

  let { display, options, creatable, keyLabel, keyValue, search } = state
  search = _escapeRegexp(search)
  React.useEffect(() => {
    const regex = new RegExp(search, "i")
    const filterOptions = state._options.filter((opt: any) => {
      return regex.test(opt[keyLabel]) && display.indexOf(opt[keyLabel]) < 0
    })

    const newOptions =
      filterOptions.length === 0 &&
      creatable &&
      display.indexOf(search) < 0 &&
      search !== ""
        ? [{ [keyLabel]: search, [keyValue]: search, __creatable: true }]
        : []
    state.setOptions(filterOptions.concat(newOptions))
  }, [display, search])
  */

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
                //                state.onSelect(opt)
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

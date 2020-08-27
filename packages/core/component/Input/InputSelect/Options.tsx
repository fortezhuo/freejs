import React, { FC, useEffect } from "react"
import { ScrollView } from "react-native"
import { MenuItem } from "../../Menu"
import { random } from "../../../util/random"
import { observer } from "mobx-react-lite"

export const Options: FC<any> = observer(({ refScroll, menu, state }) => {
  useEffect(() => {
    state.setOptions(state._options)
  }, [])

  const onSelect = (option: any) => {
    const options = state.multi ? state.value().push(option) : option
    state.onChange(options)
  }

  return (
    <ScrollView ref={refScroll} keyboardShouldPersistTaps="handled">
      {state.options.map((opt: any, i: number) => (
        <MenuItem
          key={"option_" + random()}
          active={i === state.index}
          onPress={() => {
            onSelect(opt)
            menu.hide()
          }}
        >
          {opt.label}
        </MenuItem>
      ))}
    </ScrollView>
  )
})

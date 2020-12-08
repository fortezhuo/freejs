import React from "react"
import { Display } from "./Display"
import { Base } from "../../Base"
import { DisplayError } from "../DisplayError"
import { TouchableOpacity, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { theme } from "../../../config/theme"

export const Anchor: React.FC<Anchor> = observer(({ state, menu }) => {
  return (
    <>
      <TouchableOpacity disabled={state.disabled} onPress={menu.show}>
        <Base
          isLoading={state.isLoading}
          style={[
            s.viewInput,
            state.disabled ? s.viewDisabled : {},
            state.style,
          ]}
        >
          {!state._isMobileShow && <Display state={state} />}
        </Base>
      </TouchableOpacity>
      <DisplayError store={state._store} name={state.name} />
    </>
  )
})

const s = StyleSheet.create({
  viewInput: tw(
    `${theme.default_bg} ${theme.input_border} w-full h-10 flex-row`
  ),
  viewDisabled: tw(theme.disabled_bg),
})

type Anchor = {
  state?: any
  menu?: any
}

import React, { FC, useRef, useState, useEffect } from "react"
import { Display } from "./Display"
import { Base } from "../../Base"
import { DisplayError } from "../DisplayError"
import { TouchableOpacity, StyleSheet, TextInput, Keyboard } from "react-native"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { theme } from "../../../config/theme"

export const Anchor: FC<Anchor> = observer(({ state, menu }) => {
  const [isTap, setTap] = useState(false)
  const refInput = useRef<TextInput>(null)

  const blurToShow = () => {
    setTimeout(() => {
      refInput.current?.blur()
    }, 200)
  }

  useEffect(() => {
    if (isTap) {
      refInput.current?.focus()
      setTap(false)
    }
  }, [isTap])

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", blurToShow)
    return (): void => {
      Keyboard.removeListener("keyboardDidShow", blurToShow)
    }
  }, [])

  return (
    <>
      <TextInput ref={refInput} onBlur={menu.show} style={{ height: 1 }} />
      <TouchableOpacity disabled={state.disabled} onPress={() => setTap(true)}>
        <Base
          isLoading={state.isLoading}
          style={StyleSheet.flatten([
            styles.viewInput,
            state.disabled ? styles.viewDisabled : {},
          ])}
        >
          <Display state={state} />
        </Base>
      </TouchableOpacity>
      <DisplayError name={state.name} />
    </>
  )
})

const styles = StyleSheet.create({
  viewInput: tw(
    `${theme.default_bg} ${theme.input_border} w-full h-10 flex-row`
  ),
  viewDisabled: tw(theme.disabled_bg),
})

type Anchor = {
  state?: any
  menu?: any
}

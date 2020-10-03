import React, { FC, useRef, useEffect } from "react"
import { useMenu } from "../../Menu"
import { Search } from "./Search"
import { Options } from "./Options"
import { Anchor } from "./Anchor"
import { StyleSheet, View, TextInput, ScrollView } from "react-native"
import { observer, useLocalObservable } from "mobx-react-lite"
import { tw } from "@free/tailwind"
import { InputSelectProps } from "@free/core"
import { theme } from "../../../config/theme"

export const InputSelect: FC<InputSelectProps> = observer(
  ({
    options: _options,
    disabled: _disabled,
    onChange: _onChange,
    model = "data",
    placeholder = "Select ...",
    store,
    name,
    multi,
  }) => {
    const { Menu, show, hide } = useMenu()
    const refSearch = useRef<TextInput>(null)
    const refScroll = useRef<ScrollView>(null)

    const state = useLocalObservable(() => ({
      _options,
      model,
      placeholder,
      name,
      multi,
      search: "",
      setSearch(search: string) {
        state.search = search
      },
      index: 0,
      setIndex(index: number) {
        state.index = index
        refScroll.current?.scrollTo({ y: index * 30 })
      },
      options: [],
      setOptions(options: any) {
        state.options = options
      },
      async onChange(options: any) {
        if (model === "data") {
          store.setData({
            [name]: options
              ? multi
                ? options.map((opt: any) => opt.id)
                : options.id
              : undefined,
            [`${name}_data`]: options ? options : undefined,
          })
        } else {
          store.setTemp({
            [name]: options
              ? multi
                ? options.map((opt: any) => opt.id)
                : options.id
              : undefined,
            [`${name}_data`]: options ? options : undefined,
          })
        }

        if (_onChange) await _onChange()
      },
      get value() {
        return store[model].get(name)
      },
      get disabled() {
        return _disabled || store.isUpdating
      },
    }))

    useEffect(() => {
      state._options = _options
    }, [_options])

    return (
      <Menu
        waitKeyboard
        onShow={() => refSearch.current?.focus()}
        anchor={<Anchor state={state} menu={{ show }} />}
      >
        <View style={styles.viewMenu}>
          <Search refSearch={refSearch} state={state} menu={{ hide }} />
          <Options refScroll={refScroll} state={state} menu={{ show, hide }} />
        </View>
      </Menu>
    )
  }
)

const styles = StyleSheet.create({
  viewMenu: tw(`${theme.input_bg} ${theme.input_border}`, {
    marginTop: 1,
    paddingTop: 3,
    height: 181,
  }),
})

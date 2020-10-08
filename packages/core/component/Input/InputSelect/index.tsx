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
    creatable = false,
    options: _options,
    disabled: _disabled,
    onChange: _onChange,
    model = "data",
    placeholder = "Select ...",
    singleValue = true,
    keyValue = "value",
    keyLabel = "label",
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
      creatable,
      placeholder,
      name,
      multi,
      keyValue,
      keyLabel,
      singleValue,
      search: "",
      set(args: { [key: string]: any }) {
        Object.keys(args).forEach((key: string) => {
          ;(state as any)[key] = args[key]
        })
      },
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
      async onSelect(option: any) {
        if (option) {
          const { value, multi } = state
          const options = multi ? value.concat([option]) : option
          state.index = 0
          await state.onChange(options)
        }
      },
      async onClear(display: string) {
        const { value, keyLabel } = state
        const options = value.filter(
          (_value: any) => _value[keyLabel] !== display
        )
        await state.onChange(options)
      },
      async onChange(options: any) {
        const singleValue = state.singleValue
        const setValue = (args: any) =>
          model === "data" ? store.setData(args) : store.setTemp(args)
        if (!singleValue) {
          setValue({ [`${state.name}_data`]: options ? options : undefined })
        }
        setValue({
          [state.name]: options
            ? state.multi
              ? options.map((opt: any) => (opt ? opt[state.keyValue] : "err"))
              : options.value
            : undefined,
        })
        if (_onChange) await _onChange()
      },
      get value() {
        const { singleValue, keyValue, keyLabel, multi } = state
        let _value = store[model].get(singleValue ? name : `${name}_data`)
        _value = multi ? _value || [] : _value

        return !singleValue
          ? _value
          : multi
          ? _value.map((v: string) => ({ [keyLabel]: v, [keyValue]: v }))
          : { [keyLabel]: _value, [keyValue]: _value }
      },
      get display() {
        const { singleValue, keyLabel, multi } = state
        let _value = store[model].get(singleValue ? name : `${name}_data`)
        _value = multi ? _value || [] : _value

        return !singleValue
          ? multi
            ? _value.map((v: any) => v[keyLabel])
            : _value[keyLabel] || ""
          : _value || ""
      },
      get disabled() {
        return _disabled || store.isUpdating
      },
    }))

    useEffect(() => {
      state.set({ _options, multi })
    }, [_options, multi])

    return (
      <Menu
        waitKeyboard
        onShow={() => refSearch.current?.focus()}
        anchor={<Anchor state={state} menu={{ show }} />}
      >
        <View style={styles.viewMenu}>
          <View style={styles.viewWrapper}>
            <Search refSearch={refSearch} state={state} menu={{ hide }} />
            <Options
              refScroll={refScroll}
              state={state}
              menu={{ show, hide }}
            />
          </View>
        </View>
      </Menu>
    )
  }
)

const styles = StyleSheet.create({
  viewMenu: {
    marginTop: 1,
    height: 181,
  },
  viewWrapper: tw(`${theme.default_bg} ${theme.input_border}`, {
    paddingTop: 3,
  }),
})

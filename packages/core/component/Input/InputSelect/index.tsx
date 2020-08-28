import React, { FC, useRef } from "react"
import { useMenu } from "../../Menu"
import { Search } from "./Search"
import { Options } from "./Options"
import { Anchor } from "./Anchor"
import { StyleSheet, View, TextInput, ScrollView } from "react-native"
import { observer, useLocalStore } from "mobx-react-lite"
import { tw } from "@free/tailwind"
import { InputSelectProps } from "@free/core"

export const InputSelect: FC<InputSelectProps> = observer((props) => {
  const { Menu, show, hide } = useMenu()
  const refSearch = useRef<TextInput>(null)
  const refScroll = useRef<ScrollView>(null)
  const state = useLocalStore(
    (source) => ({
      get _options() {
        return source.options
      },
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
        const model = source.model || "data"
        if (options) {
          source.store[model].set(
            source.name,
            source.multi ? options.map((opt: any) => opt.id) : options.id
          )
          source.store[model].set(`${source.name}_data`, options)
        } else {
          source.store[model].set(source.name, undefined)
          source.store[model].set(`${source.name}_data`, undefined)
        }
        if (source.onChange) await source.onChange()
      },
      get value() {
        const model = source.model || "data"
        return source.store[model].get(source.name)
      },
      get multi() {
        return source.multi
      },
      get model() {
        return source.model || "data"
      },
      get name() {
        return source.name
      },
      get placeholder() {
        return source.placeholder || "Select ..."
      },
      get disabled() {
        return source.disabled || source.store.isUpdating
      },
    }),
    props
  )

  return (
    <Menu
      onShow={() => refSearch.current?.focus()}
      anchor={<Anchor state={state} menu={{ show }} />}
    >
      <View style={styles.rootMenu}>
        <Search refSearch={refSearch} state={state} menu={{ hide }} />
        <Options refScroll={refScroll} state={state} menu={{ show, hide }} />
      </View>
    </Menu>
  )
})

const styles = StyleSheet.create({
  rootMenu: {
    maxHeight: 181,
    ...tw("bg-white border border-t-0 border-gray-300 rounded"),
  },
})

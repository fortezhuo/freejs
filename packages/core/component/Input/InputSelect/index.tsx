import React, { FC, useRef } from "react"
import { useWrapper, useHook } from "./hook"
import { Search } from "./Search"
import { Options } from "./Options"
import { Anchor } from "./Anchor"
import { Content } from "./Content"
import { TextInput, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"
import { InputSelectProps } from "@free/core"

export const InputSelect: FC<InputSelectProps> = observer((props) => {
  const refSearch = useRef<TextInput>(null)
  const refScroll = useRef<ScrollView>(null)
  const { Wrapper, hide, show, isMobile } = useWrapper(props.store)
  const state = useHook(refScroll, isMobile, props)

  return (
    <Wrapper
      onShow={() => {
        state.onShow()
        refSearch.current?.focus()
      }}
      anchor={<Anchor state={state} menu={{ show }} />}
    >
      <Content state={state} menu={{ hide }}>
        <Search refSearch={refSearch} state={state} menu={{ hide }} />
        <Options refScroll={refScroll} state={state} menu={{ show, hide }} />
      </Content>
    </Wrapper>
  )
})

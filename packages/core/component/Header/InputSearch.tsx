import React, { FC, useState, useCallback } from "react"
import { TextInput, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import { useStore } from ".."

export const InputSearch: FC = observer((_props) => {
  const { view } = useStore()
  const [text, setText] = useState("")
  const buildSearch = useCallback(
    (text: string) => {
      text = text.replace(" ", "|")
      return text === ""
        ? undefined
        : {
            $or: view.search.map((field) => ({
              [field]: { $regex: text, $options: "i" },
            })),
          }
    },
    [view.name]
  )

  return (
    <TextInput
      value={text}
      placeholder="Search ..."
      placeholderTextColor={tw("text-gray-600").color}
      style={StyleSheet.flatten([styles.inputSearch])}
      onChangeText={setText}
      onSubmitEditing={() => {
        view.setData({ search: JSON.stringify(buildSearch(text)) })
      }}
    />
  )
})

const styles: any = StyleSheet.create({
  inputSearch: tw(
    `${theme.input_bg} ${theme.input_border} rounded-full ${theme.input_text} p-3 px-6 w-full`
  ),
})

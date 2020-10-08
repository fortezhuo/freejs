import React, { FC, useState, useCallback, useEffect } from "react"
import { TextInput, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import { useStore } from ".."

export const InputSearch: FC = observer((_props) => {
  const { view } = useStore()
  const name = view.data.get("name")
  const [text, setText] = useState("")
  const buildSearch = useCallback(
    (text: string) => {
      text = text.replace(" ", "|")
      return text === ""
        ? undefined
        : {
            $or: (view.search || []).map((field) => ({
              [field]: { $regex: text, $options: "i" },
            })),
          }
    },
    [name]
  )

  useEffect(() => {
    setText("")
  }, [view?.app?.routerLocation])

  return name !== "log" ? (
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
  ) : null
})

const styles: any = StyleSheet.create({
  inputSearch: tw(
    `${theme.default_bg} ${theme.input_border} rounded-full ${theme.default_text} p-3 px-6 w-full`
  ),
})

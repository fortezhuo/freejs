import React, { FC, useState, useCallback, useEffect } from "react"
import { TextInput, StyleSheet } from "react-native"
import { Base } from "../Base"
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
    <Base isLoading={view.isLoading} style={styles.viewInput}>
      <TextInput
        value={text}
        placeholder="Search ..."
        placeholderTextColor={tw("text-gray-600").color}
        style={styles.inputText}
        onChangeText={setText}
        onSubmitEditing={() => {
          view.setData({ search: JSON.stringify(buildSearch(text)) })
        }}
      />
    </Base>
  ) : null
})

const styles: any = StyleSheet.create({
  viewInput: tw(
    `${theme.default_bg} ${theme.input_border} w-full rounded-full h-12`
  ),
  inputText: tw(`${theme.default_text} flex-1 mx-6`),
})

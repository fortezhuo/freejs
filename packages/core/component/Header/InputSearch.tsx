import React from "react"
import { TextInput, StyleSheet } from "react-native"
import { Base } from "../Base"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { theme } from "../../config/theme"
import { useStore } from ".."

export const InputSearch: React.FC = observer((_props) => {
  const { view } = useStore()
  const [name, isFilter = false] = view.getData("name", "isFilter")
  const [text, setText] = React.useState("")
  const buildSearch = React.useCallback(
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

  React.useEffect(() => {
    setText("")
  }, [])

  return name !== "log" ? (
    <Base
      isLoading={view.isLoading}
      style={StyleSheet.flatten([
        styles.viewInput,
        isFilter ? styles.viewDisabled : {},
      ])}
    >
      <TextInput
        value={text}
        editable={!isFilter}
        placeholder="Search ..."
        placeholderTextColor={tw("text-gray-600").color}
        style={styles.inputText}
        onChangeText={setText}
        onSubmitEditing={() => {
          view.setData({
            isSearch: text !== "",
            search: JSON.stringify(buildSearch(text)),
            page: 1,
          })
        }}
      />
    </Base>
  ) : null
})

const styles: any = StyleSheet.create({
  viewInput: tw(
    `${theme.default_bg} ${theme.input_border} w-full rounded-full h-12`
  ),
  viewDisabled: tw(theme.disabled_bg),
  inputText: tw(`${theme.default_text} flex-1 mx-6`),
})

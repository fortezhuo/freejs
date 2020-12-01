import React from "react"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import dayjs from "dayjs"

export const download = async (path: string, saveAs: string) => {}
export const date = (date: any) => dayjs(date).format("DD MMM YYYY")
export const datetime = (datetime: any) =>
  dayjs(datetime).format("DD MMM YYYY HH:mm:ss")

export const Link: React.FC<any> = observer(
  ({ target, store, name, params, disabled, children }) => {
    const navigation = useNavigation()
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          try {
            store.set("isUpdating", true)
            navigation.navigate(name, params)
          } finally {
            setTimeout(() => {
              store.set("isUpdating", false)
            }, 1000)
          }
        }}
      >
        {children}
      </TouchableOpacity>
    )
  }
)

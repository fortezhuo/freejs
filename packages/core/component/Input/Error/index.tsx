import React from "react"
import { Text, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { theme } from "../../../config/theme"

interface DisplayError {
  error: any
  name?: string
}

const getErrorMessage = (error: JSONObject, name?: string) => {
  if (!error) return undefined
  if (!name) return error.message

  const names = name.split(/[,[\].]+?/).filter(Boolean)
  if (!names) return error[name].message

  return names.reduce(
    (result: any, key: string) => (!result ? result : result[key]),
    error
  ).message
}

export const InputError: React.FC<DisplayError> = ({ error, name }) => {
  const message = getErrorMessage(error, name)
  return message ? <Text style={[s.textError]}>* {message}</Text> : <></>
}

const s = StyleSheet.create({
  textError: tw(`text-xs ${theme.danger_text}`),
})

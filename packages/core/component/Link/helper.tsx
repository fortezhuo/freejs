import React from "react"
import { useNavigation } from "@react-navigation/native"
const words = /Setting|View|Profile|Form/gi

export const buildLink = (name: string, params: any) => {
  const path = name ? name.replace(words, "").toLowerCase() : ""
  return `/${path}${params ? "/" + params.id : ""}`
}

export const useLink = (...args: any) => {
  const nav = useNavigation()
  const [name, params, _nav] = args
  const navigation = _nav ?? nav

  return React.useCallback(() => {
    navigation.navigate(name, params)
  }, [navigation, name, params])
}

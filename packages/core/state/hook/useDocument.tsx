import React from "react"
import { useState } from "./common"
import { useForm } from "react-hook-form"
import {
  useRoute,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native"
import { Platform } from "react-native"
import { asyncForEach } from "../../util"
import * as req from "../../request"
import { registerForteApp } from "../../util"

export const useDocument = (name: string) => {
  const navigation = useNavigation()
  const form = useForm({ criteriaMode: "all" })
  const route = useRoute()
  const [temp, setTemp] = useState({})
  const [state, setState] = useState({})
  const id = (route?.params as any).id
  const refFunction = React.useRef({ onBeforeSave: async (data: any) => {} })
  const close = React.useCallback(() => {
    navigation.goBack()
  }, [])

  const save = React.useCallback(async (data: any) => {
    const isUpdate = id.length === 24
    const method = isUpdate ? "PATCH" : "POST"
    try {
      setState({ isLoading: true })
      await refFunction.current.onBeforeSave(data)
      await req[method](`/api/${name}${isUpdate ? `/${id}` : ""}`, data)
      return true
    } catch (err) {
    } finally {
      setState({ isLoading: false })
    }
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      const onLoad = async function () {
        try {
          form.reset()
          setState({ isLoading: true })
          if (id.length === 24) {
            const {
              data: { result },
            } = await req.POST(`/api/find/${name}/${id}`, {})
            await asyncForEach(Object.keys(result), async (key: string) => {
              form.setValue(key, result[key])
            })
          }
        } catch (err) {
        } finally {
          setState({ isLoading: false })
        }
      }
      onLoad()
    }, [])
  )

  React.useEffect(() => {
    if (Platform.OS == "web") {
      registerForteApp({ [name]: form.getValues })
    }
  }, [])

  return { ...form, refFunction, close, save, temp, setTemp, state, setState }
}

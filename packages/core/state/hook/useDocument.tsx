import React from "react"
import { useState } from "./common"
import { useForm } from "react-hook-form"
import {
  useRoute,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native"
import { asyncForEach } from "../../util"
import * as req from "../../request"

export const useDocument = (name: string) => {
  const navigation = useNavigation()
  const form = useForm({ criteriaMode: "all" })
  const route = useRoute()
  const [temp, setTemp] = useState({})
  const id = (route?.params as any).id
  const refFunction = React.useRef({ onBeforeSave: async (data: any) => {} })
  const close = React.useCallback(() => {
    navigation.goBack()
  }, [])

  const save = React.useCallback(async (data: any) => {
    console.log("masuk")
    const isUpdate = id.length === 24
    const method = isUpdate ? "PATCH" : "POST"
    try {
      setTemp({ isLoading: true })
      await refFunction.current.onBeforeSave(data)
      await req[method](`/api/${name}${isUpdate ? `/${id}` : ""}`, data)
      return true
    } catch (err) {
      //this.setError(err)
    } finally {
      setTemp({ isLoading: false })
    }
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      const onLoad = async function () {
        try {
          form.reset()
          setTemp({ isLoading: true })
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
          setTemp({ isLoading: false })
        }
      }
      onLoad()
    }, [])
  )

  return { ...form, refFunction, close, save, temp, setTemp }
}

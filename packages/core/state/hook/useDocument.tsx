import React from "react"
import { useState } from "./common"
import { useForm } from "react-hook-form"
import { useRoute, useFocusEffect } from "@react-navigation/native"
import { asyncForEach } from "../../util"
import * as req from "../../request"

export const useDocument = (name: string) => {
  const form = useForm({ criteriaMode: "all" })
  const route = useRoute()
  const [temp, setTemp] = useState({})
  const id = (route?.params as any).id

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

  return { ...form, temp, setTemp }
}

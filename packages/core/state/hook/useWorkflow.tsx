import React from "react"
import { useForm } from "./useForm"
import * as req from "../../request"

export const useWorkflow = ({ req, refFunction, document }: JSONObject) => {
  const { id } = document

  const reqProcess = React.useCallback(
    async (data: any) => {
      const isUpdate = id === 24
      const method = isUpdate ? "PATCH" : "POST"
      await req[method](`/api/${name}${isUpdate ? `/${id}` : ""}`, data)
      return true
    },
    [id]
  )

  const reqCalculate = React.useCallback(async () => {
    const data = document.getValues()
    const res = await req.POST(`/api/workflow`)
  }, [])

  const beforeProcess = React.useCallback(async (data: any) => {
    await refFunction.current.onBeforeProcess(data)
  }, [])

  const calculate = React.useCallback(async () => {
    const data = document.getValues()
    refFunction.current.onBeforeCalculate &&
      (await refFunction.current.onBeforeCalculate(data))

    refFunction.current.onAfterCalculate &&
      (await refFunction.current.onAfterCalculate(data))
  }, [])

  const afterProcess = React.useCallback(async (data: any) => {
    await refFunction.current.onAfterProcess(data)
  }, [])

  const process = React.useCallback(async (data: any) => {
    try {
      document.setState({ isLoading: true })
      await beforeProcess(data)
      if (await reqProcess(data)) {
        await afterProcess(data)
      }
    } catch (err) {
      return document.handleError(err)
    } finally {
      document.setState({ isLoading: false })
    }
  }, [])

  return { calculate, process, afterProcess }
}

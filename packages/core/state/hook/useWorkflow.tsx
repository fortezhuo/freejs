import React from "react"

export const useWorkflow = ({ req, refFunction, document }: JSONObject) => {
  const { id } = document

  const reqProcess = React.useCallback(
    async (key: string[]) => {
      const data = document.getValues()

      if (key.indexOf("play") >= 0) {
        
      }
      /*



      const isUpdate = id === 24
      const method = isUpdate ? "PATCH" : "POST"
      await req[method](`/api/${name}${isUpdate ? `/${id}` : ""}`, data)
      return true
      */
    },
    [id]
  )

  const reqCalculate = React.useCallback(async () => {
    const {
      parameter = "",
      currLevel = "",
      backLevel = "",
      docStatus = "",
      ...data
    } = document.getValues()

    const level =
      docStatus === "0" ? currLevel : docStatus === "-1" ? backLevel : "1"

    if (parameter !== "" && level === "0") {
      const {
        data: { result },
      } = await req.POST(`/api/find/workflow/`, {
        _params: {
          query: {
            parameter,
          },
          field: {
            _id: 0,
            _createdAt: 0,
            _createdBy: 0,
            _updatedBy: 0,
            _updatedAt: 0,
            _docAuthors: 0,
            _docReaders: 0,
          },
        },
      })

      document.setValue("maxApprover", result.maxApprover)
      result.workflow.forEach(({ title, field }: JSONObject, i: number) => {
        document.setData({
          [`wfTitle_${i}`]: title,
          [`wfPerson_${i}`]: data[field],
        })
      })
    } else {
    }
  }, [])

  const beforeProcess = React.useCallback(async () => {
    const data = document.getValues()
    await refFunction.current.onBeforeProcess(data)
  }, [])

  const calculate = React.useCallback(async () => {
    try {
      document.setState({ isUpdating: true })
      refFunction.current.onBeforeCalculate &&
        (await refFunction.current.onBeforeCalculate())
      await reqCalculate()
      refFunction.current.onAfterCalculate &&
        (await refFunction.current.onAfterCalculate())
    } catch (err) {
      document.handleError(err)
    } finally {
      document.setState({ isUpdating: false })
    }
  }, [])

  const afterProcess = React.useCallback(async () => {
    const data = document.getValues()
    await refFunction.current.onAfterProcess(data)
  }, [])

  const process = React.useCallback(async (key: string[]) => {
    try {
      document.setState({ isLoading: true })
      await beforeProcess()
      if (await reqProcess(key)) {
        await afterProcess()
      }
    } catch (err) {
      return document.handleError(err)
    } finally {
      document.setState({ isLoading: false })
    }
  }, [])

  return { calculate, process, afterProcess }
}

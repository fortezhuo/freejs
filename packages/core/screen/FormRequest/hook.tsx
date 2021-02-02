import React from "react"
import { useForm, useWorkflow } from "../../state/hook"

export const useDocument = () => {
  const { refFunction, req, stateProps, random, ...document } = useForm(
    "request"
  )
  const workflow = useWorkflow({
    req,
    refFunction,
    stateProps,
    document,
  })

  React.useEffect(() => {
    setTimeout(() => {
      workflow.calculate()
    }, [5000])
  }, [])

  const actions = React.useMemo(() => {
    return [
      {
        icon: "save",
        key: `action_${random()}`,
        type: "primary_1_bg",
        children: "Save",
        visible: stateProps.isEditable,
        onPress: document.handleSubmit(async (data) => {
          if (await document.save(data)) {
            document.close()
          }
        }),
      },
    ].filter((opt) => opt.visible)
  }, [stateProps.isEditable])

  return { ...document, stateProps, actions }
}

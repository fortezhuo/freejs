import React from "react"
import { useDocument } from "../../state/hook"

export const useHook = () => {
  const { refFunction, ...workflow } = useDocument("workflow")

  React.useEffect(() => {
    refFunction.current.onLoad = async function () {
      workflow.setValue("status", "Active")
      workflow.setValue("completedStatus", "Approved")
      workflow.setValue("reviseResetChild", "No")
      workflow.setValue("submitterField", "creator")
    }

    workflow.setTemp({
      status: ["Active", "Inactive"].map((v) => ({ value: v, label: v })),
      reviseResetChild: ["Yes", "No"].map((v) => ({ value: v, label: v })),
    })
  }, [])

  const actions = React.useMemo(() => {
    return [
      {
        icon: "save",
        type: "primary_1_bg",
        children: "Save",
        onPress: workflow.handleSubmit(async (data) => {
          if (await workflow.save(data)) {
            workflow.close()
          }
        }),
      },
    ]
  }, [])

  return { ...workflow, actions }
}

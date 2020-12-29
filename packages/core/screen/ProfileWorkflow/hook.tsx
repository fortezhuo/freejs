import React from "react"
import { useDocument } from "../../state/hook"

const onLoad = async function (this: any) {
  this.form.setValue("parameter", "Active")
  this.form.setValue("status", "Active")
  this.form.setValue("completedStatus", "Approved")
  this.form.setValue("reviseResetChild", "No")
  this.form.setValue("submitterField", "creator")
}

const onBeforeSave = async function (this: any, data: any) {
  console.log("this", this)
  console.log(data)
}

export const useHook = () => {
  const workflow = useDocument("workflow", { onLoad })

  React.useEffect(() => {
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

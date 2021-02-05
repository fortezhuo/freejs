import React from "react"
import { useForm } from "../../state/hook"

const submitter = {
  status: "Draft",
  stamp: "Submitted",
  title: "Submitter",
  field: "",
  back: "-",
  to: "-",
}

export const useDocument = () => {
  const { refFunction, stateProps, random, ...document } = useForm("workflow")

  React.useEffect(() => {
    refFunction.current.onLoad = async function () {
      if (document.id === "new") {
        await document.setData({
          status: "Active",
          completedStatus: "Approved",
          reviseResetChild: "No",
          maxApprover: 0,
          workflow: [submitter],
          _docAuthors: ["Admin", "DBAdmin"],
        })
      }
    }

    document.setTemp({
      status: ["Active", "Inactive"].map((v) => ({ value: v, label: v })),
      reviseResetChild: ["Yes", "No"].map((v) => ({ value: v, label: v })),
    })
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

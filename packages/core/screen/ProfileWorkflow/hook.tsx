import React from "react"
import { useDocument } from "../../state/hook"

export const useHook = () => {
  const { refFunction, ...document } = useDocument("workflow")

  React.useEffect(() => {
    refFunction.current.onLoad = async function () {
      document.setData({
        status: "Active",
        completedStatus: "Approved",
        reviseResetChild: "No",
        submitterField: "creator",
      })
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
        type: "primary_1_bg",
        children: "Save",
        onPress: document.handleSubmit(async (data) => {
          if (await document.save(data)) {
            document.close()
          }
        }),
      },
    ]
  }, [])

  return { ...document, actions }
}

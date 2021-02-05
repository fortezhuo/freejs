import React from "react"
import { useForm, useWorkflow } from "../../state/hook"
import { useWatch } from "react-hook-form"
import { getUserInformation, getApproval } from "./mock"

export const useWorkflowCalculate = ({ document }: any) => {
  const amount: number = useWatch({
    control: document.control,
    name: "amount",
    defaultValue: 0,
  })

  const parameter: any = useWatch({
    control: document.control,
    name: "parameter",
    defaultValue: "",
  })

  React.useEffect(() => {
    document.setValue(
      "parameter",
      (amount || 0) === 0 ? "" : amount > 10000000 ? "Free.S1.S2." : "Free.S1."
    )
  }, [amount])

  React.useEffect(() => {
    document.workflow.calculate()
  }, [parameter])
}

export const useDocument = () => {
  const {
    refFunction,
    req,
    stateProps,
    random,
    app,
    watch,
    ...document
  } = useForm("request")
  const workflow = useWorkflow({
    req,
    refFunction,
    stateProps,
    document,
  })

  React.useEffect(() => {
    refFunction.current.onEdit = async function () {
      if (document.id === "new") {
        const userInfo = await getUserInformation(app.data.auth.username)
        document.setData({
          ...userInfo,
          docStatus: "0",
          currLevel: "0",
          status: "Draft",
          currAuthor: [app.data.auth.username],
          _docAuthors: [app.data.auth.username, "Admin", "DBAdmin"],
        })
      }
    }
    refFunction.current.onBeforeCalculate = async function () {
      const data = document.getValues()
      const { parameter = "" } = data
      const superior_1 =
        parameter === "" ? "" : (await getApproval(data.name, "60")).name || ""
      const superior_2 =
        parameter.indexOf("S2") < 0
          ? ""
          : (await getApproval(superior_1, "70")).name || ""

      document.setData({
        superior_1,
        superior_2,
      })
    }
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

  return { ...document, workflow, stateProps, actions }
}

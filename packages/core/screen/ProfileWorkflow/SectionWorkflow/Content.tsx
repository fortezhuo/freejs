import React from "react"
import { Col, Row, Input, Label, ButtonIcon, Text } from "../../../component"
import { useFieldArray } from "react-hook-form"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { fields } from "./config"

export const Content: React.FC<{
  document: JSONObject
  stateProps: JSONObject
}> = ({ document, stateProps }) => {
  const { fields } = useFieldArray({
    control: document.control,
    name: "workflow",
  })

  const handleRemove = React.useCallback((i: number) => {
    let { workflow, maxApprover } = document.getValues()
    workflow = workflow.filter((_: any, n: number) => i !== n)
    maxApprover = maxApprover - 1 < 0 ? 0 : maxApprover - 1

    document.setData({ workflow, maxApprover })
  }, [])

  return (
    <>
      {fields.map((field: JSONObject, i: number) => (
        <Workflow
          key={field.id}
          {...{ document, handleRemove, field, stateProps, i }}
        />
      ))}
    </>
  )
}

const Workflow: React.FC<{
  document: JSONObject
  handleRemove: (i: number) => void
  stateProps: JSONObject
  field: JSONObject
  i: number
}> = React.memo(({ field, stateProps, i, handleRemove, document }) => {
  return (
    <View style={s.viewWorkflow}>
      <View style={s.viewTitle}>
        <Text style={s.textWorkflow}>{`Workflow #${i}`}</Text>
        {i !== 0 && (
          <ButtonIcon
            type="danger_bg"
            icon="trash"
            size={18}
            onPress={() => handleRemove(i)}
          />
        )}
      </View>
      <Row>
        {fields.map((o: JSONObject, j: number) => (
          <Col light md={o.width} key={"wf_" + j}>
            <Label>{o.label}</Label>
            <Input.Text
              document={document}
              name={`workflow[${i}].${o.value}`}
              rules={{ required: `${o.label} is mandatory` }}
              defaultValue={field[o.value]}
              {...stateProps}
            />
          </Col>
        ))}
      </Row>
    </View>
  )
})

const s = StyleSheet.create({
  viewContent: tw("flex-col p-6 pt-0"),
  viewButton: tw("flex-row"),
  viewTitle: tw(
    "px-3 py-1 flex-row items-center border-b border-gray-300 h-10"
  ),
  textWorkflow: tw("font-bold flex-grow"),
  viewWorkflow: tw("m-2 border rounded-lg border-gray-300"),
  textStatus: tw("text-white"),
})

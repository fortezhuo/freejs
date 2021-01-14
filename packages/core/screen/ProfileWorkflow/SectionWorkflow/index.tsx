import React from "react"
import {
  Col,
  Row,
  Input,
  Label,
  Button,
  Text,
  Section,
} from "../../../component"
import { useWatch } from "react-hook-form"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { fields } from "./config"

export const SectionWorkflow: React.FC<any> = React.memo(
  ({ document, stateProps }) => {
    const handleAdd = React.useCallback(() => {
      const maxApprover = document.getValues("maxApprover") || 0
      document.setValue("maxApprover", maxApprover + 1)
    }, [])

    return (
      <Section
        label="List Workflow"
        right={
          <Button type="primary_1_bg" style={{ width: 80 }} onPress={handleAdd}>
            Add
          </Button>
        }
      >
        <Wrapper {...{ document, stateProps }} />
      </Section>
    )
  }
)

const Wrapper: React.FC<any> = ({ document, stateProps }) => {
  const n = useWatch({
    control: document.control,
    name: "maxApprover",
    defaultValue: 0,
  })

  const handleRemove = React.useCallback((i: number) => {
    let { workflow, maxApprover } = document.getValues()
    workflow = workflow.filter((_: any, n: number) => i !== n)
    maxApprover = maxApprover - 1 < 0 ? 0 : maxApprover - 1

    document.setData({ workflow, maxApprover })
  }, [])

  return (
    <>
      {[...Array(n)].map((_: any, i: number) => (
        <BoxWorkflow
          key={"workflow_" + i}
          {...{ document, handleRemove, stateProps, i }}
        />
      ))}
    </>
  )
}

const BoxWorkflow: React.FC<any> = React.memo(
  ({ document, handleRemove, stateProps, i }) => {
    return (
      <View style={s.viewWorkflow}>
        <View style={s.viewTitle}>
          <Text style={s.textWorkflow}>{`Workflow ${i + 1}`}</Text>
          <Button
            type="danger_bg"
            icon="trash"
            onPress={() => handleRemove(i)}
          />
        </View>
        <Row>
          {fields.map((o: JSONObject, j: number) => (
            <Col light md={o.width} key={"wf_" + j}>
              <Label>{o.label}</Label>
              <Input.Text
                document={document}
                name={`workflow[${i}].${o.value}`}
                rules={{ required: `${o.label} is mandatory` }}
                {...stateProps}
              />
            </Col>
          ))}
        </Row>
      </View>
    )
  }
)

const s = StyleSheet.create({
  viewContent: tw("flex-col p-6 pt-0"),
  viewButton: tw("flex-row"),
  viewTitle: tw("px-3 py-1 flex-row items-center border-b border-gray-300"),
  textWorkflow: tw("font-bold flex-grow"),
  viewWorkflow: tw("m-2 border rounded-lg border-gray-300"),
  textStatus: tw("text-white"),
})

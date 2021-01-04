import React from "react"
import { Col, Row, Input, Label, Button, Text, Section } from "../../component"
import { useWatch } from "react-hook-form"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"

const wf = [
  { value: "status", label: "Status", width: 12 },
  { value: "field", label: "Field", width: 6 },
  { value: "stamp", label: "Stamp", width: 2 },
  { value: "title", label: "Title", width: 2 },
  { value: "back", label: "Back Level", width: 1 },
  { value: "to", label: "To Level", width: 1 },
]

export const SectionWorkflow: React.FC<any> = React.memo(
  ({ document, isLoading }) => {
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
        <Wrapper {...{ document, isLoading }} />
      </Section>
    )
  }
)

const Wrapper: React.FC<any> = ({ document, isLoading }) => {
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
          {...{ document, handleRemove, isLoading, i }}
        />
      ))}
    </>
  )
}

const BoxWorkflow: React.FC<any> = React.memo(
  ({ document, handleRemove, isLoading, i }) => {
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
          {wf.map((o: JSONObject, j: number) => (
            <Col light md={o.width} key={"wf_" + j}>
              <Label>{o.label}</Label>
              <Input.Text
                control={document.control}
                name={`workflow[${i}].${o.value}`}
                isLoading={isLoading}
                rules={{ required: `${o.label} is mandatory` }}
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
  viewTitle: tw("px-3 py-1 flex-row items-center border-b border-gray-400"),
  textWorkflow: tw("font-bold flex-grow"),
  viewWorkflow: tw("m-2 border rounded-lg border-gray-400"),
  textStatus: tw("text-white"),
})

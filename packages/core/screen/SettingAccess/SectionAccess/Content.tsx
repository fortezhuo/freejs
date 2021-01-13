import React from "react"
import { Title } from "./Title"
import { Col, Row, Input, Label } from "../../../component"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { useFieldArray } from "react-hook-form"

export const Content: React.FC<any> = React.memo(({ document, stateProps }) => {
  const { fields } = useFieldArray({
    control: document.control,
    name: "list",
  })

  return (
    <>
      {fields.map((field: JSONObject, i: number) => (
        <ACL key={field.id} {...{ document, field, stateProps, i }} />
      ))}
    </>
  )
})

export const ACL: React.FC<any> = React.memo(
  ({ document, field, stateProps, i }) => {
    return (
      <View style={s.viewWorkflow}>
        <View style={s.viewTitle}>
          <Title
            control={document.control}
            name={`list[${i}].on`}
            defaultValue={field.on}
          />
        </View>
        <Row dark>
          <Col md={2}>
            <Label>Can</Label>
          </Col>
          <Col light md={10}>
            <Input.Select
              multiple
              control={document.control}
              defaultValue={field.can}
              name={`list[${i}].can`}
              options={[
                { label: "create", value: "create" },
                { label: "read", value: "read" },
                { label: "update", value: "update" },
                { label: "delete", value: "delete" },
                { label: "all", value: "all" },
              ]}
              {...stateProps}
            />
          </Col>
        </Row>
        <Row dark>
          <Col md={2}>
            <Label>Fields</Label>
          </Col>
          <Col light md={10}>
            <Input.Text
              separator=","
              control={document.control}
              name={`list[${i}].fields`}
              defaultValue={field.fields || []}
              {...stateProps}
            />
          </Col>
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

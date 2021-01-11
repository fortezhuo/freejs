import React from "react"
import { Col, Row, Input, Label, Button, Text, Section } from "../../component"
import { View, StyleSheet, TextInput } from "react-native"
import { tw } from "@free/tailwind"
import { useController, useFieldArray } from "react-hook-form"

export const SectionTarget: React.FC<any> = React.memo(
  ({ document, ...props }) => {
    return (
      <Section label="List Access">
        <Wrapper {...{ document, ...props }} />
      </Section>
    )
  }
)

const Wrapper: React.FC<any> = ({ document, ...props }) => {
  const { fields } = useFieldArray({
    control: document.control,
    name: "list",
  })

  return (
    <>
      {fields.map((field: JSONObject, i: number) => (
        <BoxTarget key={field.id} {...{ document, field, i }} />
      ))}
    </>
  )
}

const Title: React.FC<any> = React.memo(({ control, name, defaultValue }) => {
  const {
    field: { ref, onChange: onChangeText, value },
  } = useController({
    name,
    control,
    defaultValue,
  })

  return (
    <TextInput
      {...{ value, onChangeText }}
      editable={false}
      style={{ fontSize: 18, marginVertical: 3 }}
    />
  )
})

const BoxTarget: React.FC<any> = React.memo(({ document, field, i }) => {
  console.log(field)

  return (
    <View style={s.viewWorkflow}>
      <View style={s.viewTitle}>
        <Title
          control={document.control}
          name={`list[${i}].target`}
          defaultValue={field.target}
        />
      </View>
      <Row dark>
        <Col md={2}>
          <Label>Actions</Label>
        </Col>
        <Col light md={10}>
          <Input.Select
            multiple
            placeholder="Action"
            control={document.control}
            defaultValue={field.actions}
            name={`list[${i}].actions`}
            options={[
              { label: "create", value: "create" },
              { label: "read", value: "read" },
              { label: "update", value: "update" },
              { label: "delete", value: "delete" },
              { label: "all", value: "all" },
            ]}
          />
        </Col>
      </Row>
      <Row dark>
        <Col md={2}>
          <Label>Fields</Label>
        </Col>
        <Col light md={10}>
          <Input.Text control={document.control} name={`list[${i}].fields`} />
        </Col>
      </Row>
    </View>
  )
})

const s = StyleSheet.create({
  viewContent: tw("flex-col p-6 pt-0"),
  viewButton: tw("flex-row"),
  viewTitle: tw("px-3 py-1 flex-row items-center border-b border-gray-400"),
  textWorkflow: tw("font-bold flex-grow"),
  viewWorkflow: tw("m-2 border rounded-lg border-gray-400"),
  textStatus: tw("text-white"),
})

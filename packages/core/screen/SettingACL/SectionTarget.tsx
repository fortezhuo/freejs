import React from "react"
import { Col, Row, Input, Label, Button, Text, Section } from "../../component"
import { useWatch } from "react-hook-form"
import { View, StyleSheet, TextInput } from "react-native"
import { tw } from "@free/tailwind"
import { useController } from "react-hook-form"

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
  const aTarget = useWatch({
    control: document.control,
    name: "target",
    defaultValue: [],
  })

  return (
    <>
      {aTarget.map((target: string, i: number) => (
        <BoxTarget key={"list_" + i} {...{ document, target, ...props, i }} />
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

const BoxTarget: React.FC<any> = React.memo(
  ({ document, target, i, ...props }) => {
    return (
      <View style={s.viewWorkflow}>
        <View style={s.viewTitle}>
          <Title
            control={document.control}
            name={`list[${i}].target`}
            defaultValue={target}
          />
        </View>
        <Row dark>
          <Col md={2}>
            <Label>Actions</Label>
          </Col>
          <Col light md={10}>
            <Input.Select
              control={document.control}
              name={`list[${i}].actions`}
              options={document.temp.action || []}
              {...props}
            />
          </Col>
        </Row>
        <Row dark>
          <Col md={2}>
            <Label>Fields</Label>
          </Col>
          <Col light md={10}>
            <Input.Text
              control={document.control}
              name={`list[${i}].fields`}
              {...props}
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

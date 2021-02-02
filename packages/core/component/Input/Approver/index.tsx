import React from "react"
import { StyleSheet, View } from "react-native"
import { InputDisplay } from "../Display"
import { Col } from "../../Grid"
import { Text } from "../../Text"
import { tw } from "@free/tailwind"
import { useWatch } from "react-hook-form"

interface Approver {
  document: any
  i: number
  title: string
}

export const InputApprover: React.FC<Approver> = React.memo(
  ({ document, i, title }) => {
    const stamp: string = useWatch({
      control: document.control,
      name: `stamp_${i}`,
      defaultValue: "",
    })

    const style: string =
      ["Rejected", "Sent Back"].indexOf(stamp || "") >= 0
        ? s.textRed
        : s.textGreen

    return (
      <Col sm={12} md={6} lg={4} xl={3} style={{ padding: 2 }}>
        <View style={s.viewApprover}>
          <Text style={s.textTitle}>{title}</Text>
          <View style={s.viewStatus}>
            <InputDisplay
              control={document.control}
              name={"stamp_" + i}
              style={[s.textStatus, style]}
            />
          </View>
          <InputDisplay
            control={document.control}
            name={"stampPerson_" + i}
            style={s.textPerson}
            numberOfLines={3}
          />
          <InputDisplay
            control={document.control}
            name={"stampDate_" + i}
            style={[s.textDate, style]}
          />
          <InputDisplay
            control={document.control}
            name={"sla_" + i}
            style={[s.textSla, style]}
          />
        </View>
      </Col>
    )
  }
)

const s = StyleSheet.create({
  viewApprover: tw("border border-gray-200 text-center rounded-lg"),
  textTitle: tw("bg-gray-100 p-2 font-bold"),
  viewStatus: tw("h-32 justify-center"),
  textStatus: tw("font-bold text-xl"),
  textGreen: tw("text-green-700"),
  textRed: tw("text-red-700"),
  textPerson: tw("bg-gray-100 py-1 h-12"),
  textDate: tw("py-1"),
  textSla: tw("bg-gray-100 py-1"),
})

import React from "react"
import { StyleSheet, View } from "react-native"
import { InputDisplay } from "../Display"
import { Col } from "../../Grid"
import { tw } from "@free/tailwind"
import { useWatch } from "react-hook-form"

interface Approver {
  document: any
  i: number
}

export const InputApprover: React.FC<Approver> = React.memo(
  ({ document, i }) => {
    const wfStamp: string = useWatch({
      control: document.control,
      name: `wfStamp_${i}`,
      defaultValue: "",
    })
    const isStamp = wfStamp !== ""

    const style: string =
      ["Rejected", "Sent Back"].indexOf(wfStamp || "") >= 0
        ? s.textRed
        : s.textGreen

    return (
      <Col sm={12} md={6} lg={4} xl={3} style={{ padding: 2 }}>
        <View style={s.viewApprover}>
          <InputDisplay
            control={document.control}
            style={s.textTitle}
            name={"wfTitle_" + i}
          />
          <View style={s.viewStatus}>
            <InputDisplay
              control={document.control}
              name={"wfStamp_" + i}
              style={[s.textStatus, style]}
            />
          </View>
          <InputDisplay control={document.control} name={"wfApprover_" + i} />
          <InputDisplay
            control={document.control}
            name={"wfPerson_" + i}
            style={[
              s.textApprover,
              s.textPerson,
              isStamp ? { height: 0, opacity: 0 } : {},
            ]}
            numberOfLines={3}
          />
          <InputDisplay
            control={document.control}
            name={"wfBy_" + i}
            style={[
              s.textApprover,
              s.textBy,
              isStamp ? {} : { height: 0, opacity: 0 },
            ]}
            numberOfLines={3}
          />
          <InputDisplay
            control={document.control}
            name={"wfDate_" + i}
            style={[s.textDate, style]}
          />
          <InputDisplay
            control={document.control}
            name={"wfSLA_" + i}
            style={[s.textSla, style]}
          />
        </View>
      </Col>
    )
  }
)

const s = StyleSheet.create({
  viewApprover: tw("border border-gray-200 text-center rounded-lg"),
  textTitle: tw("bg-gray-100 p-2 font-bold h-8"),
  viewStatus: tw("h-32 justify-center"),
  textStatus: tw("font-bold text-xl"),
  textGreen: tw("text-green-700"),
  textRed: tw("text-red-700"),
  textApprover: tw("bg-gray-100 py-1"),
  textPerson: tw("h-12"),
  textBy: tw("h-8"),
  textDate: tw("py-1 h-6"),
  textSla: tw("bg-gray-100 py-1 h-6"),
})

import React from "react"
import { StyleSheet, View } from "react-native"
import { Col } from "../Grid"
import { Text } from "../Text"
import { tw } from "@free/tailwind"

export const Approver: React.FC<any> = React.memo(
  ({ title, stampDate, stampPerson, stamp, sla }) => {
    return (
      <Col sm={12} md={6} lg={4} xl={3} style={{ padding: 2 }}>
        <View style={s.viewApprover}>
          <Text style={s.textTitle}>{title}</Text>
          <Text style={s.textStatus}>{stamp}</Text>
          <Text style={s.textPerson} numberOfLines={3}>
            {stampPerson}
          </Text>
          <Text style={s.textDate}>{stampDate}</Text>
          <Text style={s.textSla}>{sla}</Text>
        </View>
      </Col>
    )
  }
)

const s = StyleSheet.create({
  viewApprover: tw("border border-gray-200 text-center rounded-lg"),
  textTitle: tw("bg-gray-100 p-2 font-bold"),
  textStatus: tw("h-32 align-center"),
  textPerson: tw("bg-gray-100 py-1 h-12"),
  textDate: tw("py-1"),
  textSla: tw("bg-gray-100 py-1"),
})

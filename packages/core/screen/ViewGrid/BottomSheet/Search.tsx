import React from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { Input, Label } from "../../../component"
import { useView } from "../hook"
import { Footer } from "./Footer"

export const SimpleSearch: React.FC<{
  document: JSONObject
  refBottomSheet: any
}> = ({ document, refBottomSheet }) => {
  return (
    <>
      <View style={s.rowSearch}>
        <Label>Keyword</Label>
        <Input.Text
          document={document}
          name="fulltext"
          placeholder="Please type keyword ..."
        />
      </View>
      <Footer {...{ document, refBottomSheet, isSimple: true }} />
    </>
  )
}

export const AdvanceSearch: React.FC<{ document: JSONObject }> = ({
  document,
}) => {
  const view = useView()
  const {
    data: { config },
  } = view
  const advance = React.useMemo(() => view.configSearch.advance, [config?.name])

  return (
    <View style={s.rowSearch}>
      {advance.map((column: any, i: number) => {
        const type = column.type || "text"
        return (
          <View key={"advance_" + i}>
            <Label>{column.label}</Label>
            {(type == "text" || type === "json") && (
              <Input.Text
                document={document}
                name={column.name}
                placeholder={"Fill " + column.label}
              />
            )}
            {type.indexOf("date") >= 0 && (
              <>
                <Input.DateTime
                  document={document}
                  placeholder={"Start " + column.label}
                  name={"start_" + column.name}
                />
                <View style={{ height: 3 }} />
                <Input.DateTime
                  document={document}
                  placeholder={"End " + column.label}
                  name={"end_" + column.name}
                />
              </>
            )}
            {(type == "number" || type == "decimal") && (
              <View style={{ flexDirection: "row" }}>
                <Input.Text
                  document={document}
                  name={column.name}
                  placeholder={"Fill " + column.label}
                />
              </View>
            )}
          </View>
        )
      })}
    </View>
  )
}

const s = StyleSheet.create({
  viewHeader: tw(
    "p-3 border-b border-gray-400 bg-white flex-row rounded-t-2xl justify-between"
  ),
  viewButton: tw("mt-8 mb-2 h-20 justify-between"),
  viewStartEnd: tw("flex-row justify-between"),
  textHeader: tw("text-lg"),
  viewFooter: tw("h-6 border-gray-400 border-t"),
  viewLoader: tw("items-center content-center", { height: 245 }),
  rowSearch: tw("px-4 py-3"),
})

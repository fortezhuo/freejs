import React from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { Button } from "../../../component/Button"
import { useView } from "../hook"
import { formatDate } from "../../../util"

export const Footer: React.FC<{
  isSimple: boolean
  document: any
  refBottomSheet: any
}> = React.memo(({ isSimple, document, refBottomSheet }) => {
  const view = useView()
  const {
    data: { config },
  } = view

  const onFullTextSearch = React.useCallback(
    (data: any) => {
      let text = data.fulltext
      let search: any

      if (view.configSearch.simple[0] === "$text") {
        search = { $text: { $search: text } }
      } else {
        text = text.replace(" ", "|")
        search =
          text === ""
            ? undefined
            : {
                $or: (view.configSearch.simple || []).map((field: string) => ({
                  [field]: { $regex: text, $options: "i" },
                })),
              }
      }

      view.setData({ search })
      refBottomSheet.current.close()
    },
    [config?.name]
  )

  const onAdvanceSearch = React.useCallback(
    (data: any) => {
      let build: any = { _helper: { date: [] } }
      ;(view.configSearch.advance || []).forEach((column: any) => {
        const type = column.type || "text"

        if (type === "text" || type === "json") {
          const text = data[column.name]
          if (text) {
            build[column.name] =
              column.name === "$text"
                ? { $search: text }
                : { $regex: text.replace(" ", "|"), $options: "i" }
          }
        }

        if (type.indexOf("date") >= 0) {
          const start = data["start_" + column.name]
          const end = data["end_" + column.name]
          if (!!start && !!end) {
            build._helper.date = build._helper.date.concat([column.name])
            build[column.name] = {
              $lte: `${formatDate(end)} 23:59:59`,
              $gte: `${formatDate(start)} 00:00:00`,
            }
          }
        }
      })

      view.setData({ search: build })
      refBottomSheet.current.close()
    },
    [config?.name]
  )

  const onClearSearch = React.useCallback(() => {
    view.setData({ search: undefined })
    refBottomSheet.current.close()
  }, [])

  return (
    <View style={s.viewButton}>
      <Button
        icon="search"
        onPress={
          isSimple
            ? document.handleSubmit(onFullTextSearch)
            : document.handleSubmit(onAdvanceSearch)
        }
        type={"danger_bg"}
      >
        Search
      </Button>
      <Button icon="x" onPress={onClearSearch} type={"disabled_bg"}>
        Reset
      </Button>
    </View>
  )
})

const s = StyleSheet.create({
  viewButton: tw("mt-8 mb-4 mx-4 h-20 justify-between"),
})

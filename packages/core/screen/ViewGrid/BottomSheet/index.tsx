import React from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { Modalize } from "react-native-modalize"
import { Table, Text } from "../../../component"
import { formatDateTime, isDateString, isArray } from "../../../util"
import { useForm } from "react-hook-form"
import { SimpleSearch, AdvanceSearch } from "./Search"
import { useView } from "../hook"
import { Header } from "./Header"
import { Footer } from "./Footer"

const format = (value: any) => {
  let _value = value
  if (isArray(value))
    _value =
      typeof value[0] === "string" || typeof value[0] === "undefined"
        ? JSON.stringify(value)
        : JSON.stringify(value, null, 2)

  if (isDateString(value)) _value = formatDateTime(value)
  return _value
}

export const BottomSheet: React.FC<any> = React.memo(
  ({ content, setContent }) => {
    const [isSimple, setSimple] = React.useState(true)
    const { control, handleSubmit } = useForm()
    const { refBottomSheet } = useView()

    const renderFlatList = React.useCallback((content) => {
      const data = Object.keys(content).map((key) => ({
        key,
        value: content[key],
      }))
      return {
        data,
        stickyHeaderIndices: [0],
        renderItem: ({ item, index }: any) => {
          return (
            <Table.Row dark={index % 2 == 0}>
              <View style={{ width: 200 }}>
                <Table.CellText>{item.key}</Table.CellText>
              </View>
              <Table.CellText>{format(item.value)}</Table.CellText>
            </Table.Row>
          )
        },
        ListHeaderComponent: () => (
          <View style={s.viewHeader}>
            <Text style={s.textHeader}>Content</Text>
          </View>
        ),
        ListFooterComponent: () => <View style={s.viewFooter} />,
        keyExtractor: (item: any) => item.key,
        showsVerticalScrollIndicator: false,
      }
    }, [])

    const onClosed = React.useCallback(() => {
      if (!!content) {
        setContent(undefined)
      } else {
        setSimple(true)
      }
    }, [content])

    const props: any = {
      [content ? "flatListProps" : "children"]: content ? (
        renderFlatList(content)
      ) : isSimple ? (
        <SimpleSearch {...{ control, handleSubmit, refBottomSheet }} />
      ) : (
        <AdvanceSearch {...{ control }} />
      ),
    }

    return (
      <Modalize
        modalTopOffset={80}
        snapPoint={275}
        ref={refBottomSheet}
        HeaderComponent={
          content ? undefined : (
            <Header {...{ refBottomSheet, isSimple, setSimple }} />
          )
        }
        FooterComponent={
          content || isSimple ? undefined : (
            <Footer {...{ handleSubmit, refBottomSheet, isSimple: false }} />
          )
        }
        onClosed={onClosed}
        {...props}
      />
    )
  }
)

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

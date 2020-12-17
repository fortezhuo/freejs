import React from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { Modalize } from "react-native-modalize"
import { Table, Button, Text, Loader, Input, Label } from "../../component"
import {
  random,
  formatDateTime,
  formatDate,
  isDateString,
  isArray,
} from "../../util"
import { useView } from "./hook"

const format = (value: any) => {
  let _value = value
  if (isArray(value)) _value = value.join(",")
  if (isDateString(value)) _value = formatDateTime(value)
  return _value
}

export const BottomSheet: React.FC<{ refBind: any }> = ({ refBind }) => {
  const [isSimple, setSimple] = React.useState(true)
  const {
    data: { config },
    ...view
  } = useView()
  const { value = undefined } = view.temp

  const configSearch = React.useMemo(() => {
    const { search, keys } = config

    return {
      simple: search,
      advance: Object.keys(keys).map((val: any) => {
        const column = keys[val]
        return {
          label: column.type === "json" ? "Data" : column.label,
          name: column.type === "json" ? "$text" : column.name,
          type: column.type,
        }
      }),
    }
  }, [config.name])

  const onClosed = React.useCallback(() => {
    view.setTemp({ value: undefined })
    setSimple(true)
  }, [])

  const renderFlatList = React.useCallback((value) => {
    const data = Object.keys(value).map((key) => ({
      key,
      value: value[key],
    }))
    return {
      data,
      stickyHeaderIndices: [0],
      renderItem: ({ item, index }: any) => {
        return (
          <Table.Row dark={index % 2}>
            <View style={{ width: 100 }}>
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

  const onClearSearch = React.useCallback(() => {
    view.setData({ search: undefined })
    refBind.current.close()
  }, [])

  const onFullTextSearch = React.useCallback(() => {
    let text = view.temp.fulltextsearch
    let search: any

    if (configSearch.simple[0] === "$text") {
      search = { $text: { $search: text } }
    } else {
      text = text.replace(" ", "|")
      search =
        text === ""
          ? undefined
          : {
              $or: (configSearch.simple || []).map((field: string) => ({
                [field]: { $regex: text, $options: "i" },
              })),
            }
    }

    view.setData({ search })
    refBind.current.close()
  }, [config.name])

  const onAdvanceSearch = React.useCallback(() => {
    let build: any = { _helper: { date: [] } }
    ;(configSearch.advance || []).forEach((column: any) => {
      const type = column.type || "text"

      if (type === "text" || type === "json") {
        const text = view.temp[column.name]
        if (text) {
          build[column.name] =
            column.name === "$text"
              ? { $search: text }
              : { $regex: text.replace(" ", "|"), $options: "i" }
        }
      }

      if (type.indexOf("date") >= 0) {
        const start = view.temp["start_" + column.name]
        const end = view.temp["end_" + column.name]
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
    refBind.current.close()
  }, [config.name])

  const Header: React.FC<any> = () => {
    const onTapSimple = React.useCallback(() => {
      setSimple(true)
      refBind.current.open("default")
    }, [])

    const onTapAdvance = React.useCallback(() => {
      setSimple(false)
      refBind.current.open("top")
    }, [])

    return (
      <View style={s.viewHeader} key={"scroll_" + random()}>
        <View style={{ flex: 1 }}>
          <Button
            type={isSimple ? "danger_bg" : "disabled_bg"}
            onPress={onTapSimple}
          >
            Simple Search
          </Button>
        </View>
        <View style={{ width: 10 }} />
        <View style={{ flex: 1 }}>
          <Button
            type={!isSimple ? "danger_bg" : "disabled_bg"}
            onPress={onTapAdvance}
          >
            Advance Search
          </Button>
        </View>
      </View>
    )
  }

  const Footer: React.FC<any> = ({ onPress, onClearSearch }) => (
    <View style={s.viewButton}>
      <Button icon="search" onPress={onPress} type={"danger_bg"}>
        Search
      </Button>
      <Button icon="x" onPress={onClearSearch} type={"disabled_bg"}>
        Reset
      </Button>
    </View>
  )

  const children = view.temp.isLoading ? (
    <View style={s.viewLoader}>
      <Loader dark />
    </View>
  ) : (
    [
      isSimple && (
        <View style={s.rowSearch} key={"scroll_" + random()}>
          <Label>Keyword</Label>
          <Input.Text
            model="temp"
            name="fulltextsearch"
            placeholder="Please type keyword ..."
          />
          <Footer onPress={onFullTextSearch} onClearSearch={onClearSearch} />
        </View>
      ),
      !isSimple && (
        <View style={s.rowSearch} key={"scroll_" + random()}>
          {configSearch.advance.map((column: any) => {
            const type = column.type || "text"
            return (
              <View key={"search_" + random()}>
                <Label>{column.label}</Label>
                {(type == "text" || type === "json") && (
                  <Input.Text
                    model="temp"
                    name={column.name}
                    placeholder={"Fill " + column.label}
                  />
                )}
                {type.indexOf("date") >= 0 && (
                  <>
                    {/** 
                    <Input.DateTime
                      model="temp"
                      placeholder={"Start " + column.label}
                      name={"start_" + column.name}
                    />
                    <View style={{ height: 3 }} />
                    <Input.DateTime
                      model="temp"
                      placeholder={"End " + column.label}
                      name={"end_" + column.name}
                    />
                  */}
                  </>
                )}
                {(type == "number" || type == "decimal") && (
                  <View style={{ flexDirection: "row" }}>
                    <Input.Text
                      model="temp"
                      name={column.name}
                      placeholder={"Fill " + column.label}
                    />
                  </View>
                )}
              </View>
            )
          })}
        </View>
      ),
    ]
  )

  const props: any = {
    HeaderComponent: value ? undefined : <Header />,
    FooterComponent:
      value || isSimple ? undefined : (
        <View style={tw("mx-4")}>
          <Footer onPress={onAdvanceSearch} onClearSearch={onClearSearch} />
        </View>
      ),
    [value ? "flatListProps" : "children"]: value
      ? renderFlatList(value)
      : children,
  }

  return (
    <Modalize
      modalTopOffset={80}
      snapPoint={265}
      onClosed={onClosed}
      ref={refBind}
      {...props}
    ></Modalize>
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
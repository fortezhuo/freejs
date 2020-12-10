import React from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { Modalize } from "react-native-modalize"
import { Table, Button, Text, Loader, Input, Label } from ".."
import {
  random,
  formatDateTime,
  formatDate,
  isDateString,
  isArray,
} from "../../util"
import { useFocusEffect } from "@react-navigation/native"

const format = (value: any) => {
  let _value = value
  if (isArray(value)) _value = value.join(",")
  if (isDateString(value)) _value = formatDateTime(value)
  return _value
}

export const BottomSheet: React.FC<any> = observer(({ store, config }) => {
  const [isSimple, setSimple] = React.useState(true)
  const refBottomSheet = React.useRef<Modalize>(null)
  const value = store.temp.get("value") || undefined

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
  }, [config.search, config.keys])

  const onClosed = React.useCallback(() => {
    store.setTemp({ value: undefined })
    setSimple(true)
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (refBottomSheet.current) {
        store.bottomSheet = refBottomSheet.current
      }
      return () => {
        refBottomSheet.current?.close()
        store.bottomSheet = undefined
      }
    }, [config.keys])
  )

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
    store.setData({ search: undefined })
    store.bottomSheet.close()
  }, [])

  const onFullTextSearch = React.useCallback(() => {
    let text = store.temp.get("fulltextsearch")
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

    store.setData({ search })
    store.bottomSheet.close()
  }, [configSearch.simple])

  const onAdvanceSearch = React.useCallback(() => {
    let build: any = { _helper: { date: [] } }
    ;(configSearch.advance || []).forEach((column: any) => {
      const type = column.type || "text"

      if (type === "text" || type === "json") {
        const text = store.temp.get(column.name)
        if (text) {
          build[column.name] =
            column.name === "$text"
              ? { $search: text }
              : { $regex: text.replace(" ", "|"), $options: "i" }
        }
      }

      if (type.indexOf("date") >= 0) {
        const start = store.temp.get("start_" + column.name)
        const end = store.temp.get("end_" + column.name)
        if (!!start && !!end) {
          build._helper.date = build._helper.date.concat([column.name])
          build[column.name] = {
            $lte: `${formatDate(end)} 23:59:59`,
            $gte: `${formatDate(start)} 00:00:00`,
          }
        }
      }
    })
    store.setData({ search: build })
    store.bottomSheet.close()
  }, [configSearch.advance])

  const Header: React.FC<any> = () => {
    const onTapSimple = React.useCallback(() => {
      setSimple(true)
      refBottomSheet.current?.open("default")
    }, [])

    const onTapAdvance = React.useCallback(() => {
      setSimple(false)
      refBottomSheet.current?.open("top")
    }, [])

    return (
      <View style={s.viewHeader} key={"scroll_" + random()}>
        <View style={{ flex: 1 }}>
          <Button
            type={isSimple ? "danger_bg" : "disabled_bg"}
            store={store}
            onPress={onTapSimple}
          >
            Simple Search
          </Button>
        </View>
        <View style={{ width: 10 }} />
        <View style={{ flex: 1 }}>
          <Button
            type={!isSimple ? "danger_bg" : "disabled_bg"}
            store={store}
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
      <Button icon="search" onPress={onPress} store={store} type={"danger_bg"}>
        Search
      </Button>
      <Button
        icon="x"
        onPress={onClearSearch}
        store={store}
        type={"disabled_bg"}
      >
        Reset
      </Button>
    </View>
  )

  const children = store.isLoading ? (
    <View style={s.viewLoader}>
      <Loader dark />
    </View>
  ) : (
    [
      isSimple && (
        <View style={s.rowSearch} key={"scroll_" + random()}>
          <Label>Keyword</Label>
          <Input.Text
            store={store}
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
                    store={store}
                    model="temp"
                    name={column.name}
                    placeholder={"Fill " + column.label}
                  />
                )}
                {type.indexOf("date") >= 0 && (
                  <>
                    <Input.DateTime
                      store={store}
                      model="temp"
                      placeholder={"Start " + column.label}
                      name={"start_" + column.name}
                    />
                    <View style={{ height: 3 }} />
                    <Input.DateTime
                      store={store}
                      model="temp"
                      placeholder={"End " + column.label}
                      name={"end_" + column.name}
                    />
                  </>
                )}
                {(type == "number" || type == "decimal") && (
                  <View style={{ flexDirection: "row" }}>
                    <Input.Text
                      store={store}
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
      ref={refBottomSheet}
      {...props}
    ></Modalize>
  )
})

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

import React from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { Modalize } from "react-native-modalize"
import { Table, Button, Text, Loader, Section, Input, Label } from ".."
import { useRoute } from "@react-navigation/native"
import { random } from "../../util"

export const BottomSheet: React.FC<any> = observer(({ store, config }) => {
  const route = useRoute()
  const [isOpen, setOpen] = React.useState(true)
  const refBottomSheet = React.useRef(null)
  const value = store.temp.get("value") || undefined

  const configSearch = React.useMemo(
    () => ({
      simple: config.search,
      advance: config.columns.map((column: any) => ({
        label: column.type === "json" ? "Data" : column.label,
        name: column.type === "json" ? "$text" : column.name,
      })),
    }),
    [route.name]
  )

  const onClosed = React.useCallback(() => {
    store.setTemp({ value: undefined })
    setOpen(true)
  }, [])

  React.useEffect(() => {
    if (refBottomSheet.current) {
      store.bottomSheet = refBottomSheet.current
    }
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
            <Table.CellText>{item.value}</Table.CellText>
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

  const buildFullText = React.useCallback(
    (text: string) => {
      if (configSearch.simple[0] === "$text") {
        return { $text: { $search: text } }
      } else {
        text = text.replace(" ", "|")
        return text === ""
          ? undefined
          : {
              $or: (configSearch.simple || []).map((field: string) => ({
                [field]: { $regex: text, $options: "i" },
              })),
            }
      }
    },
    [route.name]
  )

  const onClearSearch = React.useCallback(() => {
    store.setData({ search: undefined })
    store.bottomSheet.close()
  }, [])

  const onFullTextSearch = React.useCallback(() => {
    const fulltext = store.temp.get("fulltextsearch")
    store.setData({ search: buildFullText(fulltext) })
    store.bottomSheet.close()
  }, [])

  const onAdvanceSearch = React.useCallback(() => {
    let build: any = {}
    ;(configSearch.advance || []).forEach((column: any) => {
      const text = store.temp.get(column.name)
      if (text) {
        build[column.name] =
          column.name === "$text"
            ? { $search: text }
            : { $regex: text.replace(" ", "|"), $options: "i" }
      }
    })
    store.setData({ search: build })
    store.bottomSheet.close()
  }, [route.name])

  const Children: React.FC<any> = observer(() =>
    store.isLoading ? (
      <View style={s.viewLoader}>
        <Loader dark />
      </View>
    ) : (
      <View>
        <Section label="Search" show={isOpen}>
          <View style={s.rowSearch}>
            <Label>Keyword</Label>
            <Input.Text
              store={store}
              model="temp"
              name="fulltextsearch"
              placeholder="Please type keyword ..."
            />
            <View style={s.viewButton}>
              <Button
                icon="search"
                onPress={onFullTextSearch}
                store={store}
                type={"single_button_bg"}
              >
                Search
              </Button>
              <Button
                icon="x"
                onPress={onClearSearch}
                store={store}
                type={"disabled_bg"}
              >
                Cancel
              </Button>
            </View>
          </View>
        </Section>
        <Section label="Advance Search">
          <View style={s.rowSearch}>
            {configSearch.advance.map((column: any) => {
              return (
                <View key={"search_" + random()}>
                  <Label>{column.label}</Label>
                  <Input.Text
                    store={store}
                    model="temp"
                    name={column.name}
                    placeholder={"Fill " + column.label}
                  />
                </View>
              )
            })}

            <View style={s.viewButton}>
              <Button
                icon="search"
                onPress={onAdvanceSearch}
                store={store}
                type={"single_button_bg"}
              >
                Advance Search
              </Button>
              <Button
                icon="x"
                onPress={onClearSearch}
                store={store}
                type={"disabled_bg"}
              >
                Cancel
              </Button>
            </View>
          </View>
        </Section>
      </View>
    )
  )

  const props: any = {
    [value ? "flatListProps" : "children"]: value ? (
      renderFlatList(value)
    ) : (
      <Children />
    ),
  }

  return (
    <Modalize
      modalTopOffset={80}
      snapPoint={265}
      onClosed={onClosed}
      onPositionChange={(position: string) => setOpen(position !== "top")}
      ref={refBottomSheet}
      {...props}
    ></Modalize>
  )
})

const s = StyleSheet.create({
  viewHeader: tw("p-3 border-b border-gray-400 bg-white rounded-t-2xl"),
  viewButton: tw("mt-8 mb-2 h-20 justify-between"),
  textHeader: tw("text-lg"),
  viewFooter: tw("h-6 border-gray-400 border-t"),
  viewLoader: tw("items-center content-center", { height: 245 }),
  rowSearch: tw("px-4 py-3"),
})

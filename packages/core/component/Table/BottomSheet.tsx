import React from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { Modalize } from "react-native-modalize"
import { Table, Button, Text, Loader, Section, Input, Label } from ".."
import { useRoute } from "@react-navigation/native"

export const BottomSheet: React.FC<any> = observer(({ store }) => {
  const route = useRoute()
  const [isOpen, setOpen] = React.useState(true)
  const refBottomSheet = React.useRef(null)
  const value = store.temp.get("value") || undefined

  React.useEffect(() => {
    if (refBottomSheet.current) {
      store.bottomSheet = refBottomSheet.current
    }
  }, [])
  const onClosed = React.useCallback(() => {
    store.setTemp({ value: undefined })
    setOpen(true)
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
                onPress={() => store.bottomSheet.close()}
                store={store}
                type={"single_button_bg"}
              >
                Search
              </Button>
              <Text style={s.textInfo}>* Slide up for advance search</Text>
            </View>
          </View>
        </Section>
        <Section label="Advance Search">
          <View style={s.rowSearch}>
            <Label>Collection</Label>
            <Input.Text
              store={store}
              model="temp"
              name="fulltextsearch"
              placeholder="Please type keyword ..."
            />
            <Label>Collection</Label>
            <Input.Text
              store={store}
              model="temp"
              name="fulltextsearch"
              placeholder="Please type keyword ..."
            />
            <Label>Collection</Label>
            <Input.Text
              store={store}
              model="temp"
              name="fulltextsearch"
              placeholder="Please type keyword ..."
            />
            <Label>Collection</Label>
            <Input.Text
              store={store}
              model="temp"
              name="fulltextsearch"
              placeholder="Please type keyword ..."
            />
            <Label>Collection</Label>
            <Input.Text
              store={store}
              model="temp"
              name="fulltextsearch"
              placeholder="Please type keyword ..."
            />
            <Label>Collection</Label>
            <Input.Text
              store={store}
              model="temp"
              name="fulltextsearch"
              placeholder="Please type keyword ..."
            />
            <Label>Collection</Label>
            <Input.Text
              store={store}
              model="temp"
              name="fulltextsearch"
              placeholder="Please type keyword ..."
            />
            <Label>Collection</Label>
            <Input.Text
              store={store}
              model="temp"
              name="fulltextsearch"
              placeholder="Please type keyword ..."
            />
            <Label>Collection</Label>
            <Input.Text
              store={store}
              model="temp"
              name="fulltextsearch"
              placeholder="Please type keyword ..."
            />
            <Label>Collection</Label>
            <Input.Text
              store={store}
              model="temp"
              name="fulltextsearch"
              placeholder="Please type keyword ..."
            />
            <Label>Collection</Label>
            <Input.Text
              store={store}
              model="temp"
              name="fulltextsearch"
              placeholder="Please type keyword ..."
            />
            <Label>Collection</Label>
            <Input.Text
              store={store}
              model="temp"
              name="fulltextsearch"
              placeholder="Please type keyword ..."
            />
            <Label>Deleted By</Label>
            <Input.Text
              store={store}
              model="temp"
              name="fulltextsearch"
              placeholder="Please type keyword ..."
            />
            <Label>Deleted At</Label>
            <Input.Text
              store={store}
              model="temp"
              name="fulltextsearch"
              placeholder="Please type keyword ..."
            />
            <View style={s.viewButton}>
              <Button
                icon="search"
                onPress={() => store.bottomSheet.close()}
                store={store}
                type={"single_button_bg"}
              >
                Search
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
      snapPoint={245}
      onClosed={onClosed}
      onPositionChange={(position: string) => setOpen(position !== "top")}
      ref={refBottomSheet}
      {...props}
    ></Modalize>
  )
})

const s = StyleSheet.create({
  viewHeader: tw("p-3 border-b border-gray-400 bg-white rounded-t-2xl"),
  viewButton: tw("mt-8 mb-2"),
  textHeader: tw("text-lg"),
  viewFooter: tw("h-6 border-gray-400 border-t"),
  viewLoader: tw("items-center content-center", { height: 245 }),
  rowSearch: tw("px-4 py-3"),
  textInfo: tw("text-xs mr-1 my-1 font-thin text-red-700"),
})

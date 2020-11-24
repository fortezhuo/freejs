import React from "react"
import { View, StyleSheet } from "react-native"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { Modalize } from "react-native-modalize"
import { Table, Row, Col, Button, Text } from ".."
import { useRoute } from "@react-navigation/native"

export const BottomSheet: React.FC<any> = observer(({ store }) => {
  const route = useRoute()
  const refBottomSheet = React.useRef(null)
  const value = store.temp.get("value") || undefined

  React.useEffect(() => {
    if (refBottomSheet.current) {
      store.bottomSheet = refBottomSheet.current
    }
  }, [])

  const onClosed = React.useCallback(() => {
    store.setTemp({ value: undefined })
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

  const renderChildren = React.useMemo(() => {
    return (
      <View>
        <Row>
          <Col md={2}>
            <Text>{route.name}</Text>
          </Col>
        </Row>
      </View>
    )
  }, [route.name])

  const props: any = {
    [value ? "flatListProps" : "children"]: value
      ? renderFlatList(value)
      : renderChildren,
  }
  if (!value) {
    props["FooterComponent"] = () => (
      <Button
        icon="search"
        style={{ margin: 10 }}
        onPress={() => store.bottomSheet.close()}
        store={store}
        type={"single_button_bg"}
      >
        Search
      </Button>
    )
  }

  return (
    <Modalize
      adjustToContentHeight
      onClosed={onClosed}
      ref={refBottomSheet}
      {...props}
    ></Modalize>
  )
})

const s = StyleSheet.create({
  viewHeader: tw("p-3 border-b border-gray-400 bg-white rounded-t-2xl"),
  textHeader: tw("text-lg"),
  viewFooter: tw("h-6 border-gray-400 border-t"),
})

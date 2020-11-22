import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Modalize } from "react-native-modalize"
import { Table, Row, Col, Button, Text } from ".."
import { useRoute } from "@react-navigation/native"

export const BottomSheet: React.FC<any> = observer(({ store }) => {
  const value = store.temp.get("value") || undefined
  const route = useRoute()
  const renderFlatList = React.useCallback((value) => {
    const data = Object.keys(value).map((key) => ({
      key,
      value: value[key],
    }))
    return {
      data,
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
        onPress={() => store.bottomSheet.current?.close()}
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
      onClosed={() => {
        store.temp.set("value", undefined)
      }}
      ref={store.bottomSheet}
      {...props}
    ></Modalize>
  )
})

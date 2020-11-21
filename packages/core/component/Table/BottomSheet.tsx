import React from "react"
import { Row } from "./Row"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Modalize } from "react-native-modalize"
import { CellText } from "./Cell"

export const BottomSheet: React.FC<any> = observer(({ store }) => {
  const value = store.temp.get("value") || {}
  const data = Object.keys(value).map((key) => ({
    key,
    value: value[key],
  }))
  return (
    <Modalize
      ref={store.modalData}
      adjustToContentHeight
      flatListProps={{
        data,
        renderItem: ({ item, index }: any) => {
          return (
            <Row dark={index % 2}>
              <View style={{ width: 100 }}>
                <CellText>{item.key}</CellText>
              </View>
              <CellText>{item.value}</CellText>
            </Row>
          )
        },
        keyExtractor: (item) => item.key,
        showsVerticalScrollIndicator: false,
      }}
    ></Modalize>
  )
})

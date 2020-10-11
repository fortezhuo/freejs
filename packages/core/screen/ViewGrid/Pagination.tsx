import React, { FC, useCallback } from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "../../component"
import { observer } from "mobx-react-lite"
import { random } from "../../util/random"
import { tw } from "@free/tailwind"
import { TouchableOpacity } from "react-native-gesture-handler"

export const Pagination: FC<any> = observer(({ store, gotoPage }) => {
  const page = store.data.get("page") || 1
  const pages = store.data.get("pages") || []
  const limit = store.data.get("limit")
  const total = store.data.get("total")
  const desc = `Showing ${(page - 1) * limit + 1} to ${
    page * limit < total ? page * limit : total
  } of ${total} entries`

  const setPage = useCallback((i) => {
    gotoPage(i)
    store.setData({ page: i })
  }, [])

  return (
    <View style={styles.viewPage}>
      {total ? (
        <>
          <Text>{desc}</Text>
          <View style={styles.viewPageNumbers}>
            {pages.map((i: string) => (
              <TouchableOpacity
                key={"page_" + random()}
                disabled={i === "..." || i == page}
                onPress={() => setPage(+i)}
              >
                <Text
                  style={StyleSheet.flatten([
                    styles.textPage,
                    i == page ? styles.textPageActive : {},
                  ])}
                >
                  {i}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <Text>No Data Found</Text>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  viewPage: tw("flex-row justify-between items-center p-1 shadow-sm h-10"),
  viewPageNumbers: tw(
    "flex-row rounded-sm border-l border-t border-b border-gray-300"
  ),
  textPage: tw(
    "items-center px-4 py-2 bg-white text-sm text-gray-900 border-gray-300 border-r"
  ),
  textPageActive: tw(`bg-gray-300`),
})

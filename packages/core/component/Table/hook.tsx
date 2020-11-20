import React from "react"
import { entries } from "mobx"
import { Input, Text } from ".."
import { CellText, CellDownload, CellLink, CellJSON } from "./"
import { download } from "./helper"
import dayjs from "dayjs"

const date = (date: any) => dayjs(date).format("DD MMM YYYY")
const datetime = (datetime: any) =>
  dayjs(datetime).format("DD MMM YYYY HH:mm:ss")

export const useDefaultColumn = (store: any) => {
  /*
  const onFilterSearch = React.useCallback(() => {
    const query = entries(store.temp)
      .filter((values) => values[1] !== "")
      .map((values) => ({
        [values[0]]: { $regex: values[1].replace(" ", "|"), $options: "i" },
      }))

    store.setData({
      search: query.length === 0 ? undefined : JSON.stringify({ $and: query }),
      page: 1,
    })
  }, [name])
*/

  return {
    Cell: (cell: any) => {
      switch (cell.column.type) {
        case "link":
          return (
            <CellLink
              store={store}
              link={`${store.name}/${cell.value}`}
              style={cell.column.style}
            />
          )
        case "download_log":
          return (
            <CellDownload
              style={cell.column.style}
              onPress={() => {
                download(`/api/${store.name}`, cell.value)
              }}
            />
          )
        case "date":
          return (
            <CellText style={cell.column.style}>{date(cell.value)}</CellText>
          )
        case "datetime":
          return (
            <CellText style={cell.column.style}>
              {datetime(cell.value)}
            </CellText>
          )
        case "json":
          return (
            <CellJSON store={store} style={cell.column.style}>
              {cell.value}
            </CellJSON>
          )
        default:
          return <CellText style={cell.column.style}>{cell.value}</CellText>
      }
    },
  }
}

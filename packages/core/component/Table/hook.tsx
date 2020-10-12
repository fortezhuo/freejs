import React from "react"
import { CellText, CellDownload, CellLink } from "./"
import { download } from "./helper"
import dayjs from "dayjs"

const date = (date: any) => dayjs(date).format("DD MMM YYYY")
const datetime = (datetime: any) =>
  dayjs(datetime).format("DD MMM YYYY HH:mm:ss")

export const useDefaultColumn = (store: any) => {
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
        default:
          return <CellText style={cell.column.style}>{cell.value}</CellText>
      }
    },
  }
}

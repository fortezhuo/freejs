import React from "react"
import { CellText, CellDownload, CellLink, CellJSON } from "./Cell"
import { download } from "./helper"
import { formatDate, formatDateTime } from "../../util"

export const useDefaultColumn = (store: any, isMobile: boolean, keys: any) => {
  return {
    Cell: (cell: any) => {
      const name = cell?.column?.id || undefined
      const prefix =
        isMobile &&
        name.indexOf("name_download_log") < 0 &&
        name.indexOf("_id") < 0
          ? `${keys[name].label} : `
          : ""

      switch (cell.column.type) {
        case "link":
          return (
            <CellLink
              name={store.data.get("route").replace("View", "")}
              params={{ id: cell.value }}
              style={cell.column.style}
            />
          )
        case "download_log":
          return (
            <CellDownload
              style={cell.column.style}
              onPress={() => {
                download(`/api/${store.data.get("name")}`, cell.value)
              }}
            />
          )
        case "date":
          return (
            <CellText isMobile={isMobile} style={cell.column.style}>
              {prefix + formatDate(cell.value)}
            </CellText>
          )
        case "datetime":
          return (
            <CellText isMobile={isMobile} style={cell.column.style}>
              {prefix + formatDateTime(cell.value)}
            </CellText>
          )
        case "json":
          return (
            <CellJSON store={store} style={cell.column.style}>
              {cell.value}
            </CellJSON>
          )
        default:
          return (
            <CellText isMobile={isMobile} style={cell.column.style}>
              {prefix + cell.value}
            </CellText>
          )
      }
    },
  }
}

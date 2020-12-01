import React from "react"
import { CellText, CellDownload, CellLink, CellJSON } from "./Cell"
import { download, date, datetime } from "./helper"

export const useDefaultColumn = (store: any, isMobile: boolean, keys: any) => {
  return {
    Cell: (cell: any) => {
      const name = cell?.column?.id || undefined
      const prefix = isMobile && name ? `${keys[name].label} : ` : ""

      switch (cell.column.type) {
        case "link":
          return (
            <CellLink
              store={store}
              name={store.data.get("route")}
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
              {prefix + date(cell.value)}
            </CellText>
          )
        case "datetime":
          return (
            <CellText isMobile={isMobile} style={cell.column.style}>
              {prefix + datetime(cell.value)}
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

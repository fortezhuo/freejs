import React from "react"
import { Platform } from "react-native"
import { TableGrid } from "./TableGrid"
import { Layout } from "../../component"
import { withView } from "./hook"
import { useApp } from "../../state"
import { BottomSheet } from "./BottomSheet"
import { TableAction } from "./TableAction"

const ViewGrid: React.FC = withView(() => {
  const app = useApp()
  const [content, setContent] = React.useState(undefined)
  const { height, isMobile } = app.temp

  return (
    <>
      <Layout
        transparent
        scroll={Platform.OS === "web"}
        stickyRight={<TableAction />}
      >
        <TableGrid {...{ height, isMobile, setContent }} />
      </Layout>
      <BottomSheet {...{ content, setContent }} />
    </>
  )
})

export default ViewGrid

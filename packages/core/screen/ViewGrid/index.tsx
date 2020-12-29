import React from "react"
import { Platform } from "react-native"
import { TableGrid } from "./TableGrid"
import { Layout } from "../../component"
import { withView } from "./hook"
import { BottomSheet } from "./BottomSheet"
import { TableAction } from "./TableAction"

const ViewGrid: React.FC<any> = withView(() => {
  const [content, setContent] = React.useState<Object | undefined>(undefined)

  return (
    <>
      <Layout
        transparent
        scroll={Platform.OS === "web"}
        stickyRight={<TableAction />}
      >
        <TableGrid {...{ content, setContent }} />
      </Layout>
      <BottomSheet {...{ content, setContent }} />
    </>
  )
})

export default ViewGrid

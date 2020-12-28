import React from "react"
import { ActionGroup } from "../../component"
import { useView, useActions } from "./hook"

export const TableAction = React.memo(() => {
  const { refBottomSheet, ...view } = useView()
  const { actions } = useActions(refBottomSheet)
  const { isLoading, isUpdating } = view.temp
  const isReady = !!view.data?.config?.name
  return (
    <ActionGroup.Large
      actions={actions}
      isLoading={isLoading || isUpdating || !isReady}
    />
  )
})

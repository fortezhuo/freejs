import React from "react"
import { useWorkflowCalculate } from "./hook"

export const Effect: React.FC<{
  document: JSONObject
}> = ({ document }) => {
  useWorkflowCalculate({ document })
  return <></>
}

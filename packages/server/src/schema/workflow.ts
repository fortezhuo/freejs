import { createSchema } from "./schema"

export const workflow = createSchema({
  parameter: { type: "string", empty: false },
  status: { type: "string", empty: false },
  completedStatus: { type: "string", empty: false },
  reviseResetChild: { type: "string", empty: false },
  maxApprover: { type: "number" },
  workflow: { type: "array", empty: false },
})

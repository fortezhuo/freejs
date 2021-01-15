import { createSchema } from "./schema"

export const request = createSchema({
  name: { type: "string" },
  department: { type: "string" },
  position: { type: "string" },
  amount: { type: "number" },
  parameter: { type: "string" },
})

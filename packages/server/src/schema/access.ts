import { createSchema } from "./schema"

export const access = createSchema({
  role: { type: "string", empty: false },
  inherit: { type: "array", empty: true },
  target: { type: "array", empty: false },
  list: { type: "array", empty: false },
})

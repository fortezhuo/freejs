import { createSchema } from "./schema"

export const user = createSchema({
  username: { type: "string", empty: false },
  fullname: { type: "string", empty: false },
  email: { type: "email", empty: false },
  roles: { type: "array", empty: false },
})

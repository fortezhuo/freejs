import { S, baseSchema, ajv } from "./schema"

const schema = S.object()
  .prop("username", S.string().required())
  .prop("fullname", S.string().required())
  .prop("email", S.string().format("email").required())
  .prop("roles", S.array())
  .extend(baseSchema)
  .valueOf()

const validate = ajv.compile(schema)

export const user = { schema, validate }

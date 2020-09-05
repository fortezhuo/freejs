import S from "fluent-schema"
import Ajv from "ajv"

export { S }
export const baseSchema = S.object()
  .prop("created_at", S.object())
  .prop("updated_at", S.object())
  .prop("created_by", S.string())
  .prop("updated_by", S.string())
  .prop("readers", S.array())
  .prop("authors", S.array())

export const ajv = new Ajv({ allErrors: true })

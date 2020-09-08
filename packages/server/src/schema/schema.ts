import S from "fluent-schema"
import Ajv from "ajv"

export { S }
export const baseSchema = S.object()
  .prop("_createdAt", S.object())
  .prop("_createdBy", S.string())
  .prop("_docAuthors", S.array())
  .prop("_docReaders", S.array())
  .prop("_updatedAt", S.object())
  .prop("_updatedBy", S.string())

export const ajv = new Ajv({ allErrors: true })

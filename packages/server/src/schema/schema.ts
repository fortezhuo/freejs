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

export const normalize = (errors: any) => {
  return errors.reduce((acc: any, e: any) => {
    if (e.dataPath.length && e.dataPath[0] === ".") {
      acc[e.dataPath.slice(1)] = e.message.toUpperCase()[0] + e.message.slice(1)
    } else if (e.dataPath === "") {
      acc[e.params.missingProperty] =
        e.message.toUpperCase()[0] + e.message.slice(1).replace(/'/g, '"')
    } else {
      acc[e.dataPath] = e.message.toUpperCase()[0] + e.message.slice(1)
    }
    return acc
  }, {})
}

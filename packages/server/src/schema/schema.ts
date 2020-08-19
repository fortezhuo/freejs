import S from "fluent-schema"
import Ajv from "ajv"

export { S }
export const baseSchema = S.object()
  .prop("created_at", S.string().format("time").required())
  .prop("updated_at", S.string().format("time").required())
  .prop("created_by", S.object().required())
  .prop("updated_by", S.object().required())

export const ajv = new Ajv({ allErrors: true })

export class ValidateError extends Error {
  protected error: any
  constructor(message: string, stack: any) {
    super(message)
    this.error = stack
  }
}

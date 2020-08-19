import S from "fluent-schema"
import Ajv from "ajv"

export { S }
export const baseSchema = S.object()
  .prop("created_at", S.object().required())
  .prop("updated_at", S.object().required())
  .prop("created_by", S.string().required())
  .prop("updated_by", S.string().required())

export const ajv = new Ajv({ allErrors: true })

export class ValidateError extends Error {
  protected error: any
  constructor(message: string, stack: any) {
    super(message)
    this.error = stack
  }
}

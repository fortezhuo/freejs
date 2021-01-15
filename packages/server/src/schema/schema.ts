import Validator from "fastest-validator"

const validator = new Validator()

export const createSchema = (schema: JSONObject) => ({
  ...schema,
  _createdAt: { type: "date", optional: true },
  _createdBy: { type: "string", optional: true },
  _docAuthors: { type: "array", optional: true },
  _docReaders: { type: "array", optional: true },
  _updatedAt: { type: "date", optional: true },
  _updatedBy: { type: "string", optional: true },
})

export const validate = (target: JSONObject, schema: JSONObject) =>
  validator.validate(target, schema)

export const normalize = (errors: any) =>
  errors.reduce((acc: any, e: any) => {
    acc[e.field] = e.message
    return acc
  }, {})

/*
import Joi from "joi"

export { Joi }
export const createSchema = (schema: any) => {
  return Joi.object({
    ...schema,
    _createdAt: Joi.date().iso(),
    _createdBy: Joi.string(),
    _docAuthors: Joi.array(),
    _docReaders: Joi.array(),
    _updatedAt: Joi.date().iso(),
    _updatedBy: Joi.string(),
  })
}

export const normalize = (errors: any) =>
  errors.details.reduce((acc: any, e: any) => {
    acc[e.path[0]] = e.message
    return acc
  }, {})
*/

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

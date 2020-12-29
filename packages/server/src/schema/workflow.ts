import { Joi, createSchema } from "./schema"

export const workflow = createSchema({
  parameter: Joi.string().required(),
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  roles: Joi.array().required(),
})

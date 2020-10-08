import { Joi, createSchema } from "./schema"

export const user = createSchema({
  username: Joi.string().required(),
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  roles: Joi.array(),
})

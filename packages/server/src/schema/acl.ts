import { Joi, createSchema } from "./schema"

export const acl = createSchema({
  role: Joi.string().required(),
  inherit: Joi.array(),
  target: Joi.array().required(),
  list: Joi.array(),
})

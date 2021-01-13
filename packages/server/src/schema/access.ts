import { Joi, createSchema } from "./schema"

export const access = createSchema({
  role: Joi.string().required(),
  inherit: Joi.array(),
  target: Joi.array().required(),
  list: Joi.array(),
})

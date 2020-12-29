import { Joi, createSchema } from "./schema"

export const workflow = createSchema({
  parameter: Joi.string().required(),
  status: Joi.string().required(),
  completedStatus: Joi.string().required(),
  reviseResetChild: Joi.string().required(),
  submitterField: Joi.string().required(),
  workflow: Joi.array(),
})

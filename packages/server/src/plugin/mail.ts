import fp from "fastify-plugin"
import nodemailer from "nodemailer"
import { configMail } from "@free/env"
import { FastifyInstance } from "fastify"

const { createTransport } = nodemailer

export const mail = fp(
  async (instance: FastifyInstance, opts: any, next: any) => {
    let transporter: any = null
    try {
      transporter = createTransport(configMail)
      instance.log.info(
        `Mail service connected at ${configMail.host}:${configMail.port}`
      )
    } catch (err) {
      return err
    }
    instance.decorateRequest("mail", null)
    instance.addHook("onRequest", (req: any, reply, next) => {
      req.mail = transporter
      next()
    })

    instance.addHook("onClose", (instance: any, done) => {
      instance.mail.close(done)
    })
    return
  }
)

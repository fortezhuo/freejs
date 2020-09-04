import { FastifyInstance } from "fastify"
import { Request } from "@free/server"

export const mailController = async (instance: FastifyInstance) => {
  instance.get("/mail", (req: Request, reply) => {
    const a = req.mail.sendMail({
      from: "Raps Foo 👻", // sender address
      to: "rap.sherlock@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world ?", // plain text body
      html: "<b>Hello world ?</b>", // html body
    })
    reply.send("message sent")
  })
}

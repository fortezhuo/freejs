import nodemailer from "nodemailer"
import { configMail } from "@free/env"
import { mailProp } from "@free/mail"

export const mailer = async (mail: mailProp) => {
  try {
    /*
    if (process.env.NODE_ENV === "development") {
      const testAccount = await nodemailer.createTestAccount()
      configMail.port = 587
      configMail.host = "smtp.ethereal.email"
      configMail.auth = {
        user: testAccount.user,
        pass: testAccount.pass,
      }
    }
    */

    console.log(configMail)

    const transporter = nodemailer.createTransport(configMail)

    mail.from = `${mail.from} <${configMail.auth.user}>`
    mail.to = mail.to.constructor === Array ? mail.to.toString() : mail.to

    if (!mail.to) throw new Error("mail recepient is required")
    /**
      {
        from: "Raps Foo 👻", // sender alias
        to: "rap.sherlock@gmail.com", // list of receivers separated with comma
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      }
    */
    let info = await transporter.sendMail(mail)
    console.log("Mail sent: %s", info.messageId)

    // Preview only available when sending through an Ethereal account
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    if (process.env.NODE_ENV === "development")
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
  } catch (error) {
    console.log(error)
  }
}

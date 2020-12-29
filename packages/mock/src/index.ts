import { configLDAP as aConfigLDAP, configMail } from "@free/env"
import { database } from "./database"
import { SMTPServer } from "smtp-server"
import * as ldap from "ldapjs"

// LDAP
const ldapServer: ldap.Server = ldap.createServer()
const userCredential: string = "123"
const configLDAP = aConfigLDAP[0]
const userDN: string = `cn=admin,${configLDAP.base}`
const infoServer: string = `
==============================================================
Forte Mock Server started    ** TESTING PURPOSE **
-------------------------------------------------------------- 
LDAP
  URL      : ${configLDAP.host}
  User     : ${userDN}
  Password : ${userCredential}
  BaseDN   : ${configLDAP.base}       
SMTP
  Host     : ${configMail.host}
  Port     : ${configMail.port}    
==============================================================`

const info = (): void => {
  console.log("\x1b[31m%s\x1b", infoServer)
}

const smtpServer = new SMTPServer({
  banner: undefined,
  secure: false,
  logger: true,
  disabledCommands: ["STARTTLS"],
  onAuth(auth, session, callback) {
    let username = configMail.auth.user
    let password = configMail.auth.pass
    if (auth.username === username && auth.password === password) {
      return callback(null, {
        user: "userdata",
      })
    }

    return callback(new Error("ERORORROROROROROR Authentication failed"))
  },
  onData(stream, session, callback) {
    stream.pipe(process.stdout)
    stream.on("end", callback)
  },
})

smtpServer.on("error", (err) => {
  console.log("Error occurred")
  console.log(err)
})

ldapServer.bind(userDN, function (req: any, res: any, next: any) {
  if (req.credentials !== userCredential) {
    return next(new ldap.InvalidCredentialsError("Invalid Username / Password"))
  }

  res.end()
  return next()
})

ldapServer.search(configLDAP.base, function (req: any, res: any) {
  const fetchUser = database.filter((obj) => req.filter.matches(obj.attributes))
  res.send(fetchUser.length != 0 ? fetchUser[0] : null)
  res.end()
})

ldapServer.listen(389, info)
smtpServer.listen(configMail.port, configMail.host)

import { configLDAP } from "@free/config"
import { database } from "./database"
import * as ldap from "ldapjs"

const server: ldap.Server = ldap.createServer()
const userCredential: string = "123"
const userDN: string = `cn=admin,${configLDAP.base}`
const infoServer: string = `
==============================================================
Forte LDAP Mock Server started    ** TESTING PURPOSE **
-------------------------------------------------------------- 
URL      : ${configLDAP.host}
User     : ${userDN}
Password : ${userCredential}
BaseDN   : ${configLDAP.base}       
==============================================================`

const info = (): void => {
  console.log("\x1b[31m%s\x1b[0m", infoServer)
}

server.bind(userDN, function (req: Any, res: Any, next: Any) {
  if (req.credentials !== userCredential) {
    return next(new ldap.InvalidCredentialsError("Invalid Username / Password"))
  }

  res.end()
  return next()
})

server.search(configLDAP.base, function (req: Any, res: Any) {
  const fetchUser = database.filter((obj) => req.filter.matches(obj.attributes))
  res.send(fetchUser.length != 0 ? fetchUser[0] : null)
  res.end()
})

server.listen(389, info)

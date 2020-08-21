import LDAP from "simple-ldap-search"
import { configLDAP } from "@free/env"
import { Exception, handleError } from "../util"
import { Request, Reply } from "@free/server"

export const login = () => async (req: Request, reply: Reply) => {
  try {
    reply.statusCode = 200
    const data = await authenticate(req)
    req.session.logged = data
    reply.send({
      success: true,
      result: data,
    })
  } catch (err) {
    handleError(reply, err)
  }
}

const authenticate = async (req: Request) => {
  let data = null
  const collection = req.database.app.get("user")
  const { username, password, domain } = req.body as {
    [key: string]: string | undefined
  }
  if (!username || !password || !domain)
    throw new Exception(401, "Invalid Username / Password")

  const auth = await ldapAuth(username, password, domain)

  const total = await collection.count(
    {},
    {
      projection: { id: 1 },
      estimate: true,
    }
  )

  if (total === 0) {
    const values = {
      username: auth.user.sAMAccountName,
      fullname: auth.user.displayName,
      email: auth.user.mail,
      role: ["Admin"],
      created_by: auth.user.sAMAccountName,
      updated_by: auth.user.sAMAccountName,
      created_at: new Date(),
      updated_at: new Date(),
    }
    const {
      _id,
      created_at,
      updated_at,
      created_by,
      updated_by,
      ...fetch
    } = await collection.insert(values)
    data = fetch
  } else {
    const fetch = await collection.findOne(
      { username },
      {
        projection: {
          _id: 0,
          created_at: 0,
          updated_at: 0,
          created_by: 0,
          updated_by: 0,
        },
      }
    )
    data = fetch
  }
  return data
}

const ldapAuth = async (username: string, password: string, domain: string) => {
  const config = configLDAP.filter((ldap: any) => ldap.domain == domain)[0]
  const dn = config.username || username
  const ldap = new (LDAP as any)({
    url: config.host,
    base: config.base,
    dn: dn,
    password: password,
  })
  const filter = `(${config.filterKey}=${username})`
  const attributes = ["mail", "cn", "displayName", config.filterKey]
  const users = await ldap.search(filter, attributes)
  ldap.destroy()
  if (users.length != 0) {
    return {
      user: users[0],
      dn,
      config,
    }
  } else {
    throw new Exception(401, "Invalid User Name / Password")
  }
}

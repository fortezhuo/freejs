import LDAP from "simple-ldap-search"
import { configLDAP } from "@free/env"
import { Exception } from "../../util/exception"
import { Request, Reply } from "@free/server"
import { BaseService } from "../base"
import { acl } from "../../util/acl"

export const login = function (this: BaseService) {
  return async (req: Request, reply: Reply) => {
    try {
      reply.statusCode = 200
      const data = await authenticate(req)
      const list = (data?.roles || []).concat([data.username, "*"])
      req.session.auth = {
        ...data,
        can: can(data?.roles, { list }),
      }
      reply.send({
        success: true,
        result: data,
      })
    } catch (err) {
      this.onErrorHandler(req, reply, err)
    }
  }
}

const can = (roles: any, context: any) =>
  function (action: string, resource: string) {
    return !roles
      ? { granted: false }
      : acl.can(roles).context(context).execute(action).sync().on(resource)
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

  if (!auth) throw new Exception(401, "Invalid Username / Password")

  const total = await collection.count(
    {},
    {
      projection: { id: 1 },
      estimate: true,
    }
  )

  if (total === 0) {
    const values = {
      _createdAt: new Date(),
      _createdBy: auth.user.sAMAccountName,
      _docAuthors: ["Admin"],
      _docReaders: ["*"],
      _updatedAt: new Date(),
      _updatedBy: auth.user.sAMAccountName,
      username: auth.user.sAMAccountName,
      fullname: auth.user.displayName,
      email: auth.user.mail,
      roles: ["Admin"],
    }
    const {
      _id,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
      ...fetch
    } = await collection.insert(values)
    data = fetch
  } else {
    const fetch = await collection.findOne({ username }, {})
    if (!fetch)
      throw new Exception(
        403,
        "Unregistered account detected, please contact Administrator"
      )
    data = fetch
  }
  return data
}

const ldapAuth = async (username: string, password: string, domain: string) => {
  let ldap = null
  try {
    const config = configLDAP.filter((ldap: any) => ldap.domain == domain)[0]
    const dn = config.username || username
    ldap = new (LDAP as any)({
      url: config.host,
      base: config.base,
      dn: dn,
      password: password,
    })
    const filter = `(${config.filterKey}=${username})`
    const attributes = ["mail", "cn", "displayName", config.filterKey]
    const users = await ldap.search(filter, attributes)
    if (users.length == 0)
      throw new Exception(401, "Invalid User Name / Password")
    return {
      user: users[0],
      dn,
      config,
    }
  } catch (err) {
    const code = err.message.indexOf("ECONNREFUSED") >= 0 ? 500 : 401
    throw new Exception(code, err.message)
  } finally {
    ldap.destroy()
  }
}

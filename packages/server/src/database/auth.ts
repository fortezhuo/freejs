import LDAP from "simple-ldap-search"
import { configLDAP } from "@free/env"
import { Exception } from "./exception"
import { ReplyJSON, Request, Reply } from "@free/server"

export const login = () => async (req: Request, reply: Reply) => {
  reply.statusCode = 200
  const collection = req.database.app.get("user")
  let result: ReplyJSON = {},
    data = null
  try {
    const { username, password, domain } = req.body as {
      [key: string]: string | undefined
    }
    if (!username || !password || !domain)
      throw new Exception(401, "Invalid Username / Password")
    const auth = await authenticate(username, password, domain)
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
    req.session.logged = data
    result = {
      success: true,
      data,
    }
  } catch (err) {
    if (err instanceof Exception) {
      reply.statusCode = 400
      result = {
        success: false,
        errors: err.errors,
        message: err.message,
        stack: err.stack,
      }
    } else {
      throw err
    }
  }
}

const authenticate = async (
  username: string,
  password: string,
  domain: string
) => {
  const config = configLDAP.filter((ldap: any) => ldap.domain == domain)[0]
  const dn = config.username || username
  const ldap = new (LDAP as any)({
    url: config.host,
    base: config.base,
    dn: dn,
    password: password,
  })
  const filter = `(${config.filterKey}=${username})`
  const attributes = ["mail", "cn", config.filterKey]
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

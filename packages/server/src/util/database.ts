import { configDatabase } from "@free/env"
import monk from "monk"

const connect = (uri: string) => {
  const db: any = monk(uri)
  db.then = null

  return new Promise((accept, reject) => {
    db.once("open", () => accept(db))
    db.once("error-opening", reject)
  })
}

export const load = async () => {
  let database
  try {
    database = await connect(`${configDatabase.url}/${configDatabase.name}`)
  } catch (err) {
    throw new Error(
      `Failed to connect ${configDatabase.name} at ${configDatabase.url}`
    )
  }

  return {
    database,
    message: `Database ${configDatabase.name} connected at ${configDatabase.url}`,
  }
}

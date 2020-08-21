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
  let app, trash
  try {
    app = await connect(`${configDatabase.url}/${configDatabase.app}`)
  } catch (err) {
    throw new Error(
      `Failed to connect ${configDatabase.app} at ${configDatabase.url}`
    )
  }

  try {
    trash = await connect(`${configDatabase.url}/${configDatabase.trash}`)
  } catch (err) {
    throw new Error(
      `Failed to connect ${configDatabase.trash} at ${configDatabase.url}`
    )
  }

  return {
    database: { app, trash },
    message: `Database ${configDatabase.app} connected at ${configDatabase.url}`,
  }
}

import { configDatabase } from "@free/env"
import monk, { id } from "monk"

let app: any, trash: any

export const load = async () => {
  app = monk(`${configDatabase.url}/${configDatabase.app}`)
  trash = monk(`${configDatabase.url}/${configDatabase.trash}`)

  return app
    .then(() => {
      return trash
        .then(() => {
          return {
            type: "info",
            database: {
              app,
              trash,
              id,
            },
            message: `Database ${configDatabase.app} connected at ${configDatabase.url}`,
          }
        })
        .catch(() => {
          return {
            type: "error",
            message: `Database ${configDatabase.trash} failed to connect`,
          }
        })
    })
    .catch(() => {
      return {
        type: "error",
        message: `Database ${configDatabase.app} failed to connect`,
      }
    })
}

export { app, trash }

import { Request, Reply } from "@free/server"
import { TrashService } from "./"

export const list = function (this: TrashService) {
  return async (req: Request, reply: Reply) => {
    reply.statusCode = 200
    try {
      const list = (await req.database.app.listCollections()).map(
        (col: any) => col.name
      )
      reply.send({
        success: true,
        result: list,
      })
    } catch (err) {
      this.onErrorHandler(req, reply, err)
    }
  }
}

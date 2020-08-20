import { Request, Reply } from "@free/server"
import { handleError, Exception } from "../util"
export const check = () => async (req: Request, reply: Reply) => {
  try {
    reply.statusCode = 200
    const data = req?.session?.logged
    if (!data) throw new Exception(401, "Authentication Failed")
    reply.send({
      success: true,
      data,
    })
  } catch (err) {
    handleError(reply, err)
  }
}

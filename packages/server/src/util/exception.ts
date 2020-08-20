export class Exception extends Error {
  public statusCode: number
  public errors: any
  constructor(statusCode: number, message: string, errors?: any) {
    super(message)
    const isProd = process.env.NODE_ENV === "production"
    this.statusCode = statusCode
    this.errors = errors
    //    if (code !== 500 && isProd) this.stack = undefined
  }
}

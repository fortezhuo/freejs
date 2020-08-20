export class Exception extends Error {
  public code: number
  public errors: any
  constructor(code: number, message: string, errors?: any) {
    super(message)
    this.code = code
    this.errors = errors
  }
}

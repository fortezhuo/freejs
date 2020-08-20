export class DatabaseError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class ValidationError extends Error {
  public errors: any
  constructor(name: string, errors: any) {
    super(`Validation Error for ${name}`)
    this.errors = errors
  }
}

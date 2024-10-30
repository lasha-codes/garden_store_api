import { ValidationError } from 'joi'

class CustomError extends Error {
  public serverMessage?: string
  public clientMessage: string | ValidationError
  public statusCode: number

  constructor(
    serverMessage: string | null,
    clientMessage: string | ValidationError,
    statusCode: number
  ) {
    super(serverMessage || clientMessage.toString())
    this.serverMessage = serverMessage || null
    this.clientMessage = clientMessage
    this.statusCode = statusCode

    Error.captureStackTrace(this, this.constructor)
  }
}

export default CustomError

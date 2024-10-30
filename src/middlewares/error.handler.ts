import { NextFunction, Request, Response } from 'express'

import CustomError from '../utils/customError.js'

const errorHandler = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode || 500).json({
      message: err.message || 'An error occurred',
    })
  } else {
    console.error(err)
    res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}

export { errorHandler }

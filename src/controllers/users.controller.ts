import { NextFunction, Request, RequestHandler, Response } from 'express'
import { retrieveUsersService } from '../services/users.service.js'

export const retrieveUsersController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await retrieveUsersService()
    res.status(200).json({ users })
  } catch (err) {
    next(err)
  }
}

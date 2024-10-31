import { NextFunction, Response, Request, RequestHandler } from 'express'
import {
  retrieveProductsService,
  uploadProductsService,
} from '../services/products.service.js'

export const uploadProductsController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await uploadProductsService(req.body)
    res.status(201).json({ message: `აიტვირთა ${products.count} პროდუქტი` })
  } catch (err) {
    next(err)
  }
}

export const retrieveProductsController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await retrieveProductsService()
    res.status(200).json({ products })
  } catch (err) {
    next(err)
  }
}

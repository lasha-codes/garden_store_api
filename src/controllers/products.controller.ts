import { NextFunction, Response, Request, RequestHandler } from 'express'
import { uploadProductsService } from '../services/products.service.js'

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

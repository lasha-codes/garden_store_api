import { NextFunction, Response, Request, RequestHandler } from 'express'
import {
  getProductByIdService,
  retrieveProductsService,
  uploadProductsService,
} from '../services/products.service.js'
import prisma from '../database/prisma.js'

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

export const getProductByIdController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await getProductByIdService(req.params.id)
    res.status(200).json({ product })
  } catch (err) {
    next(err)
  }
}

export const deleteProductsController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedProducts = await prisma.product.deleteMany()
    res.status(200).json({ deletedProducts })
  } catch (err) {
    next(err)
  }
}

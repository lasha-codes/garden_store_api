import { NextFunction, Response, Request, RequestHandler } from 'express'
import {
  getProductByIdService,
  retrieveProductsInCart,
  retrieveProductsService,
  retrieveSliderProductsService,
  uploadProductsService,
  uploadSliderProduct,
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
    res.status(201).json({ product })
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

export const retrieveProductsInCartController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { products } = req.body

    if (!products) {
      res.status(200).json({ cart: [] })
    } else {
      const cart = await retrieveProductsInCart(products)

      res.status(200).json({ cart })
    }
  } catch (err) {
    next(err)
  }
}

export const uploadSliderProductController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.body

    if (!productId) {
      res.status(400).json({ error: 'productId must be provided' })
      return
    } else if (productId && Number.isInteger(Number(productId))) {
      res.status(400).json({ error: 'Invalid productId provided' })
      return
    }

    const { error, sliderProduct } = await uploadSliderProduct(productId)

    if (error) {
      res.status(400).json({ error })
    } else {
      res.status(201).json({ sliderProduct })
    }
  } catch (err) {
    next(err)
  }
}

export const retrieveSliderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const slider = await retrieveSliderProductsService()
    res.status(200).json({ slider })
  } catch (err) {
    next(err)
  }
}

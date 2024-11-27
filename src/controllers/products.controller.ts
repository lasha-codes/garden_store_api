import { NextFunction, Response, Request, RequestHandler } from 'express'
import {
  deleteProductService,
  finishPurchaseService,
  getProductByIdService,
  retrieveProductsInCart,
  retrieveProductsService,
  retrieveSliderProductsService,
  updateProductService,
  uploadProductsService,
  uploadSliderProduct,
} from '../services/products.service.js'
import prisma from '../database/prisma.js'
import { validateProductSchema } from '../validations/products.validation.js'

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

    if (!products || products.length === 0) {
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

export const retrieveSliderController: RequestHandler = async (
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

export const finishPurchaseController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cart } = req.body
    if (!cart) {
      res.status(200).json({ message: 'cart must be provided' })
    } else {
      const updatedProducts = await finishPurchaseService(cart)
      res.status(200).json({ updatedProducts })
    }
  } catch (err) {
    next(err)
  }
}

export const updateProductController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, productId } = req.body

    if (!productId) {
      res.status(400).json({ message: 'product id is required' })
    }

    const { error } = validateProductSchema(data)

    if (error) {
      res.status(400).json(error.message)
    } else {
      const updatedProduct = await updateProductService(productId, data)
      res.status(201).json({ updatedProduct })
    }
  } catch (err) {
    next(err)
  }
}

export const deleteProductController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params
    const deletedProduct = await deleteProductService(productId)
    res.status(200).json({ deletedProduct })
  } catch (err) {
    next(err)
  }
}
